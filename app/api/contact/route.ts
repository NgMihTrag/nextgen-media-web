import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"

// Check if RESEND_API_KEY exists on startup
console.log("[v0] RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY)

// Initialize Resend with error checking
let resend: Resend | null = null
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY)
  console.log("[v0] Resend client initialized successfully")
} else {
  console.error("[v0] RESEND_API_KEY is not configured")
}

export async function POST(request: NextRequest) {
  try {
    // Check if Resend is configured
    if (!resend) {
      console.error("[v0] Resend client is not initialized - API key missing")
      return NextResponse.json(
        { 
          error: "Service not configured",
          details: "RESEND_API_KEY environment variable is missing"
        },
        { status: 500 }
      )
    }

    const { fullName, phone, email, message } = await request.json()
    console.log("[v0] Received contact form submission:", { fullName, email, phone })

    // Validate all fields
    if (!fullName || !phone || !email || !message) {
      console.warn("[v0] Missing required fields in contact form")
      return NextResponse.json(
        { error: "Tất cả các trường là bắt buộc" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.warn("[v0] Invalid email format:", email)
      return NextResponse.json(
        { error: "Email không hợp lệ" },
        { status: 400 }
      )
    }

    // Validate phone format
    const phoneRegex = /^[0-9]{10,11}$/
    if (!phoneRegex.test(phone.replace(/[\s\-]/g, ""))) {
      console.warn("[v0] Invalid phone format:", phone)
      return NextResponse.json(
        { error: "Số điện thoại không hợp lệ" },
        { status: 400 }
      )
    }

    // Make message field safe
    const safeMessage = message?.replace(/\n/g, "<br>") || ""

    // Send email via Resend with detailed error handling
    console.log("[v0] Sending email via Resend...")
    let result
    try {
      result = await resend.emails.send({
        from: "NextGen Media <onboarding@resend.dev>",
        to: "trang.2663@gmail.com",
        subject: "[NextGen Media] Khách hàng mới từ website",
        html: `
          <h2>Khách hàng mới liên hệ</h2>
          <p><strong>Tên khách hàng:</strong> ${fullName}</p>
          <p><strong>Số điện thoại:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Nội dung:</strong></p>
          <p>${safeMessage}</p>
        `,
      })
      console.log("[v0] Resend API response:", result)
    } catch (resendError) {
      console.error("[v0] Resend API call failed:", resendError)
      return NextResponse.json(
        {
          error: resendError instanceof Error ? resendError.message : "Resend API error",
          details: resendError instanceof Error ? resendError.toString() : String(resendError),
        },
        { status: 500 }
      )
    }

    // Check for Resend errors
    if (result.error) {
      console.error("[v0] Resend returned error:", result.error)
      return NextResponse.json(
        {
          error: result.error.message || "Unknown Resend error",
          details: result.error,
        },
        { status: 500 }
      )
    }

    console.log("[v0] Email sent successfully. Message ID:", result.id)
    return NextResponse.json(
      { success: true, message: "Email đã được gửi thành công", id: result.id },
      { status: 200 }
    )
  } catch (error) {
    console.error("[v0] Contact API error:", error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorStack = error instanceof Error ? error.stack : undefined
    
    return NextResponse.json(
      { 
        error: "Lỗi máy chủ nội bộ",
        details: errorMessage,
        stack: process.env.NODE_ENV === "development" ? errorStack : undefined
      },
      { status: 500 }
    )
  }
}
