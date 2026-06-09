import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { PricingHero, PricingCards, ComparisonTable, PricingFAQ, PricingFinalCTA } from "@/components/pricing-comprehensive"

export const metadata = {
  title: "Bảng Giá | NextGen Media",
  description: "Xem chi tiết bảng giá các gói dịch vụ livestream của NextGen Media từ cơ bản đến doanh nghiệp",
}

export default function PricingPage() {
  return (
    <main>
      <div className="container mx-auto px-4 lg:px-8">
        <Breadcrumb items={[
          { label: "Trang chủ", href: "/" },
          { label: "Bảng giá" }
        ]} />
      </div>
      <PricingHero />
      <PricingCards />
      <ComparisonTable />
      <PricingFAQ />
      <PricingFinalCTA />
      <Footer />
    </main>
  )
}
