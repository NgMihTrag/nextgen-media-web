"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ArrowRight, Zap, Lightbulb, Settings, Radio, Package, Award, Star, CheckCircle, Sparkles, Video, Cpu, Wrench } from "lucide-react"
import Link from "next/link"
import { useContactModal } from "@/context/contact-modal-context"

export function ServicesHero() {
  const { openModal } = useContactModal()

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background via-background to-background/50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-blue-500 font-semibold mb-4 text-sm tracking-wide uppercase"
          >
            Dịch Vụ
          </motion.p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Dịch Vụ Livestream Chuyên Nghiệp
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground mb-8 text-balance"
          >
            Giải pháp setup livestream từ A-Z cho doanh nghiệp, cá nhân và TikTok Shop.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={openModal}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 h-12 font-semibold rounded-lg transition-all duration-300 group cursor-pointer"
            >
              Nhận Tư Vấn Miễn Phí
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export function ServicesCardsGrid() {
  const services = [
    {
      icon: Video,
      title: "Setup Live Trọn Gói",
      points: [
        "Tư vấn mô hình livestream",
        "Setup thiết bị",
        "Cấu hình hệ thống",
        "Bàn giao vận hành"
      ]
    },
    {
      icon: Lightbulb,
      title: "Setup Ánh Sáng & Hình Ảnh",
      points: [
        "Thiết kế ánh sáng",
        "Cân chỉnh màu sắc",
        "Setup camera",
        "Tối ưu hình ảnh"
      ]
    },
    {
      icon: Cpu,
      title: "Hỗ Trợ Phần Mềm & Plugin",
      points: [
        "OBS Studio",
        "TikTok Live Studio",
        "Vmix",
        "Plugin bán hàng"
      ]
    },
    {
      icon: Radio,
      title: "Vận Hành Livestream",
      points: [
        "Điều phối kỹ thuật",
        "Chuyển cảnh",
        "Quản lý âm thanh",
        "Giám sát livestream"
      ]
    }
  ]

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                    <service.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-4">{service.title}</h3>
                  <ul className="space-y-2">
                    {service.points.map((point) => (
                      <li key={point} className="text-slate-300 text-sm flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
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
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Quy Trình Thực Hiện</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">Từ tư vấn ban đầu đến bàn giao hệ thống hoàn chỉnh</p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-4 mb-12">
          {["Tư Vấn", "Khảo Sát", "Kịch Bản", "Setup", "Bàn Giao"].map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg shadow-lg shadow-blue-500/30">
                {index + 1}
              </div>
              <p className="text-slate-200 font-semibold">{step}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/livestream-process">
            <Button className="bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-500/10 px-8 h-11 font-semibold rounded-lg transition-all duration-300 cursor-pointer group">
              Xem Quy Trình Chi Tiết
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
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
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Thiết Bị & Công Cụ</h2>
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
    { icon: Award, title: "Kinh Nghiệm 5+ Năm", desc: "Đội ngũ chuyên nghiệp, giàu kinh nghiệm" },
    { icon: Zap, title: "Giải Pháp Toàn Diện", desc: "Từ tư vấn đến vận hành, bàn giao hoàn chỉnh" },
    { icon: Star, title: "Hỗ Trợ 24/7", desc: "Luôn sẵn sàng hỗ trợ mọi thắc mắc" },
    { icon: Sparkles, title: "Thiết Bị Hiện Đại", desc: "Công nghệ streaming mới nhất" },
    { icon: CheckCircle, title: "Kết Quả Đảm Bảo", desc: "Tăng doanh số, tương tác, followers" },
    { icon: Lightbulb, title: "Tối Ưu Hóa Liên Tục", desc: "Luôn cải thiện chất lượng livestream" }
  ]

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Tại Sao Chọn NextGen Media?</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">Những ưu điểm nổi bật của chúng tôi</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 hover:border-blue-500/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-slate-300 text-sm">{benefit.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ServicesCTA() {
  const { openModal } = useContactModal()

  return (
    <section className="py-24 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Bạn Đang Cần Setup Livestream?</h2>
          <p className="text-lg text-muted-foreground mb-8">Hãy liên hệ với chúng tôi để nhận tư vấn miễn phí và giải pháp phù hợp nhất cho doanh nghiệp của bạn</p>
          <Button
            onClick={openModal}
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 h-12 font-semibold rounded-lg transition-all duration-300 group cursor-pointer"
          >
            Nhận Tư Vấn Miễn Phí
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
