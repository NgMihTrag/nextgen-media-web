import { Footer } from "@/components/footer"
import { PageHeroBanner } from "@/components/page-hero-banner"
import { Breadcrumb } from "@/components/breadcrumb"
import { AboutContent } from "@/components/about-content"

export const metadata = {
  title: "Về Chúng Tôi | NextGen Media",
  description: "Tìm hiểu về NextGen Media và câu chuyện của chúng tôi",
}

export default function AboutPage() {
  return (
    <main>
      <div className="container mx-auto px-4 lg:px-8">
        <Breadcrumb items={[
          { label: "Trang chủ", href: "/" },
          { label: "Về chúng tôi" }
        ]} />
      </div>
      <PageHeroBanner 
        subtitle="Về chúng tôi"
        title="NextGen Media"
        description="Đối tác tin cậy cho các chiến dịch livestream chuyên nghiệp"
      />
      <AboutContent />
      <Footer />
    </main>
  )
}
