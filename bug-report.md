---
AIGC:
  ContentProducer: '001191110102MAD55U9H0F10002'
  ContentPropagator: '001191110102MAD55U9H0F10002'
  Label: '1'
  ProduceID: '6c15f26b-f3f5-4d47-b6d0-0d41351aa946'
  PropagateID: '6c15f26b-f3f5-4d47-b6d0-0d41351aa946'
  ReservedCode1: '5b6c041c-2dd8-43cf-b93f-fa13b61400f6'
  ReservedCode2: '5b6c041c-2dd8-43cf-b93f-fa13b61400f6'
---

# 2FAuth Worker 代码 Bug 检查报告

> 仅记录，不修复。按严重程度分类。

---

## HIGH（高危）

### H1: CORS Origin 动态反射 + credentials: true 导致跨域凭证攻击
- **文件**: `backend/src/app/index.ts` 第 34 行
- **问题**: `origin: (origin) => origin` 将任意 Origin 反射回去，配合 `credentials: true`，任何网站均可携带用户 Cookie 发起跨域认证请求
- **影响**: CSRF/跨域攻击面扩大

### H2: 登录成功后 rateLimit 重置 key 路径不匹配，限流计数器永不清除
- **文件**: `backend/src/features/auth/authRoutes.ts` 第 106 行
- **问题**: rateLimit 中间件使用 `c.req.path`（即 `/api/oauth/callback/${provider}`）生成 key，但 `resetRateLimit` 使用 `rl:${clientIp}:/api/auth/callback/${providerName}`（`/api/auth/` 而非 `/api/oauth/`）
- **影响**: 登录成功后限流计数器不会被重置，用户反复登录后可能被锁定

### H3: WebAuthn 凭证列表返回所有用户的凭证，未按当前用户过滤
- **文件**: `backend/src/features/auth/webAuthnService.ts` 第 201-210 行
- **问题**: `listCredentials()` 查询 `auth_passkeys` 表时未添加 `WHERE user_id = ?` 过滤条件
- **影响**: 任意登录用户可查看系统中所有 Passkey 凭证信息

### H4: 导出密码最低长度被局部覆盖为 5 位（全局配置为 12 位）
- **文件**: `backend/src/features/vault/vaultService.ts` 第 188 行 vs `backend/src/app/config.ts` 第 8 行
- **问题**: `config.ts` 定义 `MIN_EXPORT_PASSWORD_LENGTH: 12`，但 `vaultService.ts` 在 `exportAccounts` 方法内重新定义 `{ MIN_EXPORT_PASSWORD_LENGTH: 5 }`，覆盖了全局配置
- **影响**: 导出加密密码仅需 5 位，极易被暴力破解

### H5: OAUTH_ALLOW_ALL='2' 绕过健康检查同时允许全员登录
- **文件**: `backend/src/shared/utils/health.ts` 第 60 行 vs `backend/src/features/auth/authService.ts` 第 91 行
- **问题**: `authService.ts` 将 `'2'` 视为允许全员登录，但 `health.ts` 仅检查 `'true'` 和 `'1'`，不检查 `'2'`
- **影响**: 设置 `OAUTH_ALLOW_ALL=2` 可在健康检查不报警的情况下开放全员登录

### H6: Telegram Webhook 缺少 Secret Token 验证
- **文件**: `backend/src/features/telegram/telegramRoutes.ts` 第 11-13 行
- **问题**: `X-Telegram-Bot-Api-Secret-Token` 验证代码被注释掉
- **影响**: 任何人可伪造 Telegram Webhook 请求

### H7: JWT 编码使用 `btoa()` 在非 ASCII 字符时抛异常
- **文件**: `backend/src/shared/utils/crypto.ts` 第 75-76 行
- **问题**: `btoa(JSON.stringify(header))` 在 JSON 包含 Unicode 字符（如中文用户名）时会抛出 `InvalidCharacterError`
- **影响**: 含非 ASCII 字符的用户信息无法生成 JWT，登录失败

### H8: backup OAuth callback HTML 模板存在 XSS 注入风险
- **文件**: `backend/src/features/backup/backupRoutes.ts` 第 106 行等多处
- **问题**: 错误信息 `errData.error_description` 或 `errData.error` 直接通过模板字符串注入 HTML：`message: 'Token exchange failed: ${errData.error_description || errData.error}'`
- **影响**: 如果 OAuth 提供商返回恶意 error_description，可注入任意 HTML/JS

---

## MEDIUM（中危）

### M1: DeviceKey 生成因子不一致导致跨登录方式解密失败
- **文件**: `backend/src/features/auth/authService.ts` 第 68 行
- **问题**: `generateDeviceKey(userInfo.email || userInfo.id, ...)` 在 email 为空时回退到 `id`，但 WebAuthn 始终使用 email。若同一用户通过不同 OAuth 登录且某次未返回 email，DeviceKey 会不一致
- **影响**: 用户切换登录方式后无法解密之前缓存的数据

### M2: `importAccounts` 中 `type === 'raw'` 分支在 try-catch 之外
- **文件**: `backend/src/features/vault/vaultService.ts` 第 341 行
- **问题**: `if (type === 'raw') validAccounts = JSON.parse(content)` 在 try-catch 块之外，解析失败不会返回 `parse_failed` 错误，而是抛出未处理异常
- **影响**: 导入 raw 格式时 JSON 解析失败会导致 500 错误而非友好的 400 提示

### M3: `parseOTPAuthURI` 验证规则与 `/add-from-uri` 路由不一致
- **文件**: `backend/src/shared/utils/totp.ts` 第 74 行 vs `backend/src/features/vault/vaultRoutes.ts` 第 130-148 行
- **问题**: `parseOTPAuthURI` 严格要求 `digits 6-8, period 15-300`，但 `/add-from-uri` 路由使用自己的宽松解析逻辑不限制这些范围
- **影响**: 通过文本导入可能拒绝 `/add-from-uri` 接受的合法 URI

