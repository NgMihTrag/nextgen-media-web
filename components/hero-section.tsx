"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Monitor, Headphones, Phone } from "lucide-react"
import Image from "next/image"
import { useContactModal } from "@/context/contact-modal-context"
import Link from "next/link"


const features = [
  {
    icon: Zap,
    title: "Setup nhanh chóng",
    subtitle: "24h triển khai",
  },
  {
    icon: Monitor,
    title: "Thiết bị hiện đại",
    subtitle: "Chất lượng cao",
  },
  {
    icon: Headphones,
    title: "Hỗ trợ 24/7",
    subtitle: "Đồng hành cùng bạn",
  },
]

export function HeroSection() {
  const { openModal } = useContactModal()
  return (
    <section className="relative min-h-screen bg-[#0a0f1e] overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 pt-28 lg:pt-32 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10"
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span className="text-xs font-semibold text-blue-300 tracking-wider uppercase">
                Giải pháp livestream chuyên nghiệp
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] mb-6 tracking-tight"
            >
              <span className="text-white block">GIẢI PHÁP TRUYỀN THÔNG</span>
              <span className="text-blue-400 block">LIVESTREAM TOÀN DIỆN</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-base text-slate-300 mb-8 max-w-md leading-relaxed"
            >
              NextGen Media cung cấp giải pháp livestream chuyên nghiệp, setup studio hiện đại, thiết bị tối tân và đội ngũ vận hành giàu kinh nghiệm.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              
<Link href="/services">
  <Button
    size="lg"
    className="bg-blue-600 hover:bg-blue-500 text-white px-8 h-11 text-sm font-semibold rounded-lg transition-all duration-300 group"
  >
    Khám phá dịch vụ
    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
  </Button>
</Link>
              <Button 
                size="lg" 
                onClick={openModal}
                className="border border-slate-600 bg-transparent hover:bg-slate-800/50 text-white px-8 h-11 text-sm font-semibold rounded-lg transition-all duration-300 group cursor-pointer"
              >
                Liên hệ ngay
                <Phone className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-wrap gap-6 lg:gap-8"
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.title} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-slate-800/80 border border-slate-700 rounded-full flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{feature.title}</div>
                    <div className="text-xs text-slate-500">{feature.subtitle}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] lg:aspect-[16/12] rounded-2xl overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aSUCnf5CYUevsn92WoBl4HvOR45W1j.png"
                alt="Professional TikTok livestream studio with neon lighting"
                fill
                className="object-cover"
                priority
              />
              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/40 via-transparent to-transparent" />
            </div>
            
            {/* Decorative glow behind image */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
