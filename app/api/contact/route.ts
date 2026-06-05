import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { fullName, phone, email, message } = await request.json()

    // Validate all fields
    if (!fullName || !phone || !email || !message) {
      return NextResponse.json(
        { error: "Tất cả các trường là bắt buộc" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email không hợp lệ" },
        { status: 400 }
      )
    }

    // Validate phone format
    const phoneRegex = /^[0-9]{10,11}$/
    if (!phoneRegex.test(phone.replace(/[\s\-]/g, ""))) {
      return NextResponse.json(
        { error: "Số điện thoại không hợp lệ" },
        { status: 400 }
      )
    }

    // Send email via Resend
    const result = await resend.emails.send({
      from: "NextGen Media <onboarding@resend.dev>",
      to: "trang.2663@gmail.com",
      subject: "[NextGen Media] Khách hàng mới từ website",
      html: `
        <h2>Khách hàng mới liên hệ</h2>
        <p><strong>Tên khách hàng:</strong> ${fullName}</p>
        <p><strong>Số điện thoại:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Nội dung:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    })

    if (result.error) {
      console.error("Resend error:", result.error)
      return NextResponse.json(
        { error: "Lỗi khi gửi email" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: "Email đã được gửi thành công" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json(
      { error: "Lỗi máy chủ nội bộ" },
      { status: 500 }
    )
  }
}
