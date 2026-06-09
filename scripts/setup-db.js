#!/usr/bin/env node

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function setupDatabase() {
  try {
    console.log('Setting up database...')

    // Create Better Auth tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "user" (
        "id" text PRIMARY KEY,
        "name" text NOT NULL,
        "email" text NOT NULL UNIQUE,
        "emailVerified" boolean NOT NULL DEFAULT false,
        "image" text,
        "createdAt" timestamp NOT NULL DEFAULT NOW(),
        "updatedAt" timestamp NOT NULL DEFAULT NOW()
      )
    `)
    console.log('✓ Created user table')

    await pool.query(`
      CREATE TABLE IF NOT EXISTS "session" (
        "id" text PRIMARY KEY,
        "expiresAt" timestamp NOT NULL,
        "token" text NOT NULL UNIQUE,
        "createdAt" timestamp NOT NULL DEFAULT NOW(),
        "updatedAt" timestamp NOT NULL DEFAULT NOW(),
        "ipAddress" text,
        "userAgent" text,
        "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
      )
    `)
    console.log('✓ Created session table')

    await pool.query(`
      CREATE TABLE IF NOT EXISTS "account" (
        "id" text PRIMARY KEY,
        "accountId" text NOT NULL,
        "providerId" text NOT NULL,
        "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
        "accessToken" text,
        "refreshToken" text,
        "idToken" text,
        "accessTokenExpiresAt" timestamp,
        "refreshTokenExpiresAt" timestamp,
        "scope" text,
        "password" text,
        "createdAt" timestamp NOT NULL DEFAULT NOW(),
        "updatedAt" timestamp NOT NULL DEFAULT NOW()
      )
    `)
    console.log('✓ Created account table')

    await pool.query(`
      CREATE TABLE IF NOT EXISTS "verification" (
        "id" text PRIMARY KEY,
        "identifier" text NOT NULL,
        "value" text NOT NULL,
        "expiresAt" timestamp NOT NULL,
        "createdAt" timestamp DEFAULT NOW(),
        "updatedAt" timestamp DEFAULT NOW()
      )
    `)
    console.log('✓ Created verification table')

    // Create app tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "portfolio_projects" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "userId" text NOT NULL,
        "title" text NOT NULL,
        "description" text NOT NULL,
        "category" text NOT NULL,
        "image_url" text,
        "image_alt" text,
        "link" text,
        "tech_stack" text[],
        "featured" boolean DEFAULT false,
        "order_index" integer DEFAULT 0,
        "created_at" timestamp NOT NULL DEFAULT NOW(),
        "updated_at" timestamp NOT NULL DEFAULT NOW()
      )
    `)
    console.log('✓ Created portfolio_projects table')

    await pool.query(`
      CREATE TABLE IF NOT EXISTS "testimonials" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "userId" text NOT NULL,
        "client_name" text NOT NULL,
        "company" text,
        "quote" text NOT NULL,
        "avatar_url" text,
        "rating" integer DEFAULT 5,
        "featured" boolean DEFAULT false,
        "order_index" integer DEFAULT 0,
        "created_at" timestamp NOT NULL DEFAULT NOW(),
        "updated_at" timestamp NOT NULL DEFAULT NOW()
      )
    `)
    console.log('✓ Created testimonials table')

    await pool.query(`
      CREATE TABLE IF NOT EXISTS "team_members" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "userId" text NOT NULL,
        "name" text NOT NULL,
        "role" text NOT NULL,
        "bio" text,
        "avatar_url" text,
        "skills" text[],
        "social_links" jsonb DEFAULT '{}',
        "order_index" integer DEFAULT 0,
        "created_at" timestamp NOT NULL DEFAULT NOW(),
        "updated_at" timestamp NOT NULL DEFAULT NOW()
      )
    `)
    console.log('✓ Created team_members table')

    await pool.query(`
      CREATE TABLE IF NOT EXISTS "site_stats" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "userId" text NOT NULL,
        "stat_key" text NOT NULL,
        "stat_value" integer DEFAULT 0,
        "stat_label" text,
        "icon_name" text,
        "created_at" timestamp NOT NULL DEFAULT NOW(),
        "updated_at" timestamp NOT NULL DEFAULT NOW()
      )
    `)
    console.log('✓ Created site_stats table')

    // Create admin user if it doesn't exist
    const result = await pool.query(
      'SELECT id FROM "user" WHERE email = $1',
      ['nextgenmedia868@gmail.com']
    );

    if (result.rows.length === 0) {
      const adminId = `admin_${Date.now()}`;
      await pool.query(
        'INSERT INTO "user" (id, name, email, "emailVerified") VALUES ($1, $2, $3, $4)',
        [adminId, 'Admin', 'nextgenmedia868@gmail.com', true]
      );
      console.log('✓ Created admin user');
      console.log('  Email: nextgenmedia868@gmail.com');
      console.log('  ID:', adminId);
    } else {
      console.log('✓ Admin user already exists');
    }

    console.log('\n✅ Database setup complete!');
    await pool.end();
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    await pool.end();
    process.exit(1);
  }
}

setupDatabase();
