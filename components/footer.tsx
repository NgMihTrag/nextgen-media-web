import Link from "next/link"
import { Facebook, Instagram, Youtube } from "lucide-react"

const footerLinks = {
  services: [
    { label: "Setup Livestream", href: "#" },
    { label: "Thuê Studio", href: "#" },
    { label: "Cho Thuê Thiết Bị", href: "#" },
    { label: "TikTok Shop", href: "#" },
    { label: "Vận Hành Livestream", href: "#" },
  ],
  quickLinks: [
    { label: "Trang Chủ", href: "#" },
    { label: "Về Chúng Tôi", href: "#" },
    { label: "Bảng Giá", href: "#pricing" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "FAQ", href: "#faq" },
  ],
  contact: [
    { label: "0909 123 456", href: "tel:0909123456" },
    { label: "contact@nextgenmedia.vn", href: "mailto:contact@nextgenmedia.vn" },
    { label: "123 Nguyễn Văn Linh, Q.7, TP.HCM", href: "#" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { 
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ), 
    href: "#", 
    label: "TikTok" 
  },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Instagram, href: "#", label: "Instagram" },
]

export function Footer() {
  return (
    <footer className="bg-[#0f172a] border-t border-primary-foreground/10">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">N</span>
              </div>
              <span className="font-bold text-xl text-primary-foreground">NextGen Media</span>
            </Link>
            <p className="text-primary-foreground/70 mb-6 leading-relaxed">
              Giải pháp livestream chuyên nghiệp hàng đầu Việt Nam. 
              Nâng tầm thương hiệu, bứt phá doanh số.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-primary-foreground/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors text-primary-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-6">Dịch Vụ</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-primary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-6">Liên Kết</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-primary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-6">Liên Hệ</h4>
            <ul className="space-y-3">
              {footerLinks.contact.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-primary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/50 text-sm">
              © 2024 NextGen Media. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-primary-foreground/50 hover:text-primary text-sm transition-colors">
                Chính sách bảo mật
              </Link>
              <Link href="#" className="text-primary-foreground/50 hover:text-primary text-sm transition-colors">
                Điều khoản dịch vụ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
