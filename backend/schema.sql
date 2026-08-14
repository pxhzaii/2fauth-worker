CREATE TABLE IF NOT EXISTS vault (
    id TEXT PRIMARY KEY,
    service TEXT NOT NULL,
    account TEXT NOT NULL,
    category TEXT,
    secret TEXT NOT NULL,
    digits INTEGER DEFAULT 6,
    period INTEGER DEFAULT 30,
    algorithm TEXT DEFAULT 'SHA1',
    created_at INTEGER,
    created_by TEXT,
    updated_at INTEGER,
    updated_by TEXT,
    sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS backup_providers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    is_enabled BOOLEAN DEFAULT 1,
    config TEXT NOT NULL,
    auto_backup BOOLEAN DEFAULT 0,
    auto_backup_password TEXT,
    auto_backup_retain INTEGER DEFAULT 30,
    last_backup_at INTEGER,
    last_backup_status TEXT,
    created_at INTEGER,
    updated_at INTEGER
);

CREATE TABLE IF NOT EXISTS backup_telegram_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    provider_id INTEGER NOT NULL,
    filename TEXT NOT NULL,
    file_id TEXT NOT NULL,
    message_id INTEGER NOT NULL,
    size INTEGER NOT NULL,
    created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS backup_email_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    provider_id INTEGER NOT NULL,
    filename TEXT NOT NULL,
    recipient TEXT NOT NULL,
    size INTEGER NOT NULL,
    created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS auth_passkeys (
    credential_id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    public_key BLOB NOT NULL,
    counter INTEGER DEFAULT 0,
    name TEXT,
    transports TEXT,
    created_at INTEGER NOT NULL,
    last_used_at INTEGER
);

CREATE TABLE IF NOT EXISTS rate_limits (
    key TEXT PRIMARY KEY,
    attempts INTEGER DEFAULT 0,
    last_attempt INTEGER,
    expires_at INTEGER
);

CREATE TABLE IF NOT EXISTS _schema_metadata (
    key TEXT PRIMARY KEY,
    value TEXT
);
