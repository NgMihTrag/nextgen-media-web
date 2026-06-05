import { Footer } from "@/components/footer"
import { PageHeroBanner } from "@/components/page-hero-banner"
import { Breadcrumb } from "@/components/breadcrumb"
import { ContactContent } from "@/components/contact-content"

export const metadata = {
  title: "Liên Hệ | NextGen Media",
  description: "Liên hệ với NextGen Media để tư vấn về giải pháp livestream",
}

export default function ContactPage() {
  return (
    <main>
      <div className="container mx-auto px-4 lg:px-8">
        <Breadcrumb items={[
          { label: "Trang chủ", href: "/" },
          { label: "Liên hệ" }
        ]} />
      </div>
      <PageHeroBanner 
        subtitle="Liên Hệ"
        title="Liên Hệ Với Chúng Tôi"
        description="Chúng tôi sẵn sàng tư vấn và hỗ trợ bạn 24/7"
      />
      <ContactContent />
      <Footer />
    </main>
  )
}
