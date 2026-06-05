import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeroBanner } from "@/components/page-hero-banner"
import { Breadcrumb } from "@/components/breadcrumb"
import { PricingSection } from "@/components/pricing-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"

export const metadata = {
  title: "Bảng Giá | NextGen Media",
  description: "Xem chi tiết bảng giá các gói dịch vụ livestream của NextGen Media",
}

export default function PricingPage() {
  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 lg:px-8">
        <Breadcrumb items={[
          { label: "Trang chủ", href: "/" },
          { label: "Bảng giá" }
        ]} />
      </div>
      <PageHeroBanner 
        subtitle="Bảng giá"
        title="Các Gói Dịch Vụ"
        description="Lựa chọn gói phù hợp với nhu cầu của bạn"
      />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}
