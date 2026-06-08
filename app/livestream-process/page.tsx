import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { LivestreamProcessHero } from "@/components/livestream-process-hero"
import { ProcessTimeline } from "@/components/process-timeline"
import { DetailedProcess } from "@/components/detailed-process"
import { EquipmentShowcase } from "@/components/equipment-showcase"
import { ProcessBenefits } from "@/components/process-benefits"
import { CTASection } from "@/components/cta-section"

export const metadata = {
  title: "Quy Trình Setup Livestream | NextGen Media",
  description: "Tìm hiểu quy trình setup livestream chuyên nghiệp của NextGen Media từ tư vấn đến vận hành.",
}

export default function LivestreamProcessPage() {
  return (
    <main>
      <div className="container mx-auto px-4 lg:px-8">
        <Breadcrumb items={[
          { label: "Trang chủ", href: "/" },
          { label: "Quy Trình Livestream" }
        ]} />
      </div>
      <LivestreamProcessHero />
      <ProcessTimeline />
      <DetailedProcess />
      <EquipmentShowcase />
      <ProcessBenefits />
      <CTASection />
      <Footer />
    </main>
  )
}
