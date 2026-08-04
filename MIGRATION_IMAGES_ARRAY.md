# Portfolio Multi-Image Migration Guide

## Overview
This migration upgrades the Portfolio system from single-image to multi-image gallery support (max 5 images per project). All existing data is preserved with automatic migration.

---

## Database Changes

### Schema Update
**File**: `lib/db/schema.ts`

**Changes**:
- Added new column: `images: text[]` (array of image URLs, max 5)
- Kept legacy columns: `imageUrl`, `imageAlt` (for backward compatibility)
- No columns removed - full backward compatibility maintained

```sql
-- New column added to portfolio_projects table
ALTER TABLE portfolio_projects ADD COLUMN images text[] DEFAULT '{}';
```

**Migration Strategy**:
- Old projects with `imageUrl` are automatically migrated to `images` array on first update
- Existing data preserved indefinitely
- Queries support both old and new field formats

---

## API Changes

### Create Portfolio Project
**File**: `app/actions/portfolio.ts`

**New Parameters**:
```typescript
{
  images?: string[];      // Array of image URLs (max 5)
  imageUrl?: string;      // (Legacy) Single image - auto-converted to images array
  // ... other fields unchanged
}
```

**Validation**:
- ✅ Minimum 1 image required
- ✅ Maximum 5 images per project
- ✅ Rejects uploads with 6+ images with message: "You can upload a maximum of 5 images"
- ✅ Uses `images` array if provided, fallback to `imageUrl`

### Update Portfolio Project
**File**: `app/actions/portfolio.ts`

**Changes**:
- Accepts `images` array parameter
- Validates max 5 images
- Syncs `images` array with `imageUrl` for consistency
- Maintains all existing update logic

### Validation Rules
```typescript
if (images.length === 0 && !imageUrl) {
  throw new Error('Please upload at least one image')
}
if (images.length > 5) {
  throw new Error('You can upload a maximum of 5 images')
}
```

---

## Admin Panel Enhancements

### File: `components/admin/portfolio-manager.tsx`

**New Features**:

#### 1. Gallery Upload Section
- Multi-file upload input (accepts 1-5 images)
- Progress tracking (shows N/5 counter)
- Disabled when max images reached
- File types: JPEG, PNG, WebP

#### 2. Gallery Preview Grid
- Displays thumbnail grid of all uploaded images
- Shows order numbers (1, 2, 3, 4, 5)
- Max 4 images per row on desktop, responsive
- Draggable thumbnails for reordering

#### 3. Drag-to-Reorder
- Click and drag thumbnails to change order
- Visual feedback: highlighted border during drag
- First image in order becomes cover image
- Order is preserved on save

#### 4. Image Management
- Hover to reveal "Remove" button on each image
- Single click to delete image from gallery
- Real-time gallery state update
- No accidental deletion (no confirmation needed on admin)

#### 5. Upload Counter
- Shows "Gallery Images (X/5)"
- Updates as images are added/removed
- Upload button disabled when 5 images reached
- Clear visual feedback

#### 6. Validation Feedback
- Error message: "You can upload a maximum of 5 images"
- Error displays in existing error section
- Prevents form submission without images
- Validates both single and gallery images

### New Handler Functions
```typescript
handleGalleryFileSelect()    // Multi-file upload handler
removeGalleryImage()         // Delete single image
reorderGallery()             // Drag-to-reorder handler
```

### Form State Updates
```typescript
draggedIndex: number | null  // Tracks drag source
galleryImages: string[]      // Image URLs array
```

---

## Frontend Display

### Portfolio Card (Gallery View)
**File**: `components/portfolio-gallery.tsx` (no changes required)

**Automatic Updates**:
- First image in `images` array used as cover
- No code changes needed - automatically uses new field
- `images[0]` replaces `imageUrl` when available

### Portfolio Detail Modal
**File**: `components/premium-project-showcase.tsx` (already supports arrays)

**Gallery Support**:
- Loads all images from `images` array
- Displays gallery with thumbnails and navigation
- Supports up to 5 images perfectly
- No code changes needed - already designed for arrays

### Image Lazy Loading
**Performance Optimization**:
- Current image always loaded (LCP - Largest Contentful Paint)
- Previous image: preloaded in background
- Next image: preloaded on demand
- Uses `next/image` for automatic optimization
- Images 4-5: lazy loaded only when user navigates to them

---

## Data Migration

### Automatic Migration Process

**Trigger**: First update/save after schema change

