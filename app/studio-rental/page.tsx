import { Footer } from "@/components/footer"
import { PageHeroBanner } from "@/components/page-hero-banner"
import { Breadcrumb } from "@/components/breadcrumb"
import { StudioRentalContent } from "@/components/studio-rental-content"

export const metadata = {
  title: "Thuê Studio Livestream | NextGen Media",
  description: "Studio livestream được trang bị đầy đủ thiết bị hiện đại, sẵn sàng cho các phiên live chuyên nghiệp",
}

export default function StudioRentalPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <Breadcrumb items={[
          { label: "Trang chủ", href: "/" },
          { label: "Thuê Studio Livestream" }
        ]} />
      </div>
      <PageHeroBanner 
        subtitle="Studio Livestream"
        title="Studio Chuyên Nghiệp Cho Livestream"
        description="Được trang bị đầy đủ thiết bị hiện đại, ánh sáng chuyên nghiệp, và hệ thống âm thanh tối ưu"
      />
      <StudioRentalContent />
      <Footer />
    </main>
  )
}
