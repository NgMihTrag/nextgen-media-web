import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { ServicesHero, ServicesCardsGrid, ServicesProcessOverview, ServicesEquipment, ServicesBenefits, ServicesCTA } from "@/components/services-comprehensive"
import { ServicesFeaturedProjectsServer } from "@/components/services-featured-projects-server"
import { CTASection } from "@/components/cta-section"

export const metadata = {
  title: "Dịch Vụ | NextGen Media",
  description: "Khám phá các dịch vụ livestream chuyên nghiệp của NextGen Media - Setup, Thiết bị, Vận hành và Hỗ trợ TikTok Shop",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <Breadcrumb items={[
          { label: "Trang chủ", href: "/" },
          { label: "Dịch vụ" }
        ]} />
      </div>
      <ServicesHero />
      <ServicesCardsGrid />
      <ServicesProcessOverview />
      <ServicesEquipment />
      <ServicesFeaturedProjectsServer />
      <ServicesBenefits />
      {/* <ServicesCTA /> */}
      <CTASection />
      <Footer />
    </main>
  )
}
