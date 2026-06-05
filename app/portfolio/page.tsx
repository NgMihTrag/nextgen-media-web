import { Footer } from "@/components/footer"
import { PageHeroBanner } from "@/components/page-hero-banner"
import { Breadcrumb } from "@/components/breadcrumb"
import { PortfolioGallery } from "@/components/portfolio-gallery"

export const metadata = {
  title: "Portfolio | NextGen Media",
  description: "Xem toàn bộ dự án livestream và truyền thông đã được NextGen Media triển khai",
}

export default function PortfolioPage() {
  return (
    <main>
      <div className="container mx-auto px-4 lg:px-8">
        <Breadcrumb items={[
          { label: "Trang chủ", href: "/" },
          { label: "Portfolio" }
        ]} />
      </div>
      <PageHeroBanner 
        subtitle="Portfolio"
        title="Tất Cả Dự Án"
        description="Những dự án livestream và truyền thông đã được NextGen Media triển khai."
      />
      <PortfolioGallery />
      <Footer />
    </main>
  )
}
