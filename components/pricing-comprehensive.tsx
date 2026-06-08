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
    <section className="relative py-32 bg-gradient-to-b from-slate-900 via-slate-900 to-background overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance">
            BẢNG GIÁ DỊCH VỤ
          </h1>
          <p className="text-xl text-slate-300 mb-4">
            Lựa chọn gói livestream phù hợp với nhu cầu của bạn
          </p>
          <p className="text-base text-slate-400 mb-8">
            Từ livestream cơ bản đến hệ thống livestream chuyên nghiệp cho doanh nghiệp và nhà bán hàng.
          </p>
          <Button
            onClick={openModal}
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 h-12 font-semibold rounded-lg cursor-pointer group"
          >
            Tư Vấn Miễn Phí
            <Phone className="w-4 h-4 ml-2" />
          </Button>
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
      title: "Set-up Ảnh Sáng - Điện Thoại - PC",
      price: "2.000.000",
      currency: "đ",
      badge: null,
      badgeColor: null,
      features: [
        "Set up ảnh sáng cho quay Video và Livestream với điện thoại",
        "Livestream đa nền tảng Facebook, TikTok, Shopee...",
        "Chỉnh màu cho Livestream",
      ],
      warning: "Yêu cầu có máy tính để Livestream",
      cta: "Tư Vấn Gói Này",
      ctaStyle: "blue",
    },
    {
      id: 2,
      label: "GÓI 02",
      title: "Set-up Ảnh Sáng - Camera Cơ Bản",
      price: "2.500.000",
      currency: "đ",
      tag: "Phù Hợp Cả Nhân & Shop Mới",
      tagBg: "bg-green-500/20 border-green-500/50",
      badge: null,
      badgeColor: null,
      features: [
        "Set up ảnh sáng cho quay Video và Livestream bằng máy ảnh",
        "Chỉnh màu nâng cao livestream",
        "Livestream TikTok Studio",
        "Hình ảnh sắc nét và chuyên nghiệp",
        "Tối ưu camera cho livestream",
      ],
      warning: "Yêu cầu có máy tính để Livestream",
      cta: "Tư Vấn Gói Này",
      ctaStyle: "blue",
    },
    {
      id: 3,
      label: "GÓI 03",
      title: "Set-up Ảnh Sáng Camera Nâng Cao",
      price: "3.500.000",
      currency: "đ",
      badge: "★ PHỔ BIẾN NHẤT",
      badgeColor: "bg-blue-500",
      features: [
        "Set up ảnh sáng cho quay Video và Livestream với máy ảnh",
        "Chỉnh màu nâng cao cho quay video để Douyin",
        "Điều chỉnh màu đủ và hữu khắn mặt",
        "Livestream đa nền tảng đông bay tiêu...",
        "Tích hợp phông ảo 3D cho phòng xanh",
      ],
      warning: "Khách hàng cần có 2 màn hình để sử dụng",
      cta: "Tư Vấn Gói Này",
      ctaStyle: "blue",
    },
    {
      id: 4,
      label: "GÓI 04",
      title: "Set-up Livestream Trọn Gói",
      price: "Liên Hệ Báo Giá",
      currency: "",
      badge: null,
      badgeColor: null,
      tag: "Giải Pháp Doanh Nghiệp",
      tagBg: "bg-purple-500/20 border-purple-500/50",
      features: [
        "Khảo sát tận nơi",
        "Thiết kế hệ thống livestream",
        "Setup toàn bộ thiết bị",
        "Cấu hình phần mềm chuyên nghiệp",
        "Tối ưu hình ảnh và âm thanh",
        "Bàn giao công nghệ",
        "Hỗ trợ kỹ thuật sau bàn giao",
      ],
      warning: null,
      cta: "Nhận Báo Giá",
      ctaStyle: "orange",
    },
  ]

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className={`relative bg-slate-900/50 border ${pkg.id === 3 ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-slate-800'} h-full flex flex-col`}>
                {pkg.id === 3 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded">
                      {pkg.badge}
                    </div>
                  </div>
                )}
                
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-6">
                    <div className={`text-sm font-bold mb-4 ${pkg.id === 3 ? 'text-blue-400' : 'text-blue-500'}`}>
                      {pkg.label}
                    </div>
                    
                    {pkg.tag && (
                      <div className={`text-xs font-semibold px-3 py-1 rounded border mb-4 ${pkg.tagBg}`}>
                        {pkg.tag}
                      </div>
                    )}

                    <div className="flex items-center justify-center h-16 mb-4">
                      {pkg.id === 1 && <Smartphone className="w-10 h-10 text-slate-400" />}
                      {pkg.id === 2 && <Camera className="w-10 h-10 text-slate-400" />}
                      {pkg.id === 3 && <Camera className="w-10 h-10 text-blue-400" />}
                      {pkg.id === 4 && <Monitor className="w-10 h-10 text-slate-400" />}
                    </div>

                    <h3 className="text-lg font-bold text-white text-center mb-3">
                      {pkg.title}
                    </h3>

                    <div className="text-center mb-6">
                      {pkg.price === "Liên Hệ Báo Giá" ? (
                        <div className={`${pkg.ctaStyle === 'orange' ? 'text-orange-400' : 'text-blue-400'} font-bold`}>
                          {pkg.price}
                        </div>
                      ) : (
                        <>
                          <div className="text-3xl font-bold text-blue-400">
                            {pkg.price}
                            <span className="text-lg">{pkg.currency}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 flex-grow">
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-blue-400 flex-shrink-0 mt-1" />
                        <span className="text-sm text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {pkg.warning && (
                    <div className="flex items-start gap-3 mb-6 p-3 bg-orange-500/10 border border-orange-500/20 rounded">
                      <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-orange-400">{pkg.warning}</span>
                    </div>
                  )}

                  <Button
                    onClick={openModal}
                    className={`w-full ${pkg.ctaStyle === 'orange' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-500'} text-white font-semibold rounded-lg cursor-pointer`}
                  >
                    {pkg.cta}
                    <MessageCircle className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
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
    "Phông ảo 3D",
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
    <section className="py-24 bg-gradient-to-b from-background to-slate-900/50">
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
          className="overflow-x-auto"
        >
          <table className="w-full min-w-max border-collapse">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-4 px-4 text-slate-300 font-semibold w-48">TÍNH NĂNG</th>
                {packages.map((pkg, i) => (
                  <th 
                    key={i} 
                    className={`text-center py-4 px-4 font-semibold whitespace-pre-line ${i === 2 ? 'bg-blue-600/20 text-blue-300' : 'text-slate-300'}`}
                  >
                    {pkg.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/30">
                  <td className="py-4 px-4 text-slate-300 text-sm">{feature}</td>
                  {packages.map((pkg, j) => (
                    <td 
                      key={j} 
                      className={`text-center py-4 px-4 ${j === 2 ? 'bg-blue-600/10' : ''}`}
                    >
                      {pkg.features[i] ? (
                        <Check className="w-5 h-5 text-blue-400 mx-auto" />
                      ) : (
                        <span className="text-slate-600">—</span>
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
      a: "Bạn cần chuẩn bị không gian thích hợp, máy quay (điện thoại hoặc camera), và đảm bảo kết nối internet ổn định.",
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
    <section className="py-24 bg-background">
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
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/30"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-800/30 transition-colors"
              >
                <span className="text-left font-semibold text-slate-200">{faq.q}</span>
                <span className={`text-blue-400 transition-transform ${openIdx === idx ? 'rotate-45' : ''}`}>+</span>
              </button>
              {openIdx === idx && (
                <div className="px-4 pb-4 text-slate-400 border-t border-slate-800">
                  {faq.a}
                </div>
              )}
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
    <section className="py-24 bg-gradient-to-b from-slate-900 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white">
              CHƯA BIẾT CHỌN GÓI NÀO?
            </h2>
            <p className="text-lg text-slate-300">
              Liên hệ NextGen Media để được tư vấn giải pháp livestream phù hợp nhất.
            </p>
            <Button
              onClick={openModal}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 h-12 font-semibold rounded-lg cursor-pointer"
            >
              Tư Vấn Miễn Phí
              <Phone className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "🎧", title: "Tư vấn miễn phí" },
              { icon: "⚙️", title: "Hỗ trợ lắn nội" },
              { icon: "📷", title: "Thiết bị hiện đại" },
              { icon: "✅", title: "Bảo hành & hỗ trợ" },
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-sm text-slate-300">{item.title}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
