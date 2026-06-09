import { HeroSection } from "@/components/hero-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { getPublicPortfolioProjects } from "@/app/actions/portfolio"

export const metadata = {
  title: "NextGen Media - Giải Pháp Livestream Chuyên Nghiệp",
  description: "Chúng tôi cung cấp giải pháp livestream trọn gói từ A-Z, setup studio chuyên nghiệp, vận hành livestream, quản lý tài khoản TikTok Shop.",
}

export default async function Home() {
  const featuredProjects = await getPublicPortfolioProjects()

  return (
    <main>
      <HeroSection />
      <PortfolioSection projects={featuredProjects} />
      <CTASection />
      <Footer />
    </main>
  )
}
