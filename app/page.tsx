import { HeroSection } from "@/components/hero-section"
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section"
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
    <main className="min-h-screen bg-[#020617] text-white">
      <HeroSection />
      <FeaturedProjectsSection projects={featuredProjects} />
      <CTASection />
      <Footer />
    </main>
  )
}
