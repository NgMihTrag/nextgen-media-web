import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { ServicesHero, ServicesCardsGrid, ServicesProcessOverview, ServicesEquipment, ServicesBenefits, ServicesCTA } from "@/components/services-comprehensive"
import { ServicesFeaturedProjectsServer } from "@/components/services-featured-projects-server"

export const metadata = {
  title: "Dịch Vụ | NextGen Media",
  description: "Khám phá các dịch vụ livestream chuyên nghiệp của NextGen Media - Setup, Thiết bị, Vận hành và Hỗ trợ TikTok Shop",
}

export default function ServicesPage() {
  return (
    <main className="relative overflow-hidden">
      {/* Premium Dark Background with Glow Effects */}
      <div className="fixed inset-0 -z-10">
        {/* Main background */}
        <div className="absolute inset-0 bg-[#020617]" />
        
        {/* Top-left soft blue radial glow */}
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-radial-gradient from-blue-500/5 via-transparent to-transparent rounded-full blur-3xl" />
        
        {/* Right side subtle cyan glow */}
        <div className="absolute -top-1/4 right-0 w-2/3 h-3/4 bg-cyan-500/3 rounded-full blur-3xl" />
        
        {/* Bottom soft indigo glow */}
        <div className="absolute -bottom-1/4 left-1/3 w-1/2 h-1/2 bg-indigo-500/3 rounded-full blur-3xl" />
        
        {/* Large blurred gradient shape - bottom left */}
        <div className="absolute bottom-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-blue-500/3 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Content with relative z-index */}
      <div className="relative z-10">
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
        <ServicesCTA />
        <Footer />
      </div>
    </main>
  )
}
