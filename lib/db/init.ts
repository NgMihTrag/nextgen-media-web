import { pool } from '@/lib/db'

/**
 * Initialize database schema - creates all required tables if they don't exist
 * All column names are quoted to preserve camelCase for Better Auth compatibility
 */
export function initializeSchemaSync() {
  const createTablesSQL = `
    CREATE TABLE IF NOT EXISTS "user" (
      "id" TEXT PRIMARY KEY,
      "name" TEXT NOT NULL,
      "email" TEXT NOT NULL UNIQUE,
      "emailVerified" BOOLEAN NOT NULL DEFAULT false,
      "image" TEXT,
      "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS "session" (
      "id" TEXT PRIMARY KEY,
      "expiresAt" TIMESTAMP NOT NULL,
      "token" TEXT NOT NULL UNIQUE,
      "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
      "ipAddress" TEXT,
      "userAgent" TEXT,
      "userId" TEXT NOT NULL,
      FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS "account" (
      "id" TEXT PRIMARY KEY,
      "accountId" TEXT NOT NULL,
      "providerId" TEXT NOT NULL,
      "userId" TEXT NOT NULL,
      "accessToken" TEXT,
      "refreshToken" TEXT,
      "idToken" TEXT,
      "accessTokenExpiresAt" TIMESTAMP,
      "refreshTokenExpiresAt" TIMESTAMP,
      "scope" TEXT,
      "password" TEXT,
      "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
      FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS "verification" (
      "id" TEXT PRIMARY KEY,
      "identifier" TEXT NOT NULL,
      "value" TEXT NOT NULL,
      "expiresAt" TIMESTAMP NOT NULL,
      "createdAt" TIMESTAMP,
      "updatedAt" TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS "user_email_idx" ON "user"("email");
    CREATE INDEX IF NOT EXISTS "session_token_idx" ON "session"("token");
    CREATE INDEX IF NOT EXISTS "session_userId_idx" ON "session"("userId");
    CREATE INDEX IF NOT EXISTS "account_userId_idx" ON "account"("userId");
  `

  try {
    // Use synchronous connection directly from pool
    const client = pool.connect()
    
    client.then(async (conn) => {
      try {
        const statements = createTablesSQL.split(';').filter(s => s.trim().length > 0)
        
        for (const statement of statements) {
          try {
            await conn.query(statement)
          } catch (err: any) {
            // Ignore "already exists" errors
            if (err.code !== '42P07' && !err.message.includes('already exists')) {
              console.error('[Schema Init] Error executing statement:', err.message)
            }
          }
        }

        console.log('[Schema Init] Database schema initialized successfully')

        // Check if admin user exists
        const checkAdmin = await conn.query(
          'SELECT id FROM "user" WHERE email = $1',
          ['nextgenmedia868@gmail.com']
        )

        if (checkAdmin.rows.length === 0) {
          // Create admin user
          await conn.query(
            'INSERT INTO "user" ("id", "name", "email", "emailVerified") VALUES ($1, $2, $3, $4)',
            [`admin_${Date.now()}`, 'Admin', 'nextgenmedia868@gmail.com', true]
          )
          console.log('[Schema Init] Admin user created')
        }
      } finally {
        conn.release()
      }
    }).catch(err => {
      console.error('[Schema Init] Failed to initialize schema:', err)
    })
  } catch (error) {
    console.error('[Schema Init] Failed to initialize schema:', error)
  }
}

// Run on module load
if (process.env.NODE_ENV !== 'test') {
  initializeSchemaSync()
}
