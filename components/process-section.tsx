"use client"

import { motion } from "framer-motion"
import { MessageSquare, FileText, Rocket, TrendingUp } from "lucide-react"

const steps = [
  {
    icon: MessageSquare,
    title: "Tư Vấn",
    description: "Lắng nghe nhu cầu và đề xuất giải pháp phù hợp nhất cho bạn.",
  },
  {
    icon: FileText,
    title: "Lên Kế Hoạch",
    description: "Xây dựng kế hoạch chi tiết về thiết bị, nội dung và chiến lược.",
  },
  {
    icon: Rocket,
    title: "Triển Khai",
    description: "Setup và vận hành livestream chuyên nghiệp theo kế hoạch đã đề ra.",
  },
  {
    icon: TrendingUp,
    title: "Tối Ưu Hiệu Quả",
    description: "Theo dõi, đánh giá và tối ưu để đạt hiệu quả cao nhất.",
  },
]

export function ProcessSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Quy trình làm việc
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quy trình chuyên nghiệp, minh bạch và hiệu quả.
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Step Number */}
                  <div className="relative z-10 mb-4">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                      <step.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-background border-2 border-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{index + 1}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
