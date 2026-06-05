"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-12 bg-[#0a0f1e] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-blue-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-blue-800/10 backdrop-blur-sm"
        >
          {/* Left Side - Icon and Text */}
          <div className="flex items-start gap-6 flex-1">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center flex-shrink-0 mt-1">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Sẵn sàng nâng tầm thương hiệu?
              </h3>
              <p className="text-slate-300 text-sm md:text-base">
                Liên hệ với NextGen Media để nhận tư vấn miễn phí cho dự án của bạn.
              </p>
            </div>
          </div>

          {/* Right Side - Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0"
          >
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 h-12 font-semibold rounded-lg transition-all duration-300 group whitespace-nowrap"
            >
              Tư vấn miễn phí
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
