import { Footer } from "@/components/footer"
import { PageHeroBanner } from "@/components/page-hero-banner"
import { Breadcrumb } from "@/components/breadcrumb"
import { FAQSection } from "@/components/faq-section"

export const metadata = {
  title: "Câu Hỏi Thường Gặp | NextGen Media",
  description: "Tìm hiểu các câu hỏi thường gặp về dịch vụ livestream của NextGen Media",
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <Breadcrumb items={[
          { label: "Trang chủ", href: "/" },
          { label: "Câu hỏi thường gặp" }
        ]} />
      </div>
      <PageHeroBanner 
        subtitle="FAQ"
        title="Câu Hỏi Thường Gặp"
        description="Tìm câu trả lời cho những câu hỏi phổ biến về dịch vụ của chúng tôi"
      />
      <FAQSection />
      <Footer />
    </main>
  )
}
