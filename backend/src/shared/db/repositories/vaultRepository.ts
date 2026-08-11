import { and, desc, eq, inArray, like, or, sql } from 'drizzle-orm';
import { vault, type VaultItem, type NewVaultItem } from '@/shared/db/schema';

export class VaultRepository {
    private db: any;

    constructor(dbClient: any) {
        this.db = dbClient;
    }

    /**
     * 获取所有的 vault items (2FA accounts)
     */
    async findAll(): Promise<VaultItem[]> {
        return await this.db
            .select()
            .from(vault)
            .orderBy(desc(vault.createdAt));
    }

    /**
     * 获取当前最大排序值
     */
    async getMaxSortOrder(): Promise<number> {
        const result = await this.db
            .select({ maxSort: sql<number>`max(${vault.sortOrder})` })
            .from(vault);
        return result[0]?.maxSort || 0;
    }

    /**
     * 分页查询
     */
    async findPaginated(page: number, limit: number, search: string = '', category: string = ''): Promise<VaultItem[]> {
        let query = this.db.select().from(vault);

        const conditions = [];
        if (search) {
            conditions.push(or(
                like(vault.service, `%${search}%`),
                like(vault.account, `%${search}%`),
                like(vault.category, `%${search}%`)
            ));
        }
        if (category) {
            conditions.push(eq(vault.category, category));
        }

        if (conditions.length > 0) {
            query = query.where(and(...conditions as any));
        }

        return await query
            .limit(limit)
            .offset((page - 1) * limit)
            .orderBy(desc(vault.sortOrder), desc(vault.createdAt));
    }

    /**
     * 获取分类统计
     */
    async getCategoryStats(): Promise<{ category: string, count: number }[]> {
        return await this.db
            .select({
                category: vault.category,
                count: sql<number>`count(*)`
            })
            .from(vault)
            .groupBy(vault.category);
    }

    /**
     * 批量更新排序
     */
    async updateSortOrders(updates: { id: string, sortOrder: number }[]): Promise<void> {
        for (const update of updates) {
            await this.db
                .update(vault)
                .set({ sortOrder: update.sortOrder })
                .where(eq(vault.id, update.id))
                .run();
        }
    }

    /**
     * 获取满足条件的总记录数，用于分页计算
     */
    async count(search: string, category: string = ''): Promise<number> {
        let query = this.db
            .select({ count: sql<number>`count(*)` })
            .from(vault);

        const conditions = [];
        if (search) {
            conditions.push(or(
                like(vault.service, `%${search}%`),
                like(vault.account, `%${search}%`),
                like(vault.category, `%${search}%`)
            ));
        }
        if (category) {
            conditions.push(eq(vault.category, category));
        }

        if (conditions.length > 0) {
            query = query.where(and(...conditions as any));
        }

        const result = await query;
        return result[0]?.count || 0;
    }

    /**
     * 根据 ID 获取单个 item
     */
    async findById(id: string): Promise<VaultItem | undefined> {
        const result = await this.db
            .select()
            .from(vault)
            .where(eq(vault.id, id))
            .limit(1);

        return result[0];
    }

    /**
     * 根据 service/account 查找记录 (大小写不敏感，自动 trim)
     */
    async findByServiceAccount(service: string, account: string): Promise<VaultItem | undefined> {
        const normalizedService = service.trim().toLowerCase();
        const normalizedAccount = account.trim().toLowerCase();
        const result = await this.db
            .select()
            .from(vault)
            .where(
                and(
                    sql`lower(${vault.service}) = ${normalizedService}`,
                    sql`lower(${vault.account}) = ${normalizedAccount}`
                )
            )
            .limit(1);
        return result[0];
    }

    /**
     * 创建一个新 item
     */
    async create(item: NewVaultItem): Promise<VaultItem> {
        const result = await this.db.insert(vault).values(item).returning();
        return result[0];
    }

    /**
     * 批量创建
     */
    async batchCreate(items: NewVaultItem[]): Promise<void> {
        if (!items || items.length === 0) return;

        const BATCH_SIZE = 50;
        for (let i = 0; i < items.length; i += BATCH_SIZE) {
            const chunk = items.slice(i, i + BATCH_SIZE);
            await this.db.insert(vault).values(chunk).run();
        }
    }

    /**
     * 更新一个 item
     */
    async update(id: string, data: Partial<NewVaultItem>): Promise<VaultItem | undefined> {
        const existing = await this.findById(id);
        if (!existing) return undefined;

        const result = await this.db
            .update(vault)
            .set({ ...data, updatedAt: Date.now() })
            .where(eq(vault.id, id))
            .returning();

        return result[0];
    }

    /**
     * 删除单个 item
     */
    async delete(id: string): Promise<boolean> {
        const existing = await this.findById(id);
        if (!existing) return false;

        await this.db.delete(vault).where(eq(vault.id, id)).run();
        return true;
    }

    /**
     * 批量删除
     */
    async batchDelete(ids: string[]): Promise<number> {
        if (!ids || ids.length === 0) return 0;

        let deletedCount = 0;
        const BATCH_SIZE = 50;
        for (let i = 0; i < ids.length; i += BATCH_SIZE) {
            const chunk = ids.slice(i, i + BATCH_SIZE);
            await this.db.delete(vault).where(inArray(vault.id, chunk)).run();
            deletedCount += chunk.length;
        }
        return deletedCount;
    }
}
