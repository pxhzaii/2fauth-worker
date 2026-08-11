import { drizzle } from 'drizzle-orm/d1';
import app from '@/app/index.js';
import * as schema from '@/shared/db/schema.js';
import { handleScheduledBackup } from '@/features/backup/backupRoutes.js';
import { migrateDatabase } from '@/shared/db/migrator.js';

export default {
    async fetch(request: Request, env: any, ctx: any) {
        // Initialize D1 driver
        const db = drizzle(env.DB, { schema });

        // 自愈性迁移逻辑：确保远程 D1 字段始终最新
        const d1Executor = {
            exec: (sql: string) => env.DB.exec(sql),
            prepare: (sql: string) => ({
                get: () => env.DB.prepare(sql).first(),
                run: (...params: any[]) => env.DB.prepare(sql).bind(...params).run()
            })
        };
        // 生产环境使用 waitUntil 异步执行迁移检查，不增加请求冷启动延迟
        ctx.waitUntil(migrateDatabase(d1Executor));

        // Pass specialized DB and env vars to agnostic router
        const specializedEnv = {
            ...env,
            DB: db, // Replace D1 with Drizzle ORM instance
            ASSETS: env.ASSETS // Ensure ASSETS exists
        };

        return app.fetch(request, specializedEnv, ctx);
    },

    // Scheduled Backup trigger via Cloudflare Cron
    async scheduled(event: any, env: any, ctx: any) {
        console.log(`[Cron] Scheduled event triggered at ${new Date().toISOString()}`);
        const db = drizzle(env.DB, { schema });
        const specializedEnv = {
            ...env,
            DB: db
        };
        ctx.waitUntil(handleScheduledBackup(specializedEnv));
    }
};
