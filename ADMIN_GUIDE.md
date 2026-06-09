# NextGen Media Admin Dashboard

## Admin Access

### Login Credentials
- **URL:** `/admin/login`
- **Email:** `nextgenmedia868@gmail.com`
- **Password:** Set via environment variable `ADMIN_PASSWORD` (defaults to `NextGenMedia@2024`)

### Protected Routes
Only authenticated admin users can access:
- `/admin` - Main dashboard
- `/admin/projects` - Project management

## Features

### Portfolio Management
- Create, edit, and delete portfolio projects
- Mark projects as featured
- Upload project images and links
- Organize projects by category

### Testimonials Management
- Manage client testimonials
- Star ratings system
- Featured testimonials for homepage

### Team Management
- Add team member profiles
- Skills and experience tracking
- Social links integration

### Site Statistics
- Manage key metrics and stats displayed on the site

## Authentication

The admin dashboard uses **Better Auth** with email/password authentication. Only the seeded admin account can access the admin interface.

### Seeding Admin User

To create the admin account in the database, run the seed script:

```bash
node --env-file-if-exists=/vercel/share/.env.project --env-file-if-exists=/vercel/share/.env.snowflake scripts/seed-admin.ts
```

Or use the Neon console to directly insert the admin user.

## Security

- All admin routes are protected by middleware
- Unauthenticated requests redirect to `/admin/login`
- Session-based authentication with 7-day expiration
- Admin-only actions verify user email is `nextgenmedia868@gmail.com`

## Development

The admin dashboard is built with:
- Next.js 16 with App Router
- Better Auth for authentication
- Drizzle ORM with Neon PostgreSQL
- React hooks for state management
- Tailwind CSS for styling

## Public Pages

The following pages display content from the admin-managed database:
- `/portfolio` - Shows all featured projects
- Public testimonials can be displayed on the homepage
