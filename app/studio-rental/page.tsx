"use client"

import { Footer } from "@/components/footer"
import { PageHeroBanner } from "@/components/page-hero-banner"
import { Breadcrumb } from "@/components/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Building2 } from "lucide-react"

export const metadata = {
  title: "Thuê Studio Livestream | NextGen Media",
  description: "Studio livestream được trang bị đầy đủ thiết bị hiện đại, sẵn sàng cho các phiên live chuyên nghiệp",
}

export default function StudioRentalPage() {
  return (
    <main>
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
      
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trang Bị Studio
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Các thiết bị chuyên nghiệp được chọn lọc kỹ càng
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              { title: "Hệ Thống Camera", items: ["4K Camera", "PTZ Camera", "Gimbal Stabilizer"] },
              { title: "Ánh Sáng", items: ["LED Ring Light", "Studio Lights", "Backlight"] },
              { title: "Âm Thanh", items: ["Microphone chuyên nghiệp", "Mixer Audio", "Monitor Audio"] },
              { title: "Thiết Bị Hỗ Trợ", items: ["Green Screen", "Multiple Monitors", "Streaming PC"] },
            ].map((category, idx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-card-foreground">{category.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {category.items.map((item) => (
                        <li key={item} className="text-muted-foreground flex items-center gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
