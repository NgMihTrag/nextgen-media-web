"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, Play } from "lucide-react"
import Image from "next/image"

const trustFeatures = [
  "Setup nhanh chóng",
  "Hỗ trợ 24/7",
  "Thiết bị hiện đại",
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0e1a]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aSUCnf5CYUevsn92WoBl4HvOR45W1j.png"
          alt="Professional TikTok livestream studio"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e1a]/95 via-[#0a0e1a]/80 to-[#0a0e1a]/40" />
        {/* Additional blue tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-transparent to-purple-950/30" />
      </div>

      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-[80px]" />

      <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-0 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-80px)]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full mb-8 backdrop-blur-sm"
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-blue-300 tracking-wide">
                GIẢI PHÁP LIVESTREAM CHUYÊN NGHIỆP
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400">
                NEXTGEN MEDIA
              </span>
              <br />
              <span className="text-white text-balance">NÂNG TẦM THƯƠNG HIỆU</span>
              <br />
              <span className="text-white text-balance">BỨT PHÁ DOANH SỐ</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg md:text-xl text-slate-300 mb-10 max-w-xl leading-relaxed"
            >
              Chúng tôi cung cấp giải pháp livestream trọn gói từ A-Z, setup studio chuyên nghiệp, 
              vận hành livestream, quản lý tài khoản TikTok Shop và phát triển thương hiệu online.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-8 h-14 text-base font-semibold shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/40 hover:scale-[1.02]"
              >
                Tư Vấn Miễn Phí
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-slate-500/50 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-slate-400/50 px-8 h-14 text-base font-semibold transition-all duration-300"
              >
                <Play className="w-4 h-4 mr-2 fill-current" />
                Xem Video Giới Thiệu
              </Button>
            </motion.div>

            {/* Trust Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-wrap gap-6"
            >
              {trustFeatures.map((feature, index) => (
                <motion.div 
                  key={feature} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border border-blue-400/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Check className="w-3.5 h-3.5 text-blue-300" />
                  </div>
                  <span className="text-sm md:text-base font-medium text-slate-200">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-slate-700/50"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">500+</div>
                <div className="text-sm text-slate-400 mt-1">Khách hàng</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">10K+</div>
                <div className="text-sm text-slate-400 mt-1">Giờ livestream</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">50B+</div>
                <div className="text-sm text-slate-400 mt-1">Doanh thu tạo ra</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Empty space for background image to show through */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0e1a] to-transparent" />
    </section>
  )
}
