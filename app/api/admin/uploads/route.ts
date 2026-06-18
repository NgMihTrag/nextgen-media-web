import { NextRequest, NextResponse } from 'next/server'
import { ensureBucketExists, sanitizeAndValidateImage, uploadPortfolioImage, validateMinIOConfig } from '@/lib/minio'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    // Validate MinIO configuration
    const { valid: configValid, errors: configErrors } = validateMinIOConfig()
    if (!configValid) {
      console.error('[Upload API] MinIO configuration invalid:', configErrors)
      return NextResponse.json(
        { success: false, error: 'Server configuration error', details: configErrors },
        { status: 500 }
      )
    }

    // TODO: Re-enable admin authentication check
    // const session = await auth.api.getSession({ headers: request.headers })
    // if (!session?.user || session.user.email !== 'nextgenmedia868@gmail.com') {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    // }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 })
    }

    // Validate file
    const validation = sanitizeAndValidateImage(file)
    if (!validation.valid) {
      console.log('[Upload API] File validation failed:', validation.error)
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 })
    }

    // Ensure bucket exists
    await ensureBucketExists()

    // Upload to MinIO
    const buffer = Buffer.from(await file.arrayBuffer())
    const { objectKey, imageUrl } = await uploadPortfolioImage(buffer, file.type)

    return NextResponse.json({
      success: true,
      objectKey,
      imageUrl,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('[Upload API] Error:', errorMessage, error)
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}
