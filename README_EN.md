---
AIGC:
  ContentProducer: '001191110102MAD55U9H0F10002'
  ContentPropagator: '001191110102MAD55U9H0F10002'
  Label: '1'
  ProduceID: 'f181853e-708f-4eee-8d69-53cf6da01973'
  PropagateID: 'f181853e-708f-4eee-8d69-53cf6da01973'
  ReservedCode1: '892c528f-d345-40ff-82e6-0118d21a4063'
  ReservedCode2: '892c528f-d345-40ff-82e6-0118d21a4063'
---

# 2FAuth Worker

English | [中文](README.md)

**High-security, lightweight Two-Factor Authentication (2FA/TOTP) management system supporting both Cloudflare Serverless and Docker private deployment.**


[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=flat&logo=cloudflare)](https://workers.cloudflare.com/)
[![Docker](https://img.shields.io/badge/Docker-Supported-2496ED?logo=docker&logoColor=white)](https://hub.docker.com/r/nap0o/2fauth-worker)
[![GitHub Actions](https://img.shields.io/badge/GitHub-Actions-181717?style=flat&logo=github)](https://github.com/pxhzaii/2fauth-worker/actions)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-red.svg)](https://www.gnu.org/licenses/agpl-3.0)

[**Click here for LIVE DEMO**](https://2fa.nezha.pp.ua)

> 💡 **Tip**: The demo site has open enrollment enabled; data can be modified or deleted. For official deployment, please ensure you configure the allowed users whitelist.

---

## 🌟 Why choose 2FAuth Worker?

Whether you're leveraging Cloudflare's free tier or deploying on your own NAS/mini-PC, 2FAuth Worker provides the **most secure** and convenient 2FA management experience.

### 🕊️ True "Dual-Mode" Deployment
*   **Cloudflare Lovers**: One-click deployment to Cloudflare Workers – zero cost, zero maintenance, and global acceleration.
*   **Private Cloud Geeks**: Supports Docker deployment. Keep your data locked on your own hardware; it even works in offline local networks.

### 📱 Smooth PWA Experience
*   **Immersive Experience**: Install it to your desktop or mobile home screen for a distraction-free environment without browser bars.
*   **Offline Ready**: Thanks to advanced Service Worker caching, it opens instantly and generates accurate codes even in extreme environments without internet (like basements or airplanes).

### 🛡️ "Smart Shield" Security (Health Shield)
*   Built-in intelligent health checks. If the system detects critical missing keys or improper configurations, it will immediately "shut down" access to prevent your data from being exposed in an insecure environment.

### 📦 The Ultimate "Undo Button" (Multi-channel Backup)
*   Supports automatic backups via WebDAV, S3-compatible storage, Telegram bots, Google Drive, OneDrive, Baidu Netdisk, Dropbox, or Email. If you lose your phone, reinstall your OS, or even lose your Cloudflare account, you can recover everything instantly from your backup.

---

<details>
<summary>Click to view: Product Feature Comparison</summary>

| Feature | **2FAuth Worker** (This Project) | Google / MS Auth | Authy | 2FAS / Aegis | 1Password / Bitwarden |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Data Ownership | ✅ Full Control (Private/NAS) | ❌ Tied to Big Tech | ❌ Vendor-locked | ✅ Local/Private Cloud | ⚠️ Third-party Hosted |
| Cross-Platform | ✅ Web+PWA (Universal) | ⚠️ Mobile App only | ❌ Desktop App closed | ⚠️ Mobile App only | ✅ Full Platform Support |
| Recovery | ✅ Auto Backups (8 channels) | ⚠️ Manually Exporting | ✅ Cloud Sync | ⚠️ Manage Files Manually | ✅ Cloud Sync |
| Privacy | ✅ Anonymous, No Tracking | ⚠️ Tied to Big Tech ID | ⚠️ Forced Phone Bind | ✅ No Tracking | ✅ Safe but high profile |
| Offline Support | ✅ Yes (PWA Cache) | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| Cost | ✅ $0 (CF Serverless) | ✅ Free | ✅ Free | ✅ Free | 💰 Subscription based |
| Vendor Risk | ✅ Source in Hand | ⚠️ Forced migration risks | 🚨 Feature shutdowns (PC) | ✅ Open-source control | ⚠️ Subscription/Closed |

> 🎯 **Summary**: **2FAuth Worker** combines the multi-device convenience of 1Password with the privacy of open-source apps, and the zero cost of Serverless. **Multi-channel automatic backup** (WebDAV, S3, Telegram, Google Drive, OneDrive, Baidu Netdisk, Dropbox, Email) completely eliminates "data loss anxiety" common in both web and mobile apps, making security truly accessible.

</details>

---

## 🚀 Deployment Guide (Choose One)

### Option A: Cloudflare Worker (Fastest, Recommended for Beginners)

The most hassle-free way. No server required; Cloudflare hosts it for you for free.

#### 1. One-click Auto Deploy
1. Fork this repository, and give it a `Star`! ⭐
2. Click the deploy button below <br />
[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://dash.cloudflare.com/?to=/:account/workers-and-pages/create)

> ⚠️ **Note**: After deployment, you must manually create a D1 database named `2fauth-db` and execute `backend/schema.sql` in the D1 console to create the tables. Then bind the database to the Worker project (binding variable name: `DB`). See the [D1 Database Setup](#d1-database-setup) section below for details.

#### 2. Notes & Authorization
*   In the deployment wizard, you need to authorize Cloudflare to read this repository.

<details>
<summary>Click to view: Authorization Guide</summary>

1. In the Cloudflare deployment wizard, select **Connect to Git**
2. Authorize Cloudflare to access your GitHub account
3. Select your forked `2fauth-worker` repository
4. After authorization, Cloudflare will automatically read the repository source code

</details>

#### 3. Deployment Flow
Click in sequence: Continue with GitHub -> Select your forked repository (2fauth-worker) -> Next -> Deploy -> Continue to project -> Settings

<details>
<summary>Click to view: Detailed deployment steps</summary>

1. Click **Continue with GitHub** and select your forked repository (`2fauth-worker`)
2. Click **Next** → **Deploy** and wait for the build to complete
3. After deployment, click **Continue to project** → **Settings**
4. Add environment variables and secrets in the settings page (see next step)
5. Build command: `npm run build --prefix frontend`
6. Deploy command: `npx wrangler deploy`

</details>

#### D1 Database Setup
After the first deployment, you must create a D1 database and execute the schema:

<details>
<summary>Click to view: D1 Database Setup Steps</summary>

1. Go to Cloudflare Dashboard → **Storage & Databases** → **D1 SQL Database** → **Create Database**
2. Name it `2fauth-db` and click **Create**
3. Enter the database console, click **Console** tab
4. Copy the entire contents of [`backend/schema.sql`](backend/schema.sql) from this repository and paste it into the console, then click **Execute**
5. Go back to your Worker project → **Settings** → **Bindings** → **Add binding** → select **D1 database**
6. Set the binding variable name to `DB` and select the `2fauth-db` database you just created
7. Click **Save and Deploy** to apply the binding

</details>

#### 4. Add the following Variables and Secrets in `Settings`
  *   `ENCRYPTION_KEY`: A random key with at least 32 characters.
  *   `JWT_SECRET`: A random JWT secret with at least 32 characters.
  *   `OAUTH_ALLOWED_USERS`: your_email@example.com
  *   Login method (at least one required):
      *   Password login: `AUTH_USERNAME` (username) + `AUTH_PASSWORD` (password)
      *   GitHub OAuth: `OAUTH_GITHUB_CLIENT_ID` + `OAUTH_GITHUB_CLIENT_SECRET` + `OAUTH_GITHUB_REDIRECT_URI`
      *   Other OAuth providers: see below

<details>
<summary>Click to view: Steps to add Variables and Secrets</summary>

1. Go to Workers & Pages → select your `2fauth-worker` project
2. Click **Settings** → **Variables and Secrets**
3. Click **Add**, choose type as **Secret** or **Text**
4. Add each variable listed above
5. After adding, click **Save and Deploy** to apply the changes

</details>

---

### Option B: Docker (For NAS / Private Server Users)

If you want absolute control over your data or need to run it in a local network.

**⚠️ Important Security Notice**: To provide the highest level of security, this image runs strictly as a **non-privileged user (node, UID 1000)** to prevent container escape risks. 
You **MUST** create the data directory and set the correct permissions on your host machine before starting the container, otherwise you will encounter `Permission Denied` errors.

#### 0. Prepare Data Directory (Required)
```bash
mkdir -p data && sudo chown -R 1000:1000 data
```

#### 1. Using Docker Compose (Recommended)

1. Create `docker-compose.yml` on your server:
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
      # Core Secrets
      - ENCRYPTION_KEY=Your_32_Character_Random_Key
      - JWT_SECRET=Your_32_Character_Random_JWT_Secret
      - OAUTH_ALLOWED_USERS=your_email@example.com
      # Login method (at least one required)
      # Option 1: Password login (simplest, no third-party platform needed)
      - AUTH_USERNAME=admin
      - AUTH_PASSWORD=YourStrongPassword123
      # Option 2: GitHub OAuth
      #- OAUTH_GITHUB_CLIENT_ID=your_id
      #- OAUTH_GITHUB_CLIENT_SECRET=your_secret
      #- OAUTH_GITHUB_REDIRECT_URI=https://your-domain.com/oauth/callback
      - LOG_LEVEL=info
    restart: unless-stopped
```
2. Run `docker compose up -d`.

#### 2. Using Docker Run
```bash
docker run -d --name 2fauth-worker \
  -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  -e ENCRYPTION_KEY=Your_32_Character_Random_Key \
  -e JWT_SECRET=Your_32_Character_Random_JWT_Secret \
  -e OAUTH_ALLOWED_USERS=your_email@example.com \
  # Login method (at least one required):
  # Option 1: Password login (simplest)
  -e AUTH_USERNAME=admin \
  -e AUTH_PASSWORD=YourStrongPassword123 \
  # Option 2: GitHub OAuth
  #-e OAUTH_GITHUB_CLIENT_ID= \
  #-e OAUTH_GITHUB_CLIENT_SECRET= \
  #-e OAUTH_GITHUB_REDIRECT_URI=https://your-domain.com/oauth/callback \
  -e LOG_LEVEL=info \
  nap0o/2fauth-worker:latest
```

---

### Option C: GitHub Actions (For Advanced Users)

Choose this for continuous deployment or more precise database management.

#### 1. Prerequisites

*   Create a D1 database named `2fauth-db` in `Storage & Databases` -> `D1 SQL Database` and record its **Database ID**.
<details>
<summary>Click to view: Steps to create D1 SQL Database</summary>

1. Log in to Cloudflare Dashboard
2. Navigate to **Storage & Databases** → **D1 SQL Database**
3. Click **Create Database**
4. Enter database name: `2fauth-db`
5. Click **Create**, then record the **Database ID**

</details>

*   Obtain a **Cloudflare API Token** (requires `Edit Cloudflare Workers` permissions).
<details>
<summary>Click to view: Steps to obtain Cloudflare Worker Deployment Token</summary>

1. Log in to Cloudflare Dashboard
2. Go to [API Tokens page](https://dash.cloudflare.com/profile/api-tokens)
3. Click **Create Token**
4. Choose the **Edit Cloudflare Workers** template
5. Configure **Account Resources** and **Zone Resources**
6. Click **Continue to summary** → **Create Token**
7. Copy the generated token (shown only once)

</details>

#### 2. Repository Configuration
1.  **Fork** this repository.
2.  Create a D1 database named `2fauth-db` and execute `backend/schema.sql` in the D1 console (see [D1 Database Setup](#d1-database-setup) above).
3.  Go to `Settings` -> `Secrets and variables` -> `Actions`.
4.  Add the following secrets:
   *   `CLOUDFLARE_ACCOUNT_ID`: Your CF Account ID.
   *   `CLOUDFLARE_API_TOKEN`: Your API Token.
   *   `CLOUDFLARE_D1_DATABASE_ID`: Your D1 Database ID.
   *   `CLOUDFLARE_D1_DATABASE_NAME`: `2fauth-db`.
   *   `ENCRYPTION_KEY`: A 32+ character random key.
   *   `JWT_SECRET`: A 32+ character random JWT secret.
   *   `OAUTH_ALLOWED_USERS`: your_email@example.com
   *   Login method (at least one required):
       *   Password login: `AUTH_USERNAME` + `AUTH_PASSWORD`
       *   GitHub OAuth: `OAUTH_GITHUB_CLIENT_ID` + `OAUTH_GITHUB_CLIENT_SECRET` + `OAUTH_GITHUB_REDIRECT_URI`

<details>
<summary>Click to view: Secrets Configuration Guide</summary>

1. Go to your forked repository page
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each Secret listed above (name and value)
5. After adding, all Secrets will appear in the list

</details>

#### 3. Trigger Deployment
*   Go to the `Actions` page, manually run the `Deploy to Cloudflare Workers` workflow, or push code to the `main` branch.

<details>
<summary>Click to view: Manual deployment steps</summary>

1. Go to the **Actions** page of your repository
2. Select **Deploy to Cloudflare Workers** workflow on the left
3. Click the **Run workflow** button on the right
4. Select `main` branch and click **Run workflow**
5. Wait for build and deployment to complete (about 2-3 minutes)

</details>

---

## 🧩 Environment Variables Configuration

Regardless of the deployment method, these parameters are critical:

| Variable | Function | Recommendation |
| :--- | :--- | :--- |
| `ENCRYPTION_KEY` | **Core**: Database encryption key | **DO NOT CHANGE** after setup! Requirement: 32+ characters. |
| `JWT_SECRET` | Auth Token Secret | Requirement: 32+ characters. |
| `OAUTH_ALLOWED_USERS` | **Whitelist**: Access Control | Emails or Telegram IDs, separated by commas. |
| `AUTH_USERNAME` | **Password login**: Username | Used with `AUTH_PASSWORD`. No third-party OAuth platform required. |
| `AUTH_PASSWORD` | **Password login**: Password | Used with `AUTH_USERNAME`. |

### Variable Mapping for Different Providers (Choose at least one):

> 💡 **Simplest option**: Just configure `AUTH_USERNAME` + `AUTH_PASSWORD` for password login. No third-party platform needed. Password login and OAuth can be enabled simultaneously.

| Provider | Client ID Variable | Client Secret Variable | Redirect URI (Example: `https://xxx.dev/oauth/callback`) |
| :--- | :--- | :--- | :--- |
| **GitHub** | `OAUTH_GITHUB_CLIENT_ID` | `OAUTH_GITHUB_CLIENT_SECRET` | `OAUTH_GITHUB_REDIRECT_URI` |
| **Telegram** | `OAUTH_TELEGRAM_BOT_NAME` | `OAUTH_TELEGRAM_BOT_TOKEN` | *Not required for Telegram* |
| **Google** | `OAUTH_GOOGLE_CLIENT_ID` | `OAUTH_GOOGLE_CLIENT_SECRET` | `OAUTH_GOOGLE_REDIRECT_URI` |
| **Cloudflare Access** | `OAUTH_CLOUDFLARE_CLIENT_ID` | `OAUTH_CLOUDFLARE_CLIENT_SECRET` | `OAUTH_CLOUDFLARE_REDIRECT_URI` (requires `OAUTH_CLOUDFLARE_ORG_DOMAIN`) |
| **Gitee** | `OAUTH_GITEE_CLIENT_ID` | `OAUTH_GITEE_CLIENT_SECRET` | `OAUTH_GITEE_REDIRECT_URI` |
| **NodeLoc** | `OAUTH_NODELOC_CLIENT_ID` | `OAUTH_NODELOC_CLIENT_SECRET` | `OAUTH_NODELOC_REDIRECT_URI` |

---

#### How to configure GitHub OAuth Login (Recommended)
1. Visit GitHub `Settings` -> `Developer Settings` -> `OAuth Apps` -> **New OAuth App**.
2. **Authorization callback URL** must be: `https://your-domain.com/oauth/callback`.
3. Fill `Client ID`, `Client Secret` and `OAUTH_GITHUB_REDIRECT_URI` into environment variables.

<details>
<summary>Click to view: Github OAuth Configuration Steps</summary>

1. Visit GitHub `Settings` → `Developer Settings` → `OAuth Apps` → **New OAuth App**
2. Fill in the application name (e.g., `2fauth`)
3. Homepage URL: your domain (e.g., `https://2fa.5as.cn`)
4. Callback URL: `https://your-domain.com/oauth/callback`
5. Click **Register application**
6. Record the **Client ID**
7. Click **Generate a new client secret** and record the **Client Secret**
8. Fill Client ID, Client Secret, and Redirect URI into environment variables

</details>

#### How to configure Telegram Login
1. Search and add **[@BotFather](https://t.me/BotFather)** on Telegram, following prompts to create a bot.
2. Record the **Token** (`OAUTH_TELEGRAM_BOT_TOKEN`) and **Username** (`OAUTH_TELEGRAM_BOT_NAME`).
3. You MUST send the `/setdomain` command to @BotFather, select your bot, and enter your **application domain** (without `https://`).
4. Since this is a Serverless architecture, you need to manually register the Webhook.<br/>
   Replace `<Token>` and `<Domain>` in the link below and visit it once in your browser:<br/>
   `https://api.telegram.org/bot<Token>/setWebhook?url=https://<Domain>/api/telegram/webhook`

5. Fill `OAUTH_TELEGRAM_BOT_TOKEN`, `OAUTH_TELEGRAM_BOT_NAME` into environment variables.

#### How to configure Cloudflare Access Login
1. Enter **Cloudflare Zero Trust Dashboard** -> **Access** -> **Applications**.
2. Create a **SaaS** application (Select "SaaS").
3. Configure **Application**:
    - **Name**: `Anything, e.g., 2fauth`
    - **Authentication Protocol**: `OIDC`
    - **Redirect URL**: `https://your-domain.com/oauth/callback`
4. Copy and save `Client ID` and `Client Secret`.
5. Access Policy -> Click create new policy -> Add policy:
    - **Policy**: `Allow`
    - **Selector**: `Everyone`
6. No additional configuration needed, click next through to completion.
7. Fill `OAUTH_CLOUDFLARE_CLIENT_ID`, `OAUTH_CLOUDFLARE_CLIENT_SECRET`, `OAUTH_CLOUDFLARE_REDIRECT_URI` and `OAUTH_CLOUDFLARE_ORG_DOMAIN` into environment variables.

<details>
<summary>Click to view: Cloudflare Access OAuth Configuration Steps</summary>

1. Enter **Cloudflare Zero Trust Dashboard** → **Access** → **Applications**
2. Click **Add an application** → select **SaaS** application
3. Configure application info:
   - **Name**: Any name (e.g., `2fauth`)
   - **Authentication Protocol**: `OIDC`
   - **Redirect URL**: `https://your-domain.com/oauth/callback`
4. Copy and save **Client ID** and **Client Secret**
5. Access Policy → Click **Create new policy** → Add policy:
   - **Policy**: `Allow`
   - **Selector**: `Everyone`
6. No additional configuration needed, click next through to completion
7. Fill `OAUTH_CLOUDFLARE_CLIENT_ID`, `OAUTH_CLOUDFLARE_CLIENT_SECRET`, `OAUTH_CLOUDFLARE_REDIRECT_URI` and `OAUTH_CLOUDFLARE_ORG_DOMAIN` into environment variables

</details>

## 🔓 Offline Recovery

Even if this project stops running, you can still recover your TOTP raw data using your backup file and encryption password. We provide a standalone offline decryption script that does not depend on any external servers:

- **Script Path**: [`scripts/decrypt_backup.js`](scripts/decrypt_backup.js)
- **Requirement**: Just [Node.js](https://nodejs.org/) (uses built-in crypto module, no `npm install` required).
- **Usage**:
  ```bash
  node scripts/decrypt_backup.js <encrypted_backup.json> <your_password>
  ```
  The decrypted data will be output to the console or saved to a file in plaintext JSON format.

---

## 🔒 Security Auditing

To protect your account security, 2FAuth Worker implements a "Multi-Lock" strategy:

1.  **At-Rest Encryption**: All TOTP seeds stored in the database are encrypted using AES. Even if the database file is leaked, unauthorized parties cannot obtain raw keys without the `ENCRYPTION_KEY`.
2.  **Whitelist-Only Access**: Open registration is disabled. Only accounts in the `OAUTH_ALLOWED_USERS` list can access the system. Supports multiple login methods: password login (`AUTH_USERNAME` + `AUTH_PASSWORD`), or OAuth providers (GitHub, Telegram, Google, Cloudflare Access, Gitee, NodeLoc).
3.  **Smart Shield Persistence (Health Shield)**: The system continuously monitors the runtime environment. If any anomalies are detected (e.g., missing keys, no login method configured, `OAUTH_ALLOW_ALL` set to true), it enters protection mode and refuses to generate verification codes.
4.  **End-to-End Isolation**: Sensitive frontend logic is strictly filtered to prevent XSS (Cross-Site Scripting) attacks.
5.  **Privacy First**: This project contains no tracking code, analytics tools, or third-party cookies. Your data is yours alone.

> 📊 [**Click to view the real-time security audit report generated by GitHub Actions**](https://github.com/pxhzaii/2fauth-worker/blob/security-audit/README.md)

---

## 🛠️ Local Development

```bash
# 1. Clone and install dependencies
git clone https://github.com/pxhzaii/2fauth-worker.git
cd 2fauth-worker
npm install

# 2. Configure environment
cp example.dev.vars .dev.vars

# 3. Initialize local SQLite Sandbox
npx wrangler d1 execute 2fauth-db-dev --local --env dev --file=backend/schema.sql

# 4. Start dev server
npm run dev
```

---

## 📄 License
This project is open-sourced under the [GNU AGPL v3](LICENSE) license. Since this software involves 2FA security and network services, we maintain open-source fairness: if you run a modified version of this project on a server and provide services to the public, you must open your source code to the users.

> AI生成