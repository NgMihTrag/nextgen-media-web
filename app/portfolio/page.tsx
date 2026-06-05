import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeroBanner } from "@/components/page-hero-banner"
import { Breadcrumb } from "@/components/breadcrumb"
import { PortfolioSection } from "@/components/portfolio-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { CTASection } from "@/components/cta-section"

export const metadata = {
  title: "Portfolio | NextGen Media",
  description: "Xem các dự án và case studies thành công của chúng tôi",
}

export default function PortfolioPage() {
  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 lg:px-8">
        <Breadcrumb items={[
          { label: "Trang chủ", href: "/" },
          { label: "Portfolio" }
        ]} />
      </div>
      <PageHeroBanner 
        subtitle="Portfolio"
        title="Các Dự Án Thành Công"
        description="Xem các case studies và kết quả thực tế từ các chiến dịch livestream của chúng tôi"
      />
      <PortfolioSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </main>
  )
}
