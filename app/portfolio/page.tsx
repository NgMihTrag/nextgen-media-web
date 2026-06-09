import { Footer } from "@/components/footer"
import { PageHeroBanner } from "@/components/page-hero-banner"
import { Breadcrumb } from "@/components/breadcrumb"
import { PortfolioGallery } from "@/components/portfolio-gallery"
import { getAllPublicPortfolioProjects } from "@/app/actions/portfolio"

export const metadata = {
  title: "Portfolio | NextGen Media",
  description: "Xem toàn bộ dự án livestream và truyền thông đã được NextGen Media triển khai",
}

// Dynamic route to avoid build-time issues with database
export const dynamic = 'force-dynamic'

export default async function PortfolioPage() {
  let projects = []
  
  try {
    projects = await getAllPublicPortfolioProjects()
  } catch (error) {
    console.error('Failed to fetch portfolio projects:', error)
    // Return empty array if database fails - projects list will show "no projects" message
  }

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
      <PortfolioGallery projects={projects as any} />
      <Footer />
    </main>
  )
}
