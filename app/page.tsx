import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "NextGen Media - Giải Pháp Livestream Chuyên Nghiệp",
  description: "Chúng tôi cung cấp giải pháp livestream trọn gói từ A-Z, setup studio chuyên nghiệp, vận hành livestream, quản lý tài khoản TikTok Shop.",
}

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <PortfolioSection />
      <CTASection />
      <Footer />
    </main>
  )
}