**Process**:
```typescript
// Old project with single image
{ imageUrl: "https://...", images: [] }

// After first update
{ imageUrl: "https://...", images: ["https://..."] }
```

**No Manual Migration Needed**:
- Existing projects continue to work
- `imageUrl` remains unchanged
- `images` auto-populated on first project update
- No data loss
- No downtime required

### Migration Example
```
Before:
  imageUrl: "https://minio.com/project1.jpg"
  images: []

After any project update:
  imageUrl: "https://minio.com/project1.jpg"  (preserved)
  images: ["https://minio.com/project1.jpg"]   (auto-migrated)
```

---

## API Endpoint Updates

### POST /api/admin/uploads
**File**: `app/api/admin/uploads/route.ts`

**Changes**: None required (accepts single files, called multiple times for gallery)

**Multi-Upload Pattern**:
```javascript
// Upload multiple files sequentially
for (const file of files) {
  const response = await fetch('/api/admin/uploads', {
    method: 'POST',
    body: formData  // Single file per request
  })
  urls.push(response.imageUrl)
}
```

---

## Validation & Error Handling

### Gallery Upload Validation
```
✅ File type: JPEG, PNG, WebP
✅ Max file size: 10MB (existing)
✅ Max images: 5 per project
✅ Min images: 1 (required)
❌ Rejects 6+ images with error message
❌ Prevents save without images
```

### Error Messages
1. "You can upload a maximum of 5 images" - User tried to upload 6+ images
2. "Please upload at least one image" - Form save without any image
3. Existing upload errors (size, type, etc.) - Unchanged

---

## Performance Considerations

### Database
- New `images` column uses PostgreSQL text array type
- Indexed queries unchanged
- No performance degradation
- Legacy `imageUrl` queries continue to work

### Frontend Gallery
- Pagination in modal (shows thumbnails up to 5)
- Lazy loading for images 4-5
- Preload for current/previous/next images
- Small bundle impact (no new dependencies)

### Image Storage
- Each image stored separately in MinIO
- No storage overhead increase
- Existing bucket structure reused
- No migration of existing files needed

---

## Testing Checklist

### Admin Panel
- [ ] Upload 1 image - saves correctly
- [ ] Upload 2 images - both appear in grid
- [ ] Upload 5 images - upload button disabled
- [ ] Try upload 6 images - error message shown
- [ ] Drag image 5 to position 1 - order updated
- [ ] Delete image 3 - image removed, counter updates
- [ ] Save project with gallery - creates with all images
- [ ] Edit project - gallery images preserved and editable
- [ ] Delete 1 image in edit - updates correctly

### Frontend Display
- [ ] Portfolio card shows first image as cover
- [ ] Portfolio detail modal loads all gallery images
- [ ] Image gallery navigation works (prev/next)
- [ ] Thumbnail pagination shows correct count
- [ ] Images lazy load as you navigate

### Backward Compatibility
- [ ] Old projects with single image still work
- [ ] Old portfolio cards display correctly
- [ ] Old projects are editable (auto-migrate on save)
- [ ] No existing data lost

---

## Rollback Plan

If needed to revert:

1. Keep `images` column in database (optional)
2. Remove gallery upload UI from admin
3. Revert to single `imageUrl` field
4. No data loss - `imageUrl` still exists

**No database migration needed for rollback** - legacy fields remain intact.

---

## Modified Files Summary

| File | Type | Changes |
|------|------|---------|
| `lib/db/schema.ts` | Database | Added `images: text[]` column |
| `app/actions/portfolio.ts` | API | Added `images` parameter, validation, migration logic |
| `components/admin/portfolio-manager.tsx` | Admin UI | Added gallery upload, reorder, preview, validation |
| `components/portfolio-gallery.tsx` | Frontend | No changes (auto-supports images array) |
| `components/premium-project-showcase.tsx` | Frontend | No changes (already supports arrays) |
| `app/api/admin/uploads/route.ts` | API | No changes required |

---

## Next Steps

1. Deploy with database migration: `ALTER TABLE portfolio_projects ADD COLUMN images text[] DEFAULT '{}';`
2. Deploy code changes
3. Admin panel will show new gallery upload immediately
4. Existing projects migrate automatically on first edit/save
5. New projects use gallery system by default

---

## Support

For issues with migration:
- Check database column exists: `\d portfolio_projects` (PostgreSQL)
- Verify `images` column is text array type
- Test with single image first, then multi-image
- Existing single-image projects continue working during transition
