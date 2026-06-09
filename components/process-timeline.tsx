"use client"

import { motion } from "framer-motion"

const steps = [
  { title: "Tư Vấn", number: 1 },
  { title: "Khảo Sát", number: 2 },
  { title: "Lên Kịch Bản", number: 3 },
  { title: "Setup Thiết Bị", number: 4 },
  { title: "Vận Hành Livestream", number: 5 },
  { title: "Báo Cáo Kết Quả", number: 6 },
]

export function ProcessTimeline() {
  return (
    <section className="py-24 bg-[#0a0f1e]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            6 Bước Triển Khai
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-4" />
          <p className="text-slate-300 max-w-2xl mx-auto">
            Quy trình chuyên nghiệp, minh bạch và hiệu quả từ đầu đến cuối.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative p-6 rounded-xl bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-500/20 group-hover:border-blue-500/50 transition-all duration-300">
                {/* Step Number */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600/80 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">{step.number}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                </div>
                
                {/* Accent Line */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-transparent rounded-b-xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
