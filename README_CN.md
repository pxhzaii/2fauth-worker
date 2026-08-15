# 🛡️ 安全审计与透明度报告

[English](README.md) | 中文

![安全评级](https://img.shields.io/badge/安全评级-A+-success?style=for-the-badge)

> [!IMPORTANT]
> 本报告由 **GitHub Actions** 自动生成。为确保数据主权的绝对透明度，所有核心模块的安全扫描结果均实时公开。

| 📅 审计时间 | 📝 运行 ID | 🛠️ 环境 |
| :--- | :--- | :--- |
| `2026-08-15 18:51:09 UTC` | [#31902187850](https://github.com/pxhzaii/2fauth-worker/actions/runs/31902187850) | `GitHub CI/CD` |

---

## 📉 实时安全仪表盘

| 工具 | 状态 | 发现项 |
| :--- | :--- | :--- |
| **Credential Leak (Gitleaks)** | ![Pass](https://img.shields.io/badge/Status-PASS-success?style=for-the-badge) | `0` 泄露 |
| **Dependency Scan (Snyk)** | ![Pass](https://img.shields.io/badge/Status-PASS-success?style=for-the-badge) | `0` 漏洞 |
| **Static Analysis (CodeQL)** | ![Pass](https://img.shields.io/badge/Status-PASS-success?style=for-the-badge) | `0` 告警 |
| **Container Scan (Trivy)** | ![Pass](https://img.shields.io/badge/Status-PASS-success?style=for-the-badge) | `0` 发现项 |

---

## 🔍 扫描覆盖范围

| 模块 | 已审计文件 | 覆盖率 |
| :--- | :---: | :---: |
| **GitHub Actions** | `3` | ✨ **100%** |
| **JavaScript (Frontend)** | `50` | ✨ **100%** |
| **TypeScript (Backend)** | `46` | ✨ **100%** |

---

## 🔍 详细发现项

### 🔑 凭据泄露检查 (Gitleaks)
`检测代码历史记录中硬编码的 API 密钥、密码或其他敏感令牌。` `扫描范围：所有代码更改和 Git 历史记录 (Gitleaks 全量扫描)`

✅ **安全**：未发现硬编码的敏感凭据。

### 🛡️ 容器配置安全 (Trivy)
`检测 Dockerfile 和容器配置中的安全风险与最佳实践。`

✅ **安全**：未发现容器配置缺陷。

### 📦 第三方依赖
✅ **安全**：在依赖项中未发现已知漏洞。

### 💻 代码质量与安全 (CodeQL)
✅ **安全**：CodeQL 扫描清洁，未检测到问题。

### 📂 已审计文件列表
<details>
<summary><b>GitHub Actions (3)</b></summary>

| 模块 | 位置 | 状态 |
| :--- | :--- | :--- |
| `deploy.yml` | `.github/workflows/deploy.yml` | ✅ **已审计** |
| `docker.yml` | `.github/workflows/docker.yml` | ✅ **已审计** |
| `security.yml` | `.github/workflows/security.yml` | ✅ **已审计** |

</details>

<details>
<summary><b>JavaScript (50)</b></summary>

| 模块 | 位置 | 状态 |
| :--- | :--- | :--- |
| `router.js` | `frontend/src/app/router.js` | ✅ **已审计** |
| `useOAuthCallback.js` | `frontend/src/features/auth/composables/useOAuthCallback.js` | ✅ **已审计** |
| `useOAuthProviders.js` | `frontend/src/features/auth/composables/useOAuthProviders.js` | ✅ **已审计** |
| `authService.js` | `frontend/src/features/auth/service/authService.js` | ✅ **已审计** |
| `webAuthnService.js` | `frontend/src/features/auth/service/webAuthnService.js` | ✅ **已审计** |
| `authUserStore.js` | `frontend/src/features/auth/store/authUserStore.js` | ✅ **已审计** |
| `useBackupActions.js` | `frontend/src/features/backup/composables/useBackupActions.js` | ✅ **已审计** |
| `useBackupOperations.js` | `frontend/src/features/backup/composables/useBackupOperations.js` | ✅ **已审计** |
| `useBackupProviders.js` | `frontend/src/features/backup/composables/useBackupProviders.js` | ✅ **已审计** |
| `useBackupUI.js` | `frontend/src/features/backup/composables/useBackupUI.js` | ✅ **已审计** |
| `backupService.js` | `frontend/src/features/backup/service/backupService.js` | ✅ **已审计** |
| `backupStore.js` | `frontend/src/features/backup/store/backupStore.js` | ✅ **已审计** |
| `useDataExport.js` | `frontend/src/features/migration/composables/useDataExport.js` | ✅ **已审计** |
| `useDataImport.js` | `frontend/src/features/migration/composables/useDataImport.js` | ✅ **已审计** |
| `dataMigrationService.js` | `frontend/src/features/migration/service/dataMigrationService.js` | ✅ **已审计** |
| `useTimeSync.js` | `frontend/src/features/tools/composables/useTimeSync.js` | ✅ **已审计** |
| `useTotpToolbox.js` | `frontend/src/features/tools/composables/useTotpToolbox.js` | ✅ **已审计** |
| `useTotpToolboxActions.js` | `frontend/src/features/tools/composables/useTotpToolboxActions.js` | ✅ **已审计** |
| `toolService.js` | `frontend/src/features/tools/service/toolService.js` | ✅ **已审计** |
| `useTotpTimer.js` | `frontend/src/features/vault/composables/useTotpTimer.js` | ✅ **已审计** |
| `useVaultActions.js` | `frontend/src/features/vault/composables/useVaultActions.js` | ✅ **已审计** |
| `useVaultList.js` | `frontend/src/features/vault/composables/useVaultList.js` | ✅ **已审计** |
| `vaultService.js` | `frontend/src/features/vault/service/vaultService.js` | ✅ **已审计** |
| `vaultStore.js` | `frontend/src/features/vault/store/vaultStore.js` | ✅ **已审计** |
| `index.js` | `frontend/src/locales/index.js` | ✅ **已审计** |
| `main.js` | `frontend/src/main.js` | ✅ **已审计** |
| `layoutStore.js` | `frontend/src/shared/stores/layoutStore.js` | ✅ **已审计** |
| `themeStore.js` | `frontend/src/shared/stores/themeStore.js` | ✅ **已审计** |
| `asyncHelper.js` | `frontend/src/shared/utils/asyncHelper.js` | ✅ **已审计** |
| `common.js` | `frontend/src/shared/utils/common.js` | ✅ **已审计** |
| `crypto.js` | `frontend/src/shared/utils/crypto.js` | ✅ **已审计** |
| `encoding.js` | `frontend/src/shared/utils/encoding.js` | ✅ **已审计** |
| `authError.js` | `frontend/src/shared/utils/errors/authError.js` | ✅ **已审计** |
| `backupError.js` | `frontend/src/shared/utils/errors/backupError.js` | ✅ **已审计** |
| `migrationError.js` | `frontend/src/shared/utils/errors/migrationError.js` | ✅ **已审计** |
| `toolsError.js` | `frontend/src/shared/utils/errors/toolsError.js` | ✅ **已审计** |
| `vaultError.js` | `frontend/src/shared/utils/errors/vaultError.js` | ✅ **已审计** |
| `idb.js` | `frontend/src/shared/utils/idb.js` | ✅ **已审计** |
| `request.js` | `frontend/src/shared/utils/request.js` | ✅ **已审计** |
| `aegisStrategy.js` | `frontend/src/shared/utils/serializers/aegisStrategy.js` | ✅ **已审计** |
| `csvStrategy.js` | `frontend/src/shared/utils/serializers/csvStrategy.js` | ✅ **已审计** |
| `enteStrategy.js` | `frontend/src/shared/utils/serializers/enteStrategy.js` | ✅ **已审计** |
| `gauthStrategy.js` | `frontend/src/shared/utils/serializers/gauthStrategy.js` | ✅ **已审计** |
| `protonAuthStrategy.js` | `frontend/src/shared/utils/serializers/protonAuthStrategy.js` | ✅ **已审计** |
| `protonPassStrategy.js` | `frontend/src/shared/utils/serializers/protonPassStrategy.js` | ✅ **已审计** |
| `MemoryAsyncVFS.js` | `frontend/src/shared/utils/sqlite/MemoryAsyncVFS.js` | ✅ **已审计** |
| `MemoryVFS.js` | `frontend/src/shared/utils/sqlite/MemoryVFS.js` | ✅ **已审计** |
| `totp.js` | `frontend/src/shared/utils/totp.js` | ✅ **已审计** |
| `vite.config.js` | `frontend/vite.config.js` | ✅ **已审计** |
| `decrypt_backup.js` | `scripts/decrypt_backup.js` | ✅ **已审计** |

</details>

<details>
<summary><b>TypeScript (46)</b></summary>

| 模块 | 位置 | 状态 |
| :--- | :--- | :--- |
| `config.ts` | `backend/src/app/config.ts` | ✅ **已审计** |
| `index.ts` | `backend/src/app/index.ts` | ✅ **已审计** |
| `server.ts` | `backend/src/app/server.ts` | ✅ **已审计** |
| `worker.ts` | `backend/src/app/worker.ts` | ✅ **已审计** |
| `authRoutes.ts` | `backend/src/features/auth/authRoutes.ts` | ✅ **已审计** |
| `authService.ts` | `backend/src/features/auth/authService.ts` | ✅ **已审计** |
| `baseOAuthProvider.ts` | `backend/src/features/auth/providers/baseOAuthProvider.ts` | ✅ **已审计** |
| `cloudflareAccessProvider.ts` | `backend/src/features/auth/providers/cloudflareAccessProvider.ts` | ✅ **已审计** |
| `giteeProvider.ts` | `backend/src/features/auth/providers/giteeProvider.ts` | ✅ **已审计** |
| `githubProvider.ts` | `backend/src/features/auth/providers/githubProvider.ts` | ✅ **已审计** |
| `googleProvider.ts` | `backend/src/features/auth/providers/googleProvider.ts` | ✅ **已审计** |
| `index.ts` | `backend/src/features/auth/providers/index.ts` | ✅ **已审计** |
| `nodeLocProvider.ts` | `backend/src/features/auth/providers/nodeLocProvider.ts` | ✅ **已审计** |
| `telegramProvider.ts` | `backend/src/features/auth/providers/telegramProvider.ts` | ✅ **已审计** |
| `webAuthnService.ts` | `backend/src/features/auth/webAuthnService.ts` | ✅ **已审计** |
| `backupRoutes.ts` | `backend/src/features/backup/backupRoutes.ts` | ✅ **已审计** |
| `backupService.ts` | `backend/src/features/backup/backupService.ts` | ✅ **已审计** |
| `backupProvider.ts` | `backend/src/features/backup/providers/backupProvider.ts` | ✅ **已审计** |
| `baiduNetdiskProvider.ts` | `backend/src/features/backup/providers/baiduNetdiskProvider.ts` | ✅ **已审计** |
| `dropboxProvider.ts` | `backend/src/features/backup/providers/dropboxProvider.ts` | ✅ **已审计** |
| `emailProvider.ts` | `backend/src/features/backup/providers/emailProvider.ts` | ✅ **已审计** |
| `googleDriveProvider.ts` | `backend/src/features/backup/providers/googleDriveProvider.ts` | ✅ **已审计** |
| `index.ts` | `backend/src/features/backup/providers/index.ts` | ✅ **已审计** |
| `oneDriveProvider.ts` | `backend/src/features/backup/providers/oneDriveProvider.ts` | ✅ **已审计** |
| `s3Provider.ts` | `backend/src/features/backup/providers/s3Provider.ts` | ✅ **已审计** |
| `telegramProvider.ts` | `backend/src/features/backup/providers/telegramProvider.ts` | ✅ **已审计** |
| `webDavProvider.ts` | `backend/src/features/backup/providers/webDavProvider.ts` | ✅ **已审计** |
| `emergencyRoutes.ts` | `backend/src/features/emergency/emergencyRoutes.ts` | ✅ **已审计** |
| `healthRoutes.ts` | `backend/src/features/health/healthRoutes.ts` | ✅ **已审计** |
| `telegramRoutes.ts` | `backend/src/features/telegram/telegramRoutes.ts` | ✅ **已审计** |
| `telegramService.ts` | `backend/src/features/telegram/telegramService.ts` | ✅ **已审计** |
| `toolsRoutes.ts` | `backend/src/features/tools/toolsRoutes.ts` | ✅ **已审计** |
| `vaultRoutes.ts` | `backend/src/features/vault/vaultRoutes.ts` | ✅ **已审计** |
| `vaultService.ts` | `backend/src/features/vault/vaultService.ts` | ✅ **已审计** |
| `db.ts` | `backend/src/shared/db/db.ts` | ✅ **已审计** |
| `migrator.ts` | `backend/src/shared/db/migrator.ts` | ✅ **已审计** |
| `backupRepository.ts` | `backend/src/shared/db/repositories/backupRepository.ts` | ✅ **已审计** |
| `emergencyRepository.ts` | `backend/src/shared/db/repositories/emergencyRepository.ts` | ✅ **已审计** |
| `vaultRepository.ts` | `backend/src/shared/db/repositories/vaultRepository.ts` | ✅ **已审计** |
| `schema.ts` | `backend/src/shared/db/schema.ts` | ✅ **已审计** |
| `auth.ts` | `backend/src/shared/middleware/auth.ts` | ✅ **已审计** |
| `rateLimitMiddleware.ts` | `backend/src/shared/middleware/rateLimitMiddleware.ts` | ✅ **已审计** |
| `common.ts` | `backend/src/shared/utils/common.ts` | ✅ **已审计** |
| `crypto.ts` | `backend/src/shared/utils/crypto.ts` | ✅ **已审计** |
| `health.ts` | `backend/src/shared/utils/health.ts` | ✅ **已审计** |
| `totp.ts` | `backend/src/shared/utils/totp.ts` | ✅ **已审计** |

</details>

--- 

## ⚠️ 操作指南

如果您看到 **FAIL** 状态或严重的代码问题：
1. **开发人员**：使用上方表格中的 **位置** 列找到确切的文件和行号。
2. **纠正**：遵循为每个规则提供的文档链接以提交修复。
3. **可追溯性**：完整的原始 `.sarif` 数据已附加到此分支。下载并将其导入您的 IDE（例如 VS Code SARIF 查看器）进行本地分析。

--- 

💡 *由 Antigravity AI 安全引擎生成。透明度是我们的承诺。*