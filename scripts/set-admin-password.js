#!/usr/bin/env node

/**
 * Set Admin Password
 * 
 * Creates/updates the admin account with a hashed password
 */

const { pool } = require('/vercel/share/v0-project/lib/db')
const crypto = require('crypto')

// Import argon2 to hash the password
const argon2 = require('@node-rs/argon2')

const ADMIN_EMAIL = 'nextgenmedia868@gmail.com'
const PASSWORD = process.env.ADMIN_PASSWORD || 'TestPassword123!'

async function setAdminPassword() {
  let client
  try {
    console.log('🔐 Setting admin password...')

    // Hash the password using Argon2
    const hashedPassword = await argon2.hash(PASSWORD, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    })

    client = await pool.connect()

    // Get the admin user
    const userResult = await client.query(
      'SELECT id FROM "user" WHERE email = $1',
      [ADMIN_EMAIL]
    )

    if (userResult.rows.length === 0) {
      console.error('❌ Admin user not found')
      process.exit(1)
    }

    const userId = userResult.rows[0].id

    // Check if account already exists
    const accountResult = await client.query(
      'SELECT id FROM "account" WHERE userId = $1 AND providerId = $2',
      [userId, 'credential']
    )

    if (accountResult.rows.length > 0) {
      // Update existing account
      await client.query(
        'UPDATE "account" SET password = $1 WHERE id = $2',
        [hashedPassword, accountResult.rows[0].id]
      )
      console.log('✅ Admin password updated')
    } else {
      // Create new account
      const accountId = `account_${crypto.randomBytes(8).toString('hex')}`
      await client.query(
        'INSERT INTO "account" (id, accountId, providerId, userId, password) VALUES ($1, $2, $3, $4, $5)',
        [accountId, userId, 'credential', userId, hashedPassword]
      )
      console.log('✅ Admin account created with password')
    }

    console.log(`📧 Email: ${ADMIN_EMAIL}`)
    console.log(`🔑 Password: ${PASSWORD}`)
    console.log('\n✨ Admin is now ready to log in!')

  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  } finally {
    if (client) {
      client.release()
    }
    await pool.end()
  }
}

setAdminPassword()
