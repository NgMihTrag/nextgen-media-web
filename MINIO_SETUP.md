# MinIO Storage Setup Guide

This project has been migrated from Google Cloud Storage to MinIO for portfolio image storage. MinIO is an S3-compatible object storage solution that can be self-hosted or cloud-hosted.

## Overview

- **Storage**: Portfolio images stored in MinIO (object key: `portfolio/{uuid}.{ext}`)
- **Database**: PostgreSQL tracks `image_key` and `image_url` for each project
- **Admin Upload**: Web UI with image preview, upload progress, and validation
- **Public Access**: Stable URLs for Homepage and Portfolio pages
- **Deletion**: Automatic cleanup of MinIO objects when projects are deleted

## Required Environment Variables

Add these to your Vercel environment variables or `.env.local`:

```env
MINIO_ENDPOINT=your-minio-host.com
MINIO_PORT=443
MINIO_USE_SSL=true
MINIO_ACCESS_KEY=your-access-key
MINIO_SECRET_KEY=your-secret-key
MINIO_BUCKET=portfolio
MINIO_PUBLIC_URL=https://your-minio-host.com
```

### Variable Explanation

| Variable | Example | Description |
|----------|---------|-------------|
| `MINIO_ENDPOINT` | `minio.example.com` | Hostname or IP only (no protocol) |
| `MINIO_PORT` | `443` | MinIO server port (default: 443 for SSL) |
| `MINIO_USE_SSL` | `true` | Use HTTPS (`true`) or HTTP (`false`) |
| `MINIO_ACCESS_KEY` | Long string | Application user access key (not root) |
| `MINIO_SECRET_KEY` | Long string | Application user secret key |
| `MINIO_BUCKET` | `portfolio` | Bucket name for portfolio images |
| `MINIO_PUBLIC_URL` | `https://minio.example.com` | Public base URL (includes protocol) |

## MinIO Setup (Self-Hosted)

### 1. Create MinIO User and Bucket

Connect to your MinIO instance and create:

- **User**: Dedicated application user (not root account)
- **Bucket**: `portfolio` bucket
- **Permissions**: Restrict to `s3:GetObject`, `s3:PutObject`, `s3:DeleteObject`, `s3:ListBucket`

### 2. Example User Policy (JSON)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:GetBucketLocation",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::portfolio",
        "arn:aws:s3:::portfolio/*"
      ]
    }
  ]
}
```

### 3. Enable Public Read (Optional)

If portfolio images should be publicly readable without signed URLs:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::portfolio/*"
    }
  ]
}
```

## Upload Flow

### Client-Side (Admin Dashboard)

1. User selects image file
2. File validated (JPEG, PNG, WebP, max 10MB)
3. Image preview shown
4. On form submit, project + image saved together
5. Success/error toast displayed

### Server-Side (`/api/admin/uploads`)

1. Receive multipart/form-data
2. Validate file type and size
3. Generate UUID filename: `portfolio/{uuid}.{ext}`
4. Upload to MinIO with cache headers
5. Return `{objectKey, imageUrl}`
6. Client stores in form state

### Database Operations

```
Create: title + description + category + imageKey + imageUrl → INSERT
Update: If new image → new object created, old deleted after DB update
Delete: Retrieve imageKey → DELETE from MinIO → DELETE from DB
```

## Image URLs

Images are stored with stable, permanent URLs:

```
Format: {MINIO_PUBLIC_URL}/{MINIO_BUCKET}/{objectKey}
Example: https://minio.example.com/portfolio/550e8400-e29b-41d4-a716-446655440000.jpg
```

These URLs are safe to display on the Homepage and Portfolio pages indefinitely.

## Testing Upload Functionality

### Test 1: Login to Admin Dashboard

```bash
curl http://localhost:3000/admin/
```

You should see the Portfolio Manager.

### Test 2: Upload Image via Admin UI

1. Click "Create New Project"
2. Fill in Title, Description, Category
3. Click "Choose File" and select a JPEG/PNG/WebP image
4. See image preview
5. Fill remaining fields
6. Click "Save"
7. Verify project appears in list with image

### Test 3: Verify MinIO Upload

