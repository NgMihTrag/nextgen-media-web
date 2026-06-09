#!/usr/bin/env node

/**
 * Initialize Better Auth Database Schema
 * 
 * This script creates all required tables for Better Auth and app functionality.
 * Run this once after setting up the database URL.
 */

import { Pool } from 'pg'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  console.error('❌ DATABASE_URL environment variable not set')
  process.exit(1)
}

const pool = new Pool({ connectionString: databaseUrl })

const schema = `
-- User table
CREATE TABLE IF NOT EXISTS "user" (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  emailVerified BOOLEAN NOT NULL DEFAULT false,
  image TEXT,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Session table
CREATE TABLE IF NOT EXISTS "session" (
  id TEXT PRIMARY KEY,
  expiresAt TIMESTAMP NOT NULL,
  token TEXT NOT NULL UNIQUE,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
  ipAddress TEXT,
  userAgent TEXT,
  userId TEXT NOT NULL,
  FOREIGN KEY (userId) REFERENCES "user"(id) ON DELETE CASCADE
);

-- Account table
CREATE TABLE IF NOT EXISTS "account" (
  id TEXT PRIMARY KEY,
  accountId TEXT NOT NULL,
  providerId TEXT NOT NULL,
  userId TEXT NOT NULL,
  accessToken TEXT,
  refreshToken TEXT,
  idToken TEXT,
  accessTokenExpiresAt TIMESTAMP,
  refreshTokenExpiresAt TIMESTAMP,
  scope TEXT,
  password TEXT,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (userId) REFERENCES "user"(id) ON DELETE CASCADE
);

-- Verification token table
CREATE TABLE IF NOT EXISTS "verification" (
  id TEXT PRIMARY KEY,
  identifier TEXT NOT NULL,
  value TEXT NOT NULL,
  expiresAt TIMESTAMP NOT NULL,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);

-- Portfolio table
CREATE TABLE IF NOT EXISTS "portfolio" (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  link TEXT,
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  userId TEXT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (userId) REFERENCES "user"(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "user_email_idx" ON "user"(email);
CREATE INDEX IF NOT EXISTS "session_token_idx" ON "session"(token);
CREATE INDEX IF NOT EXISTS "session_userId_idx" ON "session"(userId);
CREATE INDEX IF NOT EXISTS "account_userId_idx" ON "account"(userId);
CREATE INDEX IF NOT EXISTS "portfolio_userId_idx" ON "portfolio"(userId);
`

async function initializeDatabase() {
  try {
    console.log('🚀 Initializing database schema...')
    
    // Execute the schema
    const statements = schema.split(';').filter((s) => s.trim().length > 0)
    
    for (const statement of statements) {
      try {
        await pool.query(statement)
      } catch (err: any) {
        // Ignore "already exists" errors
        if (!err.message.includes('already exists')) {
          throw err
        }
      }
    }
    
    console.log('✅ Database schema initialized successfully')
    
    // Check if admin user exists
    const result = await pool.query(
      'SELECT id FROM "user" WHERE email = $1',
      ['nextgenmedia868@gmail.com']
    )
    
    if (result.rows.length === 0) {
      // Create admin user
      await pool.query(
        'INSERT INTO "user" (id, name, email, emailVerified) VALUES ($1, $2, $3, $4)',
        [`admin_${Date.now()}`, 'Admin', 'nextgenmedia868@gmail.com', true]
      )
      console.log('✅ Admin user created: nextgenmedia868@gmail.com')
    } else {
      console.log('✅ Admin user already exists')
    }
    
  } catch (error) {
    console.error('❌ Failed to initialize database:', error)
    process.exit(1)
  } finally {
    await pool.end()
    process.exit(0)
  }
}

initializeDatabase()
