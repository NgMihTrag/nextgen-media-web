"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ArrowRight, Zap, Lightbulb, Settings, Radio, Package, Award, Star, CheckCircle, Sparkles, Video, Cpu, Wrench, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useContactModal } from "@/context/contact-modal-context"

export function ServicesHero() {
  const { openModal } = useContactModal()

  return (
    <section className="py-16 md:py-24 border-b border-blue-500/10 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-blue-400 font-semibold text-sm tracking-widest uppercase"
            >
              DỊCH VỤ LIVESTREAM CHUYÊN NGHIỆP
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold text-slate-50 leading-tight"
            >
              Giải pháp Livestream
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Toàn diện từ A-Z</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-slate-300 text-lg leading-relaxed max-w-xl"
            >
              NextGen Media cung cấp hệ thống giải pháp livestream chuyên nghiệp giúp doanh nghiệp và nhà bán hàng phát triển mạnh mẽ trên nền tảng TikTok, Facebook, Shopee và đa nền tảng.
            </motion.p>

            {/* Mini Features Row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-slate-100 font-medium">Giải pháp trọn gói</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-slate-100 font-medium">Hiệu quả vượt trội</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-slate-100 font-medium">Hỗ trợ 24/7</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={openModal}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 h-12 font-semibold rounded-lg transition-all duration-300 group cursor-pointer shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
              >
                Tư Vấn Ngay
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>

          {/* RIGHT: Studio Image - Premium Cinematic */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative h-96 md:h-full min-h-[500px] rounded-2xl overflow-hidden"
          >
            {/* Glow Effect Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent rounded-2xl" />

            {/* Studio Image */}
            <Image
              src="https://storage.googleapis.com/nexttgenmedia-assets-2026/Studio%20Image.png"
              alt="Professional livestream studio setup"
              fill
              className="object-cover rounded-2xl"
              priority
            />

            {/* Cinematic Overlay Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-transparent to-purple-600/20 rounded-2xl" />

            {/* Neon Border Glow */}
            <div className="absolute inset-0 rounded-2xl shadow-2xl shadow-blue-500/50" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function ServicesCardsGrid() {
  const services = [
    {
      number: "01",
      title: "Setup Live Trọn Gói",
      image: "https://storage.googleapis.com/nexttgenmedia-assets-2026/setuplivetrongoi.JPG",
      features: [
        "Setup studio livestream chuyên nghiệp",
        "Thiết kế ánh sáng",
        "Setup camera và phần mềm",
        "Tối ưu chất lượng livestream"
      ],
      tags: ["Tư vấn setup", "Thiết bị chính hãng", "Lắp đặt tận nơi", "Bảo hành dài hạn"],
      icon: Video
    },
    {
      number: "02",
      title: "Hỗ trợ phần mềm, Plugin",
      image: "https://storage.googleapis.com/nexttgenmedia-assets-2026/spapp.JPG",
      features: [
        "TikTok Studio",
        "OBS Studio",
        "Plugin Douyin",
        "Filter làm đẹp livestream"
      ],
      tags: ["TikTok Studio", "OBS Studio", "Plugin Douyin", "Hiệu ứng Filter"],
      icon: Cpu
    },
    {
      number: "03",
      title: "Vận hành Livestream Chuyên nghiệp",
      image: "https://storage.googleapis.com/nexttgenmedia-assets-2026/tetrapak.JPG",
      features: [
        "Kịch bản livestream",
        "Điều phối livestream",
        "Tối ưu chuyển đổi",
        "Báo cáo hiệu quả"
      ],
      tags: ["Kịch bản livestream", "Điều phối live", "Tối ưu doanh số", "Báo cáo hiệu quả"],
      icon: Radio
    },
    {
      number: "04",
      title: "Đào tạo Livestream & Coaching 1-1",
      image: "https://storage.googleapis.com/nexttgenmedia-assets-2026/tetrapak2.JPG",
      features: [
        "Đào tạo livestream",
        "Coaching thực chiến",
        "Kỹ năng bán hàng",
        "Chiến lược tăng trưởng"
      ],
      tags: ["Đào tạo cá nhân", "Đào tạo doanh nghiệp", "Kỹ năng livestream", "Chiến lược bán hàng"],
      icon: Award
    }
  ]

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold text-slate-50 mb-4">Dịch vụ của chúng tôi</h2>
        </motion.div>

        {/* Services Grid - 4 Columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group h-full"
            >
              <Card className="h-full bg-gradient-to-br from-slate-900 to-slate-800 border border-blue-500/15 hover:border-blue-500/80 transition-all duration-300 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105">
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                  {/* Number Badge */}
                  <div className="absolute top-4 left-4 w-10 h-10 bg-blue-600/90 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    {service.number}
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{service.title}</h3>

                  {/* Features List */}
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="text-sm text-gray-300 flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="pt-4 border-t border-blue-500/10 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-blue-500/10 text-blue-300 rounded border border-blue-500/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ServicesProcessOverview() {
  const steps = [
    { number: "01", title: "Tư vấn", description: "Lắng nghe mục tiêu và nhu cầu của bạn" },
    { number: "02", title: "Khảo sát", description: "Khảo sát không gian setup" },
    { number: "03", title: "Setup & Lắp đặt", description: "Thi công lắp đặt thiết bị và cải thiện không gian" },
    { number: "04", title: "Đào tạo", description: "Hướng dẫn sử dụng đầy đủ và chiến lược" },
    { number: "05", title: "Vận hành & Hỗ trợ", description: "Vận hành livestream và hỗ trợ 24/7 trong suốt quá trình" }
  ]

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold text-white mb-4">Quy trình triển khai</h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-blue-500/60 to-blue-500/20" style={{ display: 'block' }} />

          <div className="grid md:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                {/* Number Circle with Glow */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-2xl shadow-blue-500/50 group-hover:shadow-blue-500/70 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{step.number}</span>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>

                {/* Description */}
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function ServicesEquipment() {
  const equipment = [
    { icon: Video, name: "Thiết Bị Quay Phim", desc: "Camera 4K, PTZ Camera, Gimbal" },
    { icon: Lightbulb, name: "Hệ Thống Ánh Sáng", desc: "LED, Ring Light, Studio Lights" },
    { icon: Package, name: "Thiết Bị Âm Thanh", desc: "Microphone, Mixer, Monitor" },
    { icon: Settings, name: "Bộ Encoder", desc: "Professional Encoding Equipment" },
    { icon: Wrench, name: "Phần Cứng Hỗ Trợ", desc: "PC, Router, Các phụ kiện chuyên nghiệp" },
    { icon: Sparkles, name: "Phần Mềm Chuyên Nghiệp", desc: "OBS, Vmix, TikTok Studio" }
  ]

  return (
    <section className="pt-0 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Thiết Bị & Công Cụ</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">Trang bị chuyên nghiệp cho livestream chất lượng cao</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipment.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 hover:border-blue-500/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.name}</h3>
                  <p className="text-slate-300 text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ServicesBenefits() {
  const benefits = [
    { icon: Award, title: "20+ dự án", desc: "Dự án đã triển khai" },
    { icon: Zap, title: "99% hài lòng", desc: "Khách hàng hài lòng" },
    { icon: Star, title: "300%+ tăng trưởng", desc: "Tăng trưởng doanh số TB" },
    { icon: Sparkles, title: "24/7 hỗ trợ", desc: "Hỗ trợ kỹ thuật mọi lúc" }
  ]

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Before/After Comparison */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white mb-6">Studio Before / After</h3>
            <div className="relative rounded-2xl overflow-hidden h-80 bg-gradient-to-br from-slate-900 to-slate-800 border border-blue-500/20">
              <Image
                src="https://storage.googleapis.com/nexttgenmedia-assets-2026/after-before.png"
                alt="Before and After studio transformation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-transparent" />
              <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold">AFTER</div>
            </div>
          </motion.div>

          {/* Right: Why Choose NextGen Media Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white mb-8">Vì sao chọn NextGen Media?</h3>

            <div className="grid grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-lg p-4 hover:border-blue-500/40 transition-all"
                >
                  <div className="text-3xl font-bold text-blue-400 mb-1">{benefit.title}</div>
                  <p className="text-gray-300 text-sm">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function ServicesCTA() {
  const { openModal } = useContactModal()

  return (
    <section className="py-24 border-t border-blue-500/10">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Sẵn sàng bứt phá doanh số với Livestream chuyên nghiệp?
          </h2>

          <p className="text-gray-300 text-lg">
            Đội ngũ NextGen Media luôn sẵn sàng đồng hành cùng bạn.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              onClick={openModal}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 h-12 font-semibold rounded-lg transition-all duration-300 group cursor-pointer shadow-lg shadow-blue-500/30"
            >
              Tư Vấn Miễn Phí
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={openModal}
              variant="outline"
              className="border-blue-500 text-blue-400 hover:bg-blue-500/10 px-8 h-12 font-semibold rounded-lg transition-all duration-300 group"
            >
              Liên Hệ Ngay
              <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
