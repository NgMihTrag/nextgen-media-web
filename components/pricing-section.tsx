"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Cơ Bản",
    price: "9.990.000",
    description: "Phù hợp cho cá nhân và người mới bắt đầu",
    features: [
      "Setup livestream cơ bản",
      "Thiết bị tiêu chuẩn",
      "Hỗ trợ kỹ thuật 8h/ngày",
      "1 buổi training",
      "Tư vấn TikTok Shop",
    ],
    highlighted: false,
  },
  {
    name: "Chuyên Nghiệp",
    price: "19.990.000",
    description: "Giải pháp toàn diện cho nhà bán hàng",
    features: [
      "Setup livestream chuyên nghiệp",
      "Thiết bị cao cấp",
      "Hỗ trợ kỹ thuật 24/7",
      "3 buổi training",
      "Quản lý TikTok Shop",
      "Vận hành livestream",
      "Báo cáo analytics",
    ],
    highlighted: true,
  },
  {
    name: "Doanh Nghiệp",
    price: "29.990.000",
    description: "Giải pháp enterprise cho doanh nghiệp lớn",
    features: [
      "Setup studio đầy đủ",
      "Thiết bị premium",
      "Hỗ trợ kỹ thuật 24/7",
      "Training không giới hạn",
      "Quản lý TikTok Shop",
      "Vận hành livestream",
      "Báo cáo analytics",
      "Account manager riêng",
      "Ưu tiên hỗ trợ",
    ],
    highlighted: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Gói dịch vụ phù hợp với bạn
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Lựa chọn gói dịch vụ phù hợp với nhu cầu và ngân sách của bạn.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={plan.highlighted ? "md:-mt-4 md:mb-4" : ""}
            >
              <Card 
                className={`h-full relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  plan.highlighted 
                    ? "border-primary bg-card shadow-lg shadow-primary/10" 
                    : "bg-card hover:border-primary/50"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
                )}
                
                <CardHeader className="pb-4">
                  {plan.highlighted && (
                    <div className="inline-flex self-start px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-2">
                      Phổ biến nhất
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-card-foreground">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                  <div className="pt-4">
                    <span className="text-4xl font-bold text-card-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">đ</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      plan.highlighted 
                        ? "bg-primary hover:bg-[#1d4ed8] text-primary-foreground" 
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    Chọn gói này
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
