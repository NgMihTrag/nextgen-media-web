import { Footer } from "@/components/footer"
import { PageHeroBanner } from "@/components/page-hero-banner"
import { Breadcrumb } from "@/components/breadcrumb"
import { ContactForm } from "@/components/contact-form"
import { Toaster } from "sonner"

export const metadata = {
  title: "Liên Hệ | NextGen Media",
  description: "Liên hệ với NextGen Media để tư vấn về giải pháp livestream",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4 lg:px-8">
        <Breadcrumb items={[
          { label: "Trang chủ", href: "/" },
          { label: "Liên hệ" }
        ]} />
      </div>
      <PageHeroBanner 
        subtitle="Liên Hệ"
        title="Liên Hệ Với Chúng Tôi"
        description="Chúng tôi sẵn sàng đồng hành cùng doanh nghiệp trong các dự án livestream, truyền thông và phát triển thương hiệu."
      />
      <ContactForm />
      <Footer />
    </main>
  )
}
