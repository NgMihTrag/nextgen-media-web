import { Footer } from "@/components/footer"
import { PageHeroBanner } from "@/components/page-hero-banner"
import { Breadcrumb } from "@/components/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Users, Target, Award } from "lucide-react"

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
      
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Users,
                title: "Đội Ngũ Chuyên Nghiệp",
                description: "Đội ngũ có kinh nghiệm hơn 5 năm trong lĩnh vực livestream và bán hàng online"
              },
              {
                icon: Target,
                title: "Chuyên Về Kết Quả",
                description: "Tập trung vào việc tăng doanh số, tương tác và phát triển thương hiệu của bạn"
              },
              {
                icon: Award,
                title: "Đạt Nhiều Giải Thưởng",
                description: "Được công nhận bởi các thương hiệu hàng đầu và khách hàng trên cả nước"
              }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-card text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-lg p-12 text-center"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Tầm Nhìn Của Chúng Tôi</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Trở thành đối tác số một cho các doanh nghiệp muốn phát triển bán hàng online thông qua livestream. 
              Chúng tôi cam kết mang đến giải pháp toàn diện, chuyên nghiệp và hiệu quả nhất trên thị trường.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