Check your MinIO console:

```
Bucket: portfolio
Objects: portfolio/{uuid}.jpg (or .png, .webp)
```

### Test 4: Verify Homepage Display

```bash
curl http://localhost:3000 | grep -o "storage\\.googleapis\\.com\\|{MINIO_PUBLIC_URL}"
```

Should show MinIO URLs, not Google Cloud Storage.

### Test 5: Delete Project

1. Click delete button on project card
2. Confirm deletion
3. Project removed from UI
4. Check MinIO console - object should be deleted

## Database Migration

If migrating existing Google Cloud Storage images to MinIO:

1. Export current portfolio_projects data
2. For each project with `imageUrl` from Google Cloud Storage:
   ```sql
   UPDATE portfolio_projects 
   SET image_key = NULL 
   WHERE image_url LIKE '%storage.googleapis.com%'
   ```
3. Re-upload images via Admin Dashboard
4. New uploads will have both `image_key` and `image_url`

## Troubleshooting

### "MinIO server unreachable"

- Check `MINIO_ENDPOINT` (should be hostname only, no protocol)
- Check `MINIO_PORT` (usually 9000 for local, 443 for production)
- Check `MINIO_USE_SSL` (must match your MinIO setup)
- Test connectivity: `telnet {MINIO_ENDPOINT} {MINIO_PORT}`

### "Bucket not found"

- Ensure bucket exists in MinIO
- Check `MINIO_BUCKET` spelling
- Verify application user has bucket access

### "Access Denied"

- Check `MINIO_ACCESS_KEY` and `MINIO_SECRET_KEY`
- Verify user policy includes required actions
- User must not be root account

### "Invalid file type"

- Allowed types: JPEG, PNG, WebP
- File size must be under 10 MB
- Check browser console for exact error

### Images Not Showing on Frontend

- Verify `MINIO_PUBLIC_URL` is correct
- Check Next.js image config includes MinIO hostname
- Test direct access to image URL in browser
- Check browser network tab for 403/404 errors

## Security Recommendations

✓ **Do Use**
- Dedicated application user (not root)
- Restricted bucket policies
- HTTPS with `MINIO_USE_SSL=true` in production
- Environment variables for all credentials
- Server-only MinIO client (`lib/minio.ts` uses `'server-only'`)

✗ **Never Do**
- Expose credentials in client components
- Use root account credentials
- Enable ListBucket for public access
- Use `NEXT_PUBLIC_*` prefix for MinIO secrets
- Store presigned URLs in database (they expire)

## Files Modified

### New Files
- `lib/minio.ts` - MinIO client and helpers
- `app/api/admin/uploads/route.ts` - Upload API

### Modified Files
- `lib/db/schema.ts` - Added `image_key` column
- `app/actions/portfolio.ts` - Support for `imageKey`, delete MinIO objects
- `next.config.mjs` - Added MinIO hostname patterns
- `components/admin/portfolio-manager.tsx` - File upload UI, preview

### Removed Files (Google Cloud)
- None (no GCS was actively used)

## API Reference

### POST `/api/admin/uploads`

Upload portfolio image to MinIO.

**Request:**
```
Content-Type: multipart/form-data
file: File (JPEG, PNG, WebP, max 10MB)
```

**Response:**
```json
{
  "success": true,
  "objectKey": "portfolio/550e8400-e29b-41d4-a716-446655440000.jpg",
  "imageUrl": "https://minio.example.com/portfolio/550e8400-e29b-41d4-a716-446655440000.jpg"
}
```

**Errors:**
```json
{
  "success": false,
  "error": "Invalid file type. Allowed: JPEG, PNG, WebP. Got: image/gif"
}
```

## Next Steps

1. ✅ MinIO infrastructure created
2. ✅ Environment variables configured
3. ✅ Upload API implemented
4. ✅ Admin dashboard updated
5. Test in development environment
6. Deploy to Vercel production
7. Monitor MinIO bucket growth
8. Configure backup/retention policies

---

**Documentation**: See this file for setup, troubleshooting, and testing.
**Code**: Check `lib/minio.ts` for implementation details.
**Status**: Ready for testing with valid MinIO credentials.
