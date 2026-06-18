"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

const benefits = [
  "Đội Ngũ Chuyên Nghiệp",
  "Thiết Bị Hiện Đại",
  "Setup Tại Chỗ",
  "Hỗ Trợ 24/7",
  "Kinh Nghiệm TikTok Shop",
  "Phát Sóng Đa Nền Tảng",
]

export function ProcessBenefits() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Tại Sao Chọn NextGen Media
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Những lợi ích nổi bật khi hợp tác cùng chúng tôi
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-6 rounded-xl bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-500/20"
            >
              <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0" />
              <span className="text-lg font-medium text-white">{benefit}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
