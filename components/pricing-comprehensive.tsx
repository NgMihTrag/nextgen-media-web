"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, AlertCircle, MessageCircle, Phone, Smartphone, Camera, Lightbulb, Monitor } from "lucide-react"
import { useContactModal } from "@/context/contact-modal-context"
import { useState } from "react"

export function PricingHero() {
  const { openModal } = useContactModal()

  return (
    <section className="relative py-32 bg-gradient-to-b from-[#030712] via-[#071224] to-[#0B1730] overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance tracking-tight">
            BẢNG GIÁ DỊCH VỤ
          </h1>
          <p className="text-xl text-white/75 mb-4">
            Lựa chọn gói livestream phù hợp với nhu cầu của bạn
          </p>
          <p className="text-base text-white/60 mb-8 max-w-2xl mx-auto">
            Từ livestream cơ bản đến hệ thống livestream chuyên nghiệp cho doanh nghiệp và nhà bán hàng.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={openModal}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-8 h-12 font-semibold rounded-lg cursor-pointer group shadow-lg shadow-blue-500/30 transition-all duration-300"
            >
              Tư Vấn Miễn Phí
              <Phone className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export function PricingCards() {
  const { openModal } = useContactModal()

  const packages = [
    {
      id: 1,
      label: "GÓI 01",
      title: "Set-up Ánh Sáng - Điện Thoại - PC",
      audience: "👤 Phù Hợp Idol Live Cá Nhân",
      price: "2.000.000đ",
      features: [
        "Set up ánh sáng cho quay Video và Livestream với điện thoại",
        "Livestream đa nền tảng Facebook, TikTok, Shopee,...",
        "Chỉnh màu cho Livestream",
      ],
      warnings: ["❗ Yêu cầu có máy tính để Livestream"],
      cta: "Tư Vấn Gói Này",
      ctaStyle: "blue",
    },
    {
      id: 2,
      label: "GÓI 02",
      title: "Set-up Ánh Sáng - Camera Cơ Bản",
      audience: "🛍 Phù Hợp Cá Nhân & Shop Mới",
      price: "2.500.000đ",
      features: [
        "Set up ánh sáng cho quay Video và Livestream với máy ảnh",
        "Chỉnh màu riêng cho livestream",
        "Livestream TikTok Studio đẹp như Douyin",
        "Livestream sắc nét",
      ],
      warnings: ["❗ Yêu cầu có máy tính để Livestream"],
      cta: "Tư Vấn Gói Này",
      ctaStyle: "blue",
    },
    {
      id: 3,
      label: "GÓI 03",
      title: "Set-up Ánh Sáng Camera Nâng Cao",
      audience: "🚀 Hướng Tới Sự Chuyên Nghiệp",
      price: "3.500.000đ",
      badge: "🔥 PHỔ BIẾN NHẤT",
      features: [
        "Set up ánh sáng cho quay Video và Livestream với máy ảnh",
        "Chỉnh màu riêng cho quay video và livestream",
        "Phần mềm Livestream làm đẹp tích hợp filter, màu, làm mịn da",
        "Điều chỉnh hiệu ứng bóp mặt, tô son, trang điểm",
        "Chỉnh sửa hiệu ứng cơ thể",
        "Livestream đa nền tảng đồng bộ màu giữa các nền tảng đẹp như Douyin",
        "Tích hợp các phông 3D dùng cho phông xanh",
      ],
      warnings: ["❗ Yêu cầu có máy tính để Livestream", "❗ Khách hàng cần có 2 màn hình để sử dụng"],
      cta: "Tư Vấn Gói Này",
      ctaStyle: "blue",
    },
    {
      id: 4,
      label: "GÓI 04",
      title: "Set-up Livestream Trọn Gói",
      audience: "🏢 Tư Vấn Từ Đầu Cho Cá Nhân & Doanh Nghiệp",
      price: "Liên Hệ Báo Giá",
      features: [
        "Khảo sát tận nơi",
        "Thiết kế hệ thống livestream",
        "Setup toàn bộ thiết bị",
        "Cấu hình phần mềm chuyên nghiệp",
        "Tối ưu hình ảnh và âm thanh",
        "Bàn giao công nghệ",
        "Hỗ trợ kỹ thuật sau bàn giao",
      ],
      warnings: [],
      cta: "Nhận Báo Giá",
      ctaStyle: "orange",
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-[#0B1730] to-[#030712] relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={pkg.id === 3 ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <motion.div
                whileHover={pkg.id === 3 ? { y: -8 } : { y: -4 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Card className={`bg-gradient-to-br from-[rgba(10,18,35,0.9)] to-[rgba(7,18,36,0.9)] backdrop-blur-xl border rounded-2xl overflow-visible transition-all duration-300 flex flex-col h-full ${
                  pkg.id === 3 
                    ? 'border-blue-500 shadow-2xl shadow-blue-500/30 lg:scale-105 relative' 
                    : 'border-blue-500/15 hover:border-blue-500/30 shadow-xl shadow-black/30'
                }`}>
                  {/* Featured Badge - Inside Card Top Right */}
                  {pkg.id === 3 && pkg.badge && (
                    <div className="absolute -top-4 right-6 z-20">
                      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg shadow-blue-500/40 whitespace-nowrap flex items-center gap-1">
                        {pkg.badge}
                      </div>
                    </div>
                  )}
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Header Section */}
                    <div className={`mb-4 ${pkg.id === 3 ? 'pt-8' : ''}`}>
                      <div className={`text-xs font-bold tracking-widest mb-3 ${pkg.id === 3 ? 'text-blue-300' : 'text-blue-400'}`}>
                        {pkg.label}
                      </div>
                      
                      <div className="text-xs text-white/70 mb-4 h-5 flex items-center">
                        {pkg.audience}
                      </div>
                    </div>

                    {/* Icon Section */}
                    <div className="flex items-center justify-center h-12 mb-4">
                      {pkg.id === 1 && <Smartphone className="w-8 h-8 text-slate-400" />}
                      {pkg.id === 2 && <Camera className="w-8 h-8 text-slate-400" />}
                      {pkg.id === 3 && <Camera className="w-8 h-8 text-blue-400" />}
                      {pkg.id === 4 && <Monitor className="w-8 h-8 text-slate-400" />}
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-white text-center mb-4 line-clamp-2 h-14 flex items-center justify-center">
                      {pkg.title}
                    </h3>

                    {/* Price */}
                    <div className="text-center mb-6">
                      <div className={`text-2xl font-bold ${pkg.id === 3 ? 'bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent' : 'text-blue-400'}`}>
                        {pkg.price}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-6 flex-grow">
                      {pkg.features.map((feature, i) => (
                        <motion.div 
                          key={i} 
                          className="flex items-start gap-2 group"
                          whileHover={{ x: 2 }}
                        >
                          <Check className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-white/75 leading-relaxed">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Warnings */}
                    {pkg.warnings.length > 0 && (
                      <div className="space-y-2 mb-6">
                        {pkg.warnings.map((warning, i) => (
                          <div key={i} className="flex items-start gap-2 p-2 bg-orange-500/10 border border-orange-500/20 rounded">
                            <span className="text-xs text-orange-400/90 leading-relaxed">{warning}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CTA Button - Fixed to bottom */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-auto"
                    >
                      <Button
                        onClick={openModal}
                        className={`w-full font-semibold rounded-lg cursor-pointer transition-all duration-300 shadow-lg group text-sm ${
                          pkg.ctaStyle === 'orange' 
                            ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/30 hover:shadow-orange-500/40 text-white' 
                            : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-blue-500/30 hover:shadow-blue-500/40 text-white'
                        }`}
                      >
                        {pkg.cta}
                        <MessageCircle className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ComparisonTable() {
  const features = [
    "Setup ảnh sáng",
    "Chỉnh màu livestream",
    "Livestream đa nền tảng",
    "TikTok Studio",
    "Filter làm đẹp Douyin",
    "Phông ảu 3D",
    "Khảo sát tận nơi",
    "Thiết kế hệ thống livestream",
    "Setup toàn bộ thiết bị",
    "Đào tạo vận hành",
    "Bàn giao công nghệ",
    "Hỗ trợ kỹ thuật sau bàn giao",
  ]

  const packages = [
    { name: "GÓI 01\nĐiện thoại - PC", features: [true, true, true, false, false, false, false, false, false, false, false, false] },
    { name: "GÓI 02\nCamera Cơ Bản", features: [true, true, true, true, false, false, false, false, false, false, false, false] },
    { name: "GÓI 03\nCamera Nâng Cao", features: [true, true, true, true, true, true, false, false, false, false, false, false] },
    { name: "GÓI 04\nTrọn Gói", features: [true, true, true, true, true, true, true, true, true, true, true, true] },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-[#030712] to-[#071224]">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            SO SÁNH TÍNH NĂNG CÁC GÓI DỊCH VỤ
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="overflow-x-auto rounded-xl border border-blue-500/15 bg-gradient-to-br from-[rgba(10,18,35,0.5)] to-[rgba(7,18,36,0.5)] backdrop-blur-xl"
        >
          <table className="w-full min-w-max border-collapse">
            <thead>
              <tr className="border-b border-blue-500/20">
                <th className="text-left py-6 px-6 text-white/75 font-semibold w-48 bg-gradient-to-r from-blue-500/5 to-transparent">TÍNH NĂNG</th>
                {packages.map((pkg, i) => (
                  <th 
                    key={i} 
                    className={`text-center py-6 px-6 font-semibold whitespace-pre-line transition-colors duration-200 ${
                      i === 2 
                        ? 'bg-gradient-to-b from-blue-500/20 to-blue-500/5 border-x border-blue-500/20 text-blue-200' 
                        : 'text-white/75 hover:text-white/90'
                    }`}
                  >
                    {pkg.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <tr key={i} className="border-b border-blue-500/10 hover:bg-blue-500/5 transition-colors duration-200">
                  <td className="py-5 px-6 text-white/70 text-sm font-medium">{feature}</td>
                  {packages.map((pkg, j) => (
                    <td 
                      key={j} 
                      className={`text-center py-5 px-6 transition-all duration-200 ${
                        j === 2 
                          ? 'bg-blue-500/10 border-x border-blue-500/15' 
                          : 'hover:bg-blue-500/5'
                      }`}
                    >
                      {pkg.features[i] ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                        >
                          <Check className={`w-5 h-5 mx-auto ${j === 2 ? 'text-blue-300' : 'text-blue-400'}`} />
                        </motion.div>
                      ) : (
                        <span className="text-slate-600/50">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}

export function PricingFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const faqs = [
    {
      q: "Tôi cần chuẩn bị gì trước khi setup livestream?",
      a: "Bạn c��n chuẩn bị không gian thích hợp, máy quay (điện thoại hoặc camera), và đảm bảo kết nối internet ổn định.",
    },
    {
      q: "Bao lâu có thể hoàn thành hệ thống livestream?",
      a: "Tùy thuộc vào gói dịch vụ, từ 1-3 ngày cho gói cơ bản đến 1-2 tuần cho gói trọn gói.",
    },
    {
      q: "Tôi có được hỗ trợ kỹ thuật sau khi bàn giao không?",
      a: "Có, chúng tôi cung cấp hỗ trợ kỹ thuật sau bàn giao trong 30 ngày đầu.",
    },
    {
      q: "NextGen Media có hỗ trợ tân nơi không?",
      a: "Có, chúng tôi cung cấp dịch vụ khảo sát tận nơi cho tất cả các gói dịch vụ.",
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-[#0B1730] to-[#030712]">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            CÂU HỎI THƯỜNG GẶP
          </h2>
          <p className="text-white/60">Tìm câu trả lời cho các câu hỏi phổ biến về dịch vụ của chúng tôi</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group"
            >
              <motion.div
                whileHover={{ borderColor: "rgba(59,130,246,0.3)", backgroundColor: "rgba(59,130,246,0.05)" }}
                transition={{ duration: 0.2 }}
                className="border border-blue-500/15 rounded-xl overflow-hidden bg-gradient-to-br from-[rgba(10,18,35,0.6)] to-[rgba(7,18,36,0.6)] backdrop-blur-xl transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 hover:bg-blue-500/5 transition-colors duration-200"
                >
                  <span className="text-left font-semibold text-white/90 group-hover:text-white transition-colors">{faq.q}</span>
                  <motion.span 
                    className="text-blue-400 text-2xl flex-shrink-0"
                    animate={{ rotate: openIdx === idx ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    +
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIdx === idx ? "auto" : 0, opacity: openIdx === idx ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-white/70 border-t border-blue-500/10">
                    {faq.a}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PricingFinalCTA() {
  const { openModal } = useContactModal()

  return (
    <section className="relative py-32 bg-gradient-to-b from-[#030712] to-[#071224] overflow-hidden">
      {/* Animated background glows */}
      <div className="absolute inset-0 opacity-40">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-10 right-20 w-80 h-80 bg-blue-600 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-10 left-20 w-80 h-80 bg-indigo-600 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left content */}
          <div className="space-y-6">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              CHƯA BIẾT CHỌN GÓI NÀO?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/75 leading-relaxed"
            >
              Liên hệ NextGen Media để được tư vấn giải pháp livestream phù hợp nhất với nhu cầu của bạn.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={openModal}
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-8 h-12 font-semibold rounded-lg cursor-pointer group shadow-lg shadow-blue-500/30 transition-all duration-300"
              >
                Tư Vấn Miễn Phí
                <Phone className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>

          {/* Right grid features */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: "🎧", title: "Tư vấn miễn phí", desc: "Hỗ trợ 24/7" },
              { icon: "⚙️", title: "Hỗ trợ tận nơi", desc: "Khảo sát chi tiết" },
              { icon: "📷", title: "Thiết bị hiện đại", desc: "Chuyên nghiệp" },
              { icon: "✅", title: "Bảo hành & hỗ trợ", desc: "Đầy đủ dịch vụ" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                whileHover={{ y: -8, borderColor: "rgba(59,130,246,0.5)", backgroundColor: "rgba(59,130,246,0.1)" }}
                className="p-6 bg-gradient-to-br from-[rgba(10,18,35,0.7)] to-[rgba(7,18,36,0.7)] border border-blue-500/15 backdrop-blur-xl rounded-xl text-center transition-all duration-300 group cursor-default"
              >
                <motion.div 
                  className="text-4xl mb-3 transition-transform group-hover:scale-110"
                >
                  {item.icon}
                </motion.div>
                <p className="font-semibold text-white mb-1">{item.title}</p>
                <p className="text-sm text-white/60">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
