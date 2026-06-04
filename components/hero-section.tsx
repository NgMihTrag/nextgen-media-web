"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const trustFeatures = [
  "Setup nhanh chóng",
  "Hỗ trợ 24/7",
  "Thiết bị hiện đại",
]

export function HeroSection() {
  return (
    <section className="relative min-h-[850px] flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 pt-20 lg:pt-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
            >
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">
                GIẢI PHÁP LIVESTREAM CHUYÊN NGHIỆP
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground"
            >
              <span className="text-primary">NEXTGEN MEDIA</span>
              <br />
              <span className="text-balance">NÂNG TẦM THƯƠNG HIỆU</span>
              <br />
              <span className="text-balance">BỨT PHÁ DOANH SỐ</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed"
            >
              Chúng tôi cung cấp giải pháp livestream trọn gói từ A-Z, setup studio chuyên nghiệp, 
              vận hành livestream, quản lý tài khoản TikTok Shop và phát triển thương hiệu online.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Button 
                size="lg" 
                className="bg-primary hover:bg-[#1d4ed8] text-primary-foreground px-8 h-12 text-base"
              >
                Tư Vấn Miễn Phí
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-border text-foreground hover:bg-muted px-8 h-12 text-base"
              >
                Xem Bảng Giá
              </Button>
            </motion.div>

            {/* Trust Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-6"
            >
              {trustFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{feature}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Studio Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-2xl" />
              
              {/* Main Image Container */}
              <div className="relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                {/* Studio Illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full p-8">
                    {/* Camera Setup */}
                    <div className="absolute top-8 left-8 w-16 h-20 bg-foreground/10 rounded-lg flex flex-col items-center justify-center">
                      <div className="w-8 h-8 bg-foreground/20 rounded-full mb-2" />
                      <div className="w-10 h-2 bg-foreground/20 rounded" />
                    </div>
                    
                    {/* Ring Light */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48">
                      <div className="w-full h-full rounded-full border-8 border-primary/30 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full border-4 border-primary/50 flex items-center justify-center">
                          <div className="w-20 h-20 bg-primary/20 rounded-full animate-pulse" />
                        </div>
                      </div>
                    </div>
                    
                    {/* TikTok Logo */}
                    <div className="absolute top-8 right-8 w-12 h-12 bg-foreground/10 rounded-xl flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-primary-foreground/80">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    </div>
                    
                    {/* Monitor */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-40 h-24 bg-foreground/10 rounded-lg">
                      <div className="w-full h-full p-2">
                        <div className="w-full h-full bg-primary/20 rounded flex items-center justify-center">
                          <div className="w-8 h-8 border-2 border-primary/50 rounded-full flex items-center justify-center">
                            <div className="w-0 h-0 border-l-[8px] border-l-primary/50 border-y-[5px] border-y-transparent ml-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Lights */}
                    <div className="absolute bottom-8 right-8 w-8 h-16 bg-foreground/10 rounded-full" />
                    <div className="absolute bottom-8 left-8 w-8 h-16 bg-foreground/10 rounded-full" />
                  </div>
                </div>
                
                {/* Live Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
                  LIVE
                </div>
                
                {/* Viewer Count */}
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-foreground/20 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                  </svg>
                  12.5K
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
