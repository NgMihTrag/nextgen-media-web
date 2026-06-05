import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ClientLogos } from "@/components/client-logos"
import { ServicesSection } from "@/components/services-section"
import { WhyChooseUs } from "@/components/why-choose-us"
import { PortfolioSection } from "@/components/portfolio-section"
import { ProcessSection } from "@/components/process-section"
import { PricingSection } from "@/components/pricing-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "NextGen Media - Giải Pháp Livestream Chuyên Nghiệp",
  description: "Chúng tôi cung cấp giải pháp livestream trọn gói từ A-Z, setup studio chuyên nghiệp, vận hành livestream, quản lý tài khoản TikTok Shop.",
}

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ClientLogos />
      <ServicesSection />
      <WhyChooseUs />
      <PortfolioSection />
      <ProcessSection />
      <PricingSection />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}
