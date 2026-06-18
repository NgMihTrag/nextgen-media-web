import 'server-only'
import * as Minio from 'minio'

// Initialize MinIO client
const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || '',
  port: Number(process.env.MINIO_PORT || 443),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || '',
  secretKey: process.env.MINIO_SECRET_KEY || '',
})

export const MINIO_BUCKET = process.env.MINIO_BUCKET || 'portfolio'
export const MINIO_PUBLIC_URL = process.env.MINIO_PUBLIC_URL || ''

// Validate environment variables
export function validateMinIOConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!process.env.MINIO_ENDPOINT) {
    errors.push('Missing MINIO_ENDPOINT')
  }
  if (!process.env.MINIO_ACCESS_KEY) {
    errors.push('Missing MINIO_ACCESS_KEY')
  }
  if (!process.env.MINIO_SECRET_KEY) {
    errors.push('Missing MINIO_SECRET_KEY')
  }
  if (!process.env.MINIO_BUCKET) {
    errors.push('Missing MINIO_BUCKET')
  }
  if (!process.env.MINIO_PUBLIC_URL) {
    errors.push('Missing MINIO_PUBLIC_URL')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

// Ensure bucket exists
export async function ensureBucketExists(): Promise<void> {
  try {
    const exists = await minioClient.bucketExists(MINIO_BUCKET)
    if (!exists) {
      await minioClient.makeBucket(MINIO_BUCKET, 'us-east-1')
      console.log(`[MinIO] Created bucket: ${MINIO_BUCKET}`)
    }
  } catch (error) {
    console.error('[MinIO] Bucket initialization failed:', error)
    throw new Error(`Failed to initialize MinIO bucket: ${error instanceof Error ? error.message : String(error)}`)
  }
}

// Build stable public URL
export function getPublicImageUrl(objectKey: string): string {
  const baseUrl = MINIO_PUBLIC_URL.endsWith('/') ? MINIO_PUBLIC_URL.slice(0, -1) : MINIO_PUBLIC_URL
  return `${baseUrl}/${MINIO_BUCKET}/${objectKey}`
}

// Sanitize and validate image files
export function sanitizeAndValidateImage(file: File): { valid: boolean; error?: string } {
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
  const MAX_SIZE = 10 * 1024 * 1024 // 10 MB

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: `Invalid file type. Allowed: JPEG, PNG, WebP. Got: ${file.type}` }
  }

  if (file.size === 0) {
    return { valid: false, error: 'File is empty' }
  }

  if (file.size > MAX_SIZE) {
    return { valid: false, error: `File too large. Max: 10 MB. Got: ${(file.size / 1024 / 1024).toFixed(2)} MB` }
  }

  return { valid: true }
}

// Get file extension
export function getFileExtension(mimeType: string): string {
  const mimeToExt: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
  }
  return mimeToExt[mimeType] || 'jpg'
}

// Upload image to MinIO
export async function uploadPortfolioImage(
  buffer: Buffer,
  mimeType: string
): Promise<{ objectKey: string; imageUrl: string }> {
  const { v4: uuidv4 } = require('crypto')
  const crypto = require('crypto')

  // Use crypto.randomUUID as fallback
  const uuid = crypto.randomUUID()
  const extension = getFileExtension(mimeType)
  const objectKey = `portfolio/${uuid}.${extension}`

  try {
    await minioClient.putObject(MINIO_BUCKET, objectKey, buffer, buffer.length, {
      'Content-Type': mimeType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    })

    const imageUrl = getPublicImageUrl(objectKey)
    console.log('[MinIO] Upload successful:', { objectKey, imageUrl })

    return { objectKey, imageUrl }
  } catch (error) {
    console.error('[MinIO] Upload failed:', error)
    throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : String(error)}`)
  }
}

// Delete image from MinIO
export async function deletePortfolioImage(objectKey: string): Promise<void> {
  try {
    await minioClient.removeObject(MINIO_BUCKET, objectKey)
    console.log('[MinIO] Delete successful:', objectKey)
  } catch (error) {
    console.error('[MinIO] Delete failed for', objectKey, error)
    // Log but don't throw - allow deletion to proceed even if file doesn't exist
    if (error instanceof Error && !error.message.includes('The specified key does not exist')) {
      throw new Error(`Failed to delete image: ${error.message}`)
    }
  }
}

export default minioClient
