
# 2FAuth Worker

[English](README_EN.md) | 中文

**支持 Cloudflare Serverless 与 Docker 私有化部署的高安全、轻量级二步验证 (2FA/TOTP) 管理系统**


源码基于[2FAuth Worker](https://github.com/nodeauth/2fauth-worker)修改



## 🌟 为什么选择 2FAuth Worker？

不管是白嫖 Cloudflare 的免费额度，还是部署在自家的 NAS 或小主机上，2FAuth Worker 都能为你提供**最安全**、最便捷的 2FA 密钥管理体验。

### 🕊️ 真正的“全方位”部署 (Dual-Mode)
*   **白嫖党最爱**：一键部署到 Cloudflare Workers，零成本、零维护、全球加速。
*   **私有云极客**：支持 Docker 部署，数据锁在自家硬盘里，局域网断网也能用。

### 📱 像原生 App 一样好用 (PWA)
*   **沉浸式体验**：支持安装到电脑桌面或手机主屏幕，没有浏览器边框的干扰。
*   **断网也不怕**：得益于先进的离线缓存技术，即便在地下室或飞机上（无网络），它依然能秒开并为你生成精准的验证码。

### 🛡️ “拉闸式”安全护卫 (Health Shield)
*   我们内置了智能安检逻辑。如果程序检测到关键密钥丢失或配置不当，它会立即“拉闸”阻断访问，防止你的数据因环境不安全而暴露。

### 📦 丢不了的“后悔药” (Multi-channel Backup)
*   支持 WebDAV、S3 兼容存储、Telegram 机器人、Google Drive、OneDrive、百度网盘、Dropbox、Email 邮件等多种渠道自动备份。即使手机丢了、系统重装了，甚至 Cloudflare 账号没了，你也能通过备份瞬间找回所有账号。

<details>
<summary>点击查看：同类型产品对比</summary>

| 功能特性 | **2FAuth Worker** (本项目) | Google / MS Auth | Authy | 2FAS / Aegis | 1Password / Bitwarden |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 数据所有权 | ✅ 完全掌控 (私有云/NAS) | ❌ 绑定大厂云端 | ❌ 锁定在厂商服务器 | ✅ 本地文件/私有云 | ⚠️ 托管在三方平台 |
| 多端访问 | ✅ 网页+PWA (全平台) | ⚠️ 仅手机 App | ❌ 桌面端已关停 | ⚠️ 仅手机 App | ✅ 全平台支持 |
| 恢复便利性 | ✅ 多通道自动备份 (8 种渠道) | ⚠️ 换手机导入麻烦 | ✅ 云同步 | ⚠️ 需维护备份文件 | ✅ 云同步 |
| 隐私保护 | ✅ 匿名部署，无追踪 | ⚠️ 大厂账号绑定 | ⚠️ 强制绑定手机号 | ✅ 无追踪 | ✅ 安全但目标较大 |
| 离线可用性 | ✅ 支持 (PWA 强力缓存) | ✅ 支持 | ✅ 支持 | ✅ 支持 | ✅ 支持 |
| 部署成本 | ✅ 0 成本 (CF Serverless) | ✅ 免费 | ✅ 免费 | ✅ 免费 | 💰 订阅/自建较重 |
| 厂商倒闭风险 | ✅ 源码在手，永不丧失 | ⚠️ 生态强制迁移风险 | 🚨 随时下线(如 PC 端) | ✅ 开源可控 | ⚠️ 订阅制/闭源风险 |

> 🎯 **小结**：**2FAuth Worker** 既有 1Password 的多端便利，又有开源 App 的隐私性，更有 Serverless 的零成本。**多通道自动备份**（WebDAV、S3、Telegram、Google Drive、OneDrive、百度网盘、Dropbox、Email）更是解决了所有 Web 端和 App 端的“丢数据焦虑”，让安全触手可得。

</details>

---

## 🚀 部署指南 (三选一)

### 方式 A：一键部署到 Cloudflare Worker (最快，新手推荐)

这是最省心的方式，完全不需要自己的服务器，由 Cloudflare 免费为你托管。

#### 1. 一键全自动部署
1. Fork 本项目仓库，发财小手点`Star`! ⭐
2. 点击下方部署按钮 <br />
[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://dash.cloudflare.com/?to=/:account/workers-and-pages/create)

> ⚠️ **注意**：部署完成后，必须手动创建名为 `2fauth-db` 的 D1 数据库，并在 D1 控制台执行 `backend/schema.sql` 建表，然后将数据库绑定到 Worker 项目（绑定变量名：`DB`）。详见下方 [D1 数据库配置](#d1-数据库配置) 章节。

#### 2. 授权
在部署向导中，选择 **Connect to Git**，授权 Cloudflare 访问你的 GitHub 账号，然后选择你 Fork 后的 `2fauth-worker` 仓库。授权完成后 Cloudflare 会自动读取仓库源码。

#### 3. 部署流程
1. 点击 **Continue with GitHub**，选择你 Fork 后的仓库（`2fauth-worker`）
2. 点击 **下一步** → **部署**，等待构建完成
3. 部署完成后，点击 **继续处理项目** → **设置**
4. 构建命令填写：`npm run build --prefix frontend && npx wrangler deploy`
5. 在设置页面添加环境变量和密钥（见下一步）

#### D1 数据库配置
首次部署后，必须创建 D1 数据库并执行建表脚本：

1. 进入 Cloudflare Dashboard → **存储和数据库** → **D1 SQL 数据库** → **创建数据库**
2. 名称填写 `2fauth-db`，点击 **创建**
3. 进入数据库控制台，点击 **Console** 标签页
4. 将仓库中 [`backend/schema.sql`](backend/schema.sql) 的完整内容复制到控制台，点击 **执行**
5. 返回你的 Worker 项目 → **设置** → **绑定** → **添加绑定** → 选择 **D1 数据库**
6. 绑定变量名填写 `DB`，选择刚创建的 `2fauth-db` 数据库
7. 点击 **保存并部署** 使绑定生效

#### 4. 在`设置`添加如下变量和密钥

> ⚠️ **注意**：在 Cloudflare 后台对应的菜单叫 **`变量和密钥`**（不是 ~~变量和机密~~），请确认进入的是正确的设置页面。

| 变量名 | 说明 | 建议类型 |
| :--- | :--- | :--- |
| `ENCRYPTION_KEY` | 32位以上随机密钥 | 密钥 |
| `JWT_SECRET` | 32位以上随机JWT密钥 | 密钥 |
| `OAUTH_ALLOWED_USERS` | 你的邮箱@example.com | 文本 |
| `AUTH_USERNAME` | 密码登录用户名（与 `AUTH_PASSWORD` 配合） | 密钥 |
| `AUTH_PASSWORD` | 密码登录密码（与 `AUTH_USERNAME` 配合） | 密钥 |

> 密码登录和 OAuth 可同时启用，至少选一种登录方式。其他 OAuth 平台变量见下方说明。

添加方式：进入 Workers & Pages → 选择你的 `2fauth-worker` 项目 → **设置** → **变量和密钥** → **添加**，选择类型为 **密钥**（Secret）或 **文本**（Text），依次添加上方列出的变量，添加完成后点击 **保存并部署** 使变量生效。

---

### 方式 B：部署到 Docker (适合 NAS / 自有服务器用户)

如果你想把数据完全掌控在自己手里，或者需要在内网环境运行。

**⚠️ 核心安全须知**：为了提供最高级别的安全保障，本项目的 Docker 镜像严格遵循**非特权用户（Rootless）**运行标准（内部以 `node` 用户，UID 1000 运行），从而有效防止潜在的容器逃逸风险。
在运行容器前，你**必须**预先在宿主机创建目录并分配正确的权限，否则会出现 `Permission Denied` 报错。

#### 0. 准备数据目录 (必做)
在你想运行容器的目录下，执行以下命令：
```bash
mkdir -p data && sudo chown -R 1000:1000 data
```

#### 1. 使用 Docker Compose (推荐)

1. 在服务器上创建 `docker-compose.yml`：
```yaml
services:
  2fauth:
    image: nap0o/2fauth-worker:latest
    container_name: 2fauth-worker
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
    environment:
      # 核心密钥
      - ENCRYPTION_KEY=32位以上随机密钥
      - JWT_SECRET=32位以上随机JWT密钥
      - OAUTH_ALLOWED_USERS=你的邮箱@example.com
      # 登录方式（至少选一种）
      # 方式一：账号密码登录（最简单，无需第三方平台）
      - AUTH_USERNAME=admin
      - AUTH_PASSWORD=YourStrongPassword123
      # 方式二：GitHub OAuth
      #- OAUTH_GITHUB_CLIENT_ID=你的ID
      #- OAUTH_GITHUB_CLIENT_SECRET=你的Secret
      #- OAUTH_GITHUB_REDIRECT_URI=https://你的域名/oauth/callback
      - LOG_LEVEL=info
    restart: unless-stopped
```
2. 运行 `docker compose up -d` 即可。

#### 2. 使用 Docker Run
```bash
docker run -d --name 2fauth-worker \
  -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  -e ENCRYPTION_KEY=32位以上随机密钥 \
  -e JWT_SECRET=32位以上随机JWT密钥 \
  -e OAUTH_ALLOWED_USERS=你的邮箱 \
  # 登录方式（至少选一种）：
  # 方式一：账号密码登录（最简单）
  -e AUTH_USERNAME=admin \
  -e AUTH_PASSWORD=YourStrongPassword123 \
  # 方式二：GitHub OAuth
  #-e OAUTH_GITHUB_CLIENT_ID= \
  #-e OAUTH_GITHUB_CLIENT_SECRET= \
  #-e OAUTH_GITHUB_REDIRECT_URI=https://你的域名/oauth/callback \
  -e LOG_LEVEL=info \
  nap0o/2fauth-worker:latest
```

---

### 方式 C：通过 GitHub Actions 部署 (适合进阶用户)

如果你想对代码进行持续部署，或者更精确地管理数据库，建议使用此方式。

#### 1. 准备工作

*   在 `存储和数据库` -> `D1 SQL 数据库` 中创建一个名为 `2fauth-db` 的数据库，并记录其 **Database ID**。
    1. 登录 Cloudflare Dashboard
    2. 左侧菜单选择 **存储和数据库** → **D1 SQL 数据库**
    3. 点击 **创建数据库**
    4. 数据库名称填写 `2fauth-db`
    5. 点击 **创建**，完成后记录 **Database ID**

*   在 Cloudflare 控制面板获取 **API 令牌**（需要 `编辑 Cloudflare Workers` 权限）。
    1. 登录 Cloudflare Dashboard
    2. 前往 [API 令牌页面](https://dash.cloudflare.com/profile/api-tokens)
    3. 点击 **创建令牌**
    4. 选择使用模版 **编辑 Cloudflare Workers**
    5. 配置 **帐户资源** 和 **区域资源**
    6. 依次点击 **继续以显示摘要** → **创建令牌**
    7. 复制生成的令牌（仅显示一次）

#### 2. 配置仓库
1.  **Fork** 本仓库到你的 GitHub 账号。
2.  创建名为 `2fauth-db` 的 D1 数据库，并在 D1 控制台执行 `backend/schema.sql` 建表（详见上方 [D1 数据库配置](#d1-数据库配置)）。
3.  前往仓库的 `Settings` -> `Secrets and variables` -> `Actions`。
4.  添加如下 Secrets：

    | 变量名 | 说明 |
    | :--- | :--- |
    | `CLOUDFLARE_ACCOUNT_ID` | 你的 CF 账户 ID |
    | `CLOUDFLARE_API_TOKEN` | 刚刚生成的 API 令牌 |
    | `CLOUDFLARE_D1_DATABASE_ID` | D1 数据库的 ID |
    | `CLOUDFLARE_D1_DATABASE_NAME` | D1 数据库的名称 |
    | `ENCRYPTION_KEY` | 32位以上随机密钥 |
    | `JWT_SECRET` | 32位以上随机JWT密钥 |
    | `OAUTH_ALLOWED_USERS` | 你的邮箱@example.com |
    | `AUTH_USERNAME` | 密码登录用户名（与 `AUTH_PASSWORD` 配合） |
    | `AUTH_PASSWORD` | 密码登录密码（与 `AUTH_USERNAME` 配合） |
    | `OAUTH_GITHUB_CLIENT_ID` | GitHub OAuth Client ID（如用 GitHub 登录） |
    | `OAUTH_GITHUB_CLIENT_SECRET` | GitHub OAuth Client Secret（如用 GitHub 登录） |
    | `OAUTH_GITHUB_REDIRECT_URI` | GitHub OAuth 回调地址（如用 GitHub 登录） |

    > 密码登录和 OAuth 可同时启用，至少选一种登录方式。

    添加方式：进入你 Fork 的仓库页面 → `Settings` → `Secrets and variables` → `Actions` → `New repository secret`，依次添加上方列出的每个 Secret。

#### 3. 触发部署
*   前往仓库的 `Actions` 页面，手动运行 `Deploy to Cloudflare Workers` 工作流，或向 `main` 分支推送代码即可。

    1. 进入仓库的 **Actions** 页面
    2. 左侧选择 **Deploy to Cloudflare Workers** 工作流
    3. 点击右侧 **Run workflow** 按钮
    4. 选择 `main` 分支，点击 **Run workflow**
    5. 等待构建和部署完成（约 2-3 分钟）

---

## 🧩 关键环境变量配置

不论使用哪种方式部署，以下参数都非常重要：

| 变量名 | 作用 | 获取建议 |
| :--- | :--- | :--- |
| `ENCRYPTION_KEY` | **核心：** 数据库加密密钥 | 设好后**绝对不要改**！改了旧数据就解不开了。要求：32 位以上随机字符。 |
| `JWT_SECRET` | 登录状态密钥 | 要求：32 位以上随机字符。 |
| `OAUTH_ALLOWED_USERS` | **白名单：** 只有谁能进 | 填你的邮箱或 Telegram 数字 ID，多个用逗号隔开。 |
| `AUTH_USERNAME` | **密码登录：** 用户名 | 与 `AUTH_PASSWORD` 配合使用，无需第三方 OAuth 平台即可登录。 |
| `AUTH_PASSWORD` | **密码登录：** 密码 | 与 `AUTH_USERNAME` 配合使用。 |


### 依据你选取的登录平台，在环境变量中填入对应参数（任选其一即可）：

> 💡 **最简方案**：只需配置 `AUTH_USERNAME` + `AUTH_PASSWORD` 即可实现账号密码登录，无需任何第三方平台。密码登录和 OAuth 可同时启用。

| 平台 | Client ID 变量名 | Client Secret 变量名 | Redirect URI 回调变量名 (示例: `https://xxx.dev/oauth/callback`) |
| :--- | :--- | :--- | :--- |
| **GitHub** | `OAUTH_GITHUB_CLIENT_ID` | `OAUTH_GITHUB_CLIENT_SECRET` | `OAUTH_GITHUB_REDIRECT_URI` |
| **Telegram** | `OAUTH_TELEGRAM_BOT_NAME` | `OAUTH_TELEGRAM_BOT_TOKEN` | *Telegram 无需 URI 回调变量* |
| **Google** | `OAUTH_GOOGLE_CLIENT_ID` | `OAUTH_GOOGLE_CLIENT_SECRET` | `OAUTH_GOOGLE_REDIRECT_URI` |
| **Cloudflare Access** | `OAUTH_CLOUDFLARE_CLIENT_ID` | `OAUTH_CLOUDFLARE_CLIENT_SECRET` | `OAUTH_CLOUDFLARE_REDIRECT_URI` (需配置 `OAUTH_CLOUDFLARE_ORG_DOMAIN`) |
| **Gitee** | `OAUTH_GITEE_CLIENT_ID` | `OAUTH_GITEE_CLIENT_SECRET` | `OAUTH_GITEE_REDIRECT_URI` |
| **NodeLoc** | `OAUTH_NODELOC_CLIENT_ID` | `OAUTH_NODELOC_CLIENT_SECRET` | `OAUTH_NODELOC_REDIRECT_URI` |

---

#### 如何配置 Github 第三方登录（推荐）
1. 访问 GitHub `Settings` → `Developer Settings` → `OAuth Apps` → **New OAuth App**
2. 填写应用名称（如 `2fauth`）
3. Homepage URL 填写你的域名（如 `https://2fa.5as.cn`）
4. 回调地址 (Callback URL) 必须填写：`https://你的域名/oauth/callback`
5. 点击 **Register application**
6. 记录 **Client ID**
7. 点击 **Generate a new client secret**，记录 **Client Secret**
8. 将 `Client ID`、`Client Secret` 和 `OAUTH_GITHUB_REDIRECT_URI` 填入环境变量

#### 如何配置Telegram第三方登录
1. 在 Telegram 搜索并添加官方机器人 **[@BotFather](https://t.me/BotFather)**，按照提示创建机器人。
2. 记录生成的 **Token** (`OAUTH_TELEGRAM_BOT_TOKEN`) 和 **用户名** (`OAUTH_TELEGRAM_BOT_NAME`)。
3. 请务必向 @BotFather 发送 `/setdomain` 指令，选择您的机器人，并输入您的**应用域名**（不需要 `https://`）。
4. 由于本项目是 Serverless 架构，您需要手动注册 Webhook。<br/>
   将下方链接中的 `<Token>` 和 `<域名>` 替换后，在浏览器中访问一次：<br/>
   `https://api.telegram.org/bot<Token>/setWebhook?url=https://<域名>/api/telegram/webhook`

5. 将 `OAUTH_TELEGRAM_BOT_TOKEN`、`OAUTH_TELEGRAM_BOT_NAME` 填入环境变量。

#### 如何配置 Cloudflare Access 第三方登录
1. 进入 **Cloudflare Zero Trust Dashboard** → **Access** → **Applications**
2. 点击 **Add an application** → 选择 **SaaS** 应用
3. 配置应用信息：
    - **应用程序**: 输入任意名称（如 `2fauth`）
    - **选择身份验证协议**: `OIDC`
    - **重定向 URL**: `https://你的域名/oauth/callback`
4. 复制保存 **Client ID** 和 **Client Secret**
5. Access 策略 → 点击 **创建新策略** → 添加策略：
    - **策略**: `Allow`
    - **选择**: `Everyone`
6. 其余均不需要额外配置，一直下一步到完成
7. 将 `OAUTH_CLOUDFLARE_CLIENT_ID`、`OAUTH_CLOUDFLARE_CLIENT_SECRET`、`OAUTH_CLOUDFLARE_REDIRECT_URI` 和 `OAUTH_CLOUDFLARE_ORG_DOMAIN` 填入环境变量

## 🔓 离线恢复 (Offline Recovery)

即使本项目停止运行，您也可以通过备份文件和您的加密密码找回 TOTP 原始数据。我们提供了一个独立的离线解密脚本，它不依赖于任何外部服务器：

- **脚本路径**：[`scripts/decrypt_backup.js`](scripts/decrypt_backup.js)
- **使用环境**：仅需安装 [Node.js](https://nodejs.org/) (内置 crypto 模块，无需 npm install)。
- **使用方法**：
  ```bash
  node scripts/decrypt_backup.js <加密的备份文件.json> <您的密码>
  ```
  解密后的数据将以明文 JSON 格式输出到控制台或保存到文件。

---

## 🔒 深度安全审计 (Security Auditing)

为了保护您的账号安全，2FAuth Worker 在设计上采取了“多重锁死”策略：

1.  **静态数据全加密**：数据库中存储的所有 TOTP 密钥种子（Secret）都经过 AES 高强度加密。即使数据库文件不幸泄露，黑客在没有 `ENCRYPTION_KEY` 的情况下也无法获得原始密钥。
2.  **访问白名单制度**：系统关闭开放注册，只有在 `OAUTH_ALLOWED_USERS` 配置列表中的用户才能进入系统。支持多种登录方式：账号密码登录（`AUTH_USERNAME` + `AUTH_PASSWORD`），或 OAuth 第三方登录（GitHub、Telegram、Google、Cloudflare Access、Gitee、NodeLoc）。
3.  **智能环境感知 (Smart Shield)**：系统在启动和运行时会持续检查运行环境（如环境变量是否完整、是否配置了至少一种登录方式、`OAUTH_ALLOW_ALL` 是否误开）。一旦发现异常，系统将拒绝生成任何验证码并进入保护模式。
4.  **端到端隔离**：前端生成的敏感操作逻辑经过严格过滤，严禁任何 XSS (跨站脚本) 攻击。
5.  **隐私第一**：本项目不包含任何追踪代码、分析工具或第三方统计插件。你的数据只属于你。

> 📊 [**点击查看由 GitHub Actions 自动生成的安全审计报告**](https://github.com/pxhzaii/2fauth-worker/blob/security-audit/README.md)

---

## 🛠️ 参与开发 (Local Development)

```bash
# 1. 克隆并安装依赖
git clone https://github.com/pxhzaii/2fauth-worker.git
cd 2fauth-worker
npm install

# 2.复制 example.dev.vars 为 .dev.vars, 按说明写入开发用的测试密钥
cp example.dev.vars .dev.vars

# 3. 初始化本地的 SQLite Sandbox 数据库
npx wrangler d1 execute 2fauth-db-dev --local --env dev --file=backend/schema.sql

# 4. 运行本地开发
npm run dev
```

---

## 📄 开源协议
本项目基于 [GNU AGPL v3](LICENSE) 协议开源。作为一款涉及 2FA 安全与网络服务的软件，我们坚持维护开源社区的公平性：如果您在服务器上运行本项目的修改版本并向公众提供服务，您必须向用户开放您的源代码。

> AI生成
