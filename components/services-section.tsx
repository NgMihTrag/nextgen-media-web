"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Video, 
  Building2, 
  Camera, 
  ShoppingBag, 
  Settings, 
  Code,
  ArrowRight
} from "lucide-react"

const services = [
  {
    icon: Video,
    title: "Setup Livestream Trọn Gói",
    description: "Giải pháp setup livestream hoàn chỉnh từ thiết bị, ánh sáng đến phần mềm chuyên nghiệp.",
  },
  {
    icon: Building2,
    title: "Thuê Studio Livestream",
    description: "Studio được trang bị đầy đủ thiết bị hiện đại, sẵn sàng cho các phiên live chuyên nghiệp.",
  },
  {
    icon: Camera,
    title: "Cho Thuê Thiết Bị Livestream",
    description: "Đa dạng thiết bị từ camera, đèn, micro đến các phụ kiện livestream chất lượng cao.",
  },
  {
    icon: ShoppingBag,
    title: "Hỗ Trợ TikTok Shop",
    description: "Tư vấn và hỗ trợ mở shop, tối ưu sản phẩm, tăng tương tác và doanh số trên TikTok.",
  },
  {
    icon: Settings,
    title: "Vận Hành Livestream",
    description: "Đội ngũ vận hành chuyên nghiệp hỗ trợ toàn bộ quy trình livestream của bạn.",
  },
  {
    icon: Code,
    title: "Phần Mềm & Plugin",
    description: "Cung cấp các phần mềm, plugin hỗ trợ livestream và bán hàng hiệu quả.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Giải pháp toàn diện cho livestream
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dịch vụ chuyên nghiệp dành cho cá nhân, doanh nghiệp và nhà bán hàng.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group h-full bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
                  <Button 
                    variant="ghost" 
                    className="p-0 h-auto text-primary hover:text-[#1d4ed8] hover:bg-transparent group/btn"
                  >
                    Tìm hiểu thêm 
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