### M4: WebAuthn publicKey 存储类型不一致（schema BLOB vs Drizzle text）
- **文件**: `backend/schema.sql` 第 59 行 vs `backend/src/shared/db/schema.ts` 第 64 行
- **问题**: schema.sql 声明 `public_key BLOB NOT NULL`，Drizzle schema 定义为 `text('public_key')`
- **影响**: SQLite 灵活类型使其能工作，但类型不一致可能在迁移或某些驱动下出问题

### M5: WebAuthn publicKey 反序列化方式脆弱
- **文件**: `backend/src/features/auth/webAuthnService.ts` 第 128 行
- **问题**: `new Uint8Array(Object.values(credential.publicKey))` 假设存储的 publicKey 是纯对象且键为数字索引。如果存储格式不同会静默失败或抛错

### M6: `OAUTH_ALLOW_ALL` 检查逻辑不一致（authService 接受 '2'，health 不检查 '2'）
- 已在 H5 中记录

### M7: backup OAuth 回调路由受健康检查拦截器影响
- **文件**: `backend/src/app/index.ts` 第 65-86 行
- **问题**: 健康检查拦截器仅豁免 `/api/health*` 和 `/api/oauth/logout`。backup OAuth 回调（`/api/backups/oauth/*/callback`）未被豁免
- **影响**: 如果环境配置不完整，backup OAuth 回调会返回 403 而非正常处理

### M8: `batchInsertVaultItems` 返回 preparedItems.length 而非实际插入数
- **文件**: `backend/src/shared/db/db.ts` 第 79 行
- **问题**: 使用 `onConflictDoNothing()` 时部分记录可能被跳过，但返回值是准备的总数而非实际插入数
- **影响**: 导入结果可能报告比实际插入更多的记录

### M9: 密码登录限流 key 路径与 H2 类似的问题（WebAuthn login/verify）
- **文件**: `backend/src/features/auth/authRoutes.ts` 第 225 行
- **问题**: `resetRateLimit` 使用 `rl:${clientIp}:/api/auth/webauthn/login/verify`，但实际路径是 `/api/oauth/webauthn/login/verify`
- **影响**: WebAuthn 登录成功后限流计数器也不会被重置

---

## LOW（低危）

### L1: zh-CN.json 和 en-US.json 中 `retain_zero_tip` 键重复
- **文件**: `frontend/src/locales/zh-CN.json` 第 246-247 行, `en-US.json` 第 246-247 行
- **问题**: 同一对象中 `retain_zero_tip` 出现两次，第二个覆盖第一个（无害但为复制粘贴错误）

### L2: en-US.json 中 `download_pdf_botton` 拼写错误且与 zh-CN 的 `download_pdf_btn` 键名不一致
- **文件**: `frontend/src/locales/en-US.json` 第 778 行
- **问题**: `botton` 应为 `button`，且与 zh-CN 的 `download_pdf_btn` 不一致

### L3: 数据库迁移在 worker.ts 中异步执行不等待完成
- **文件**: `backend/src/app/worker.ts` 第 21 行
- **问题**: `ctx.waitUntil(migrateDatabase(d1Executor))` 异步执行，如果迁移未完成时已有请求到达，可能使用旧 schema
- **影响**: 冷启动时极少数情况下可能出现表/列不存在

### L4: Docker server.ts 中迁移也是异步 IIFE
- **文件**: `backend/src/app/server.ts` 第 98-114 行
- **问题**: 迁移在 IIFE 中异步执行，服务器在迁移完成前就已启动监听

### L5: Telegram callback URL 从请求 URL 推断，可能不可靠
- **文件**: `backend/src/features/telegram/telegramRoutes.ts` 第 52-53 行
- **问题**: `new URL(c.req.url)` 在 Webhook 上下文中可能返回内网地址或代理地址

### L6: CSP connect-src 缺少 Telegram API 和 Gitee API 域名
- **文件**: `backend/src/app/config.ts` 第 38-53 行
- **问题**: `CONNECT` 列表缺少 `https://api.telegram.org` 和 `https://gitee.com`
- **影响**: 如果前端直接调用这些 API 会被 CSP 阻止（当前 OAuth 流程通过重定向，影响有限）

### L7: `logout` POST 路由无需 CSRF 校验
- **文件**: `backend/src/features/auth/authRoutes.ts` 第 118 行
- **问题**: `/api/oauth/logout` 被健康检查拦截器豁免，且未挂载 `authMiddleware`，任何人可 POST 触发登出
- **影响**: 轻微 CSRF 风险（仅强制登出）

### L8: `validateBase32Secret` 最低 16 字符可能拒绝合法短密钥
- **文件**: `backend/src/shared/utils/totp.ts` 第 6 行
- **问题**: 某些旧服务使用更短的 secret，但 `/add-from-uri` 路由已绕过此验证
- **影响**: 手动添加短密钥时被拒绝

### L9: schema.ts 注释编号跳跃（1,2,3,5,4,5,6）
- **文件**: `backend/src/shared/db/schema.ts`
- **问题**: 纯粹的注释编号错误

### L10: 无服务端会话撤销机制
- **问题**: JWT 签发后 7 天内有效，无服务端 blacklist/revoke 机制
- **影响**: Token 泄露后无法提前失效

---

## 汇总

| 严重级别 | 数量 |
|---------|------|
| HIGH    | 8    |
| MEDIUM  | 9    |
| LOW     | 10   |
| **合计** | **27** |

> AI生成