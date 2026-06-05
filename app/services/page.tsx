import { Footer } from "@/components/footer"
import { PageHeroBanner } from "@/components/page-hero-banner"
import { Breadcrumb } from "@/components/breadcrumb"
import { ServicesSection } from "@/components/services-section"
import { CTASection } from "@/components/cta-section"

export const metadata = {
  title: "Dịch Vụ | NextGen Media",
  description: "Khám phá tất cả các dịch vụ livestream chuyên nghiệp của NextGen Media",
}

export default function ServicesPage() {
  return (
    <main>
      <div className="container mx-auto px-4 lg:px-8">
        <Breadcrumb items={[
          { label: "Trang chủ", href: "/" },
          { label: "Dịch vụ" }
        ]} />
      </div>
      <PageHeroBanner 
        subtitle="Dịch vụ"
        title="Giải Pháp Livestream Toàn Diện"
        description="Từ setup studio chuyên nghiệp đến vận hành livestream và hỗ trợ TikTok Shop"
      />
      <ServicesSection />
      <CTASection />
      <Footer />
    </main>
  )
}
