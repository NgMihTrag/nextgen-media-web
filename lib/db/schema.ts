import { pgTable, text, timestamp, boolean, integer, jsonb, uuid } from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- App tables: Admin Portfolio Management --------------------------------

export const portfolioProjects = pgTable('portfolio_projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userid').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  imageUrl: text('image_url'),
  imageAlt: text('image_alt'),
  link: text('link'),
  techStack: text('tech_stack').array().default([]),
  featured: boolean('featured').default(false),
  orderIndex: integer('order_index').default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const testimonials = pgTable('testimonials', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userid').notNull(),
  clientName: text('client_name').notNull(),
  company: text('company'),
  quote: text('quote').notNull(),
  avatarUrl: text('avatar_url'),
  rating: integer('rating').default(5),
  featured: boolean('featured').default(false),
  orderIndex: integer('order_index').default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const teamMembers = pgTable('team_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userid').notNull(),
  name: text('name').notNull(),
  role: text('role').notNull(),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  skills: text('skills').array().default([]),
  socialLinks: jsonb('social_links').default({}),
  orderIndex: integer('order_index').default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const siteStats = pgTable('site_stats', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userid').notNull(),
  statKey: text('stat_key').notNull(),
  statValue: integer('stat_value').default(0),
  statLabel: text('stat_label'),
  iconName: text('icon_name'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})
