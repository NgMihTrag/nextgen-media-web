"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useContactModal } from "@/context/contact-modal-context"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function PricingHero() {
  const { openModal } = useContactModal()
  
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance">
            BẢNG GIÁ DỊCH VỤ
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-2xl mx-auto text-balance">
            Lựa chọn gói livestream phù hợp với nhu cầu và ngân sách của bạn.
          </p>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto text-balance mb-8">
            Từ livestream cơ bản đến hệ thống livestream chuyên nghiệp cho doanh nghiệp và nhà bán hàng.
          </p>
          <Button 
            onClick={openModal}
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 h-12 font-semibold rounded-lg transition-all duration-300 group cursor-pointer"
          >
            Tư Vấn Miễn Phí
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

const packages = [
  {
    number: "01",
    title: "Set-up Ánh Sáng - Điện Thoại - PC",
    price: "2.000.000",
    badge: null,
    features: [
      "Set up ánh sáng cho quay Video và Livestream với điện thoại",
      "Livestream đa nền tảng Facebook, TikTok, Shopee,...",
      "Chỉnh màu cho Livestream"
    ],
    notice: "Yêu cầu có máy tính để Livestream",
    featured: false
  },
  {
    number: "02",
    title: "Set-up Ánh Sáng - Camera Cơ Bản",
    price: "2.500.000",
    badge: "Phù Hợp Cá Nhân & Shop Mới",
    features: [
      "Set up ánh sáng cho quay Video và Livestream bằng máy ảnh",
      "Chỉnh màu riêng cho livestream",
      "Livestream TikTok Studio chuẩn phong cách Douyin",
      "Hình ảnh sắc nét và chuyên nghiệp",
      "Tối ưu camera cho livestream"
    ],
    notice: "Yêu cầu có máy tính để Livestream",
    featured: false
  },
  {
    number: "03",
    title: "Set-up Ánh Sáng Camera Nâng Cao",
    price: "3.500.000",
    badge: "PHỔ BIẾN NHẤT",
    features: [
      "Set up ánh sáng cho quay Video và Livestream với máy ảnh",
      "Chỉnh màu riêng cho quay video và livestream",
      "Tích hợp filter làm đẹp",
      "Điều chỉnh màu da và hiệu ứng khuôn mặt",
      "Livestream đa nền tảng đồng bộ màu sắc",
      "Tích hợp phòng ảo 3D cho phông xanh"
    ],
    notice: "Yêu cầu có máy tính để Livestream\nKhách hàng cần có 2 màn hình để sử dụng",
    featured: true
  },
  {
    number: "04",
    title: "Set-up Livestream Trọn Gói",
    price: "Liên Hệ Báo Giá",
    badge: "Giải Pháp Doanh Nghiệp",
    features: [
      "Khảo sát tận nơi",
      "Thiết kế hệ thống livestream",
      "Setup toàn bộ thiết bị",
      "Cấu hình phần mềm chuyên nghiệp",
      "Tối ưu hình ảnh và âm thanh",
      "Đào tạo vận hành",
      "Bàn giao công nghệ",
      "Hỗ trợ kỹ thuật sau bàn giao"
    ],
    notice: "Giải pháp tùy chỉnh cho doanh nghiệp",
    featured: false
  }
]

export function PricingCards() {
  const { openModal } = useContactModal()
  
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={pkg.featured ? "lg:col-span-1" : ""}
            >
              <Card className={`h-full relative overflow-hidden transition-all duration-300 ${
                pkg.featured
                  ? "border-blue-500/50 bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg shadow-blue-500/20 ring-1 ring-blue-500/30"
                  : "bg-slate-900/50 border-slate-800 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10"
              }`}>
                {pkg.featured && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400" />
                )}
                
                <CardHeader className="pb-4">
                  {pkg.badge && (
                    <div className={`inline-flex self-start px-3 py-1 text-xs font-medium rounded-full mb-3 ${
                      pkg.featured
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        : "bg-slate-800 text-slate-300"
                    }`}>
                      {pkg.badge}
                    </div>
                  )}
                  <div className="text-4xl font-bold text-blue-400 mb-2">{pkg.number}</div>
                  <h3 className="text-xl font-bold text-white">{pkg.title}</h3>
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-white">{pkg.price}</span>
                      {pkg.price !== "Liên Hệ Báo Giá" && <span className="text-slate-400">đ</span>}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {pkg.notice && (
                    <div className="mb-6 p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                      <p className="text-xs text-slate-400">{pkg.notice}</p>
                    </div>
                  )}
                  
                  <Button 
                    onClick={openModal}
                    className={`w-full cursor-pointer ${
                      pkg.featured
                        ? "bg-blue-600 hover:bg-blue-500 text-white"
                        : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-blue-500/30"
                    }`}
                  >
                    {pkg.number === "04" ? "Nhận Báo Giá" : "Tư Vấn Gói Này"}
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
    "Setup ánh sáng",
    "Chỉnh màu livestream",
    "Livestream đa nền tảng",
    "TikTok Studio",
    "Filter làm đẹp",
    "Phòng ảo 3D",
    "Khảo sát tận nơi",
    "Thiết kế hệ thống",
    "Đào tạo vận hành",
    "Bàn giao công nghệ",
    "Hỗ trợ kỹ thuật"
  ]
  
  const comparison = [
    [true, true, false, false, false, false, false, false, false, false, false],
    [true, true, true, true, false, false, false, false, false, false, false],
    [true, true, true, true, true, true, false, false, false, false, false],
    [true, true, true, true, true, true, true, true, true, true, true]
  ]
  
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">So Sánh Gói Dịch Vụ</h2>
          <p className="text-lg text-slate-300">Xem chi tiết tính năng của từng gói</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-4 px-4 text-white font-semibold">Tính năng</th>
                <th className="text-center py-4 px-4 text-slate-300">Gói 1</th>
                <th className="text-center py-4 px-4 text-slate-300">Gói 2</th>
                <th className="text-center py-4 px-4 text-blue-300 font-semibold">Gói 3</th>
                <th className="text-center py-4 px-4 text-slate-300">Gói 4</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <tr key={i} className="border-b border-slate-800 hover:bg-slate-900/30">
                  <td className="py-4 px-4 text-slate-300">{feature}</td>
                  {comparison[i].map((hasFeature, j) => (
                    <td key={j} className="text-center py-4 px-4">
                      {hasFeature ? (
                        <Check className="w-5 h-5 text-blue-400 mx-auto" />
                      ) : (
                        <div className="w-5 h-5 mx-auto" />
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

const faqItems = [
  {
    question: "Tôi cần chuẩn bị gì trước khi setup livestream?",
    answer: "Bạn cần chuẩn bị không gian phù hợp, điều kiện ánh sáng tốt, kết nối internet ổn định, và thiết bị (điện thoại, máy ảnh hoặc máy tính). Chúng tôi sẽ tư vấn chi tiết nhu cầu thiết bị khi bạn liên hệ."
  },
  {
    question: "Bao lâu có thể hoàn thành hệ thống livestream?",
    answer: "Thời gian hoàn thành tùy thuộc vào gói: Gói 1-2 từ 2-3 ngày, Gói 3 từ 3-5 ngày, Gói 4 từ 5-7 ngày. Chúng tôi sẽ lên lịch cụ thể khi bạn đặt dịch vụ."
  },
  {
    question: "Tôi có được hỗ trợ sau khi bàn giao không?",
    answer: "Có, toàn bộ gói dịch vụ đều có hỗ trợ kỹ thuật. Gói 1-2 hỗ trợ 8h/ngày, Gói 3-4 hỗ trợ 24/7. Chúng tôi sẽ cung cấp hotline và email hỗ trợ cho bạn."
  },
  {
    question: "NextGen Media có hỗ trợ tận nơi không?",
    answer: "Có, chúng tôi hỗ trợ tận nơi với dịch vụ khảo sát không gian, setup thiết bị, cấu hình hệ thống, và đào tạo vận hành. Phí hỗ trợ tận nơi tùy theo khoảng cách."
  },
  {
    question: "Tôi chưa có thiết bị thì có được tư vấn không?",
    answer: "Absolutely! Chúng tôi sẽ tư vấn chi tiết về thiết bị cần thiết, giới thiệu các nhà cung cấp uy tín, và hỗ trợ trong quá trình lựa chọn. Bạn cũng có thể thuê thiết bị từ chúng tôi."
  }
]

export function PricingFAQ() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Câu Hỏi Thường Gặp</h2>
          <p className="text-lg text-slate-300">Giải đáp những thắc mắc của bạn</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-slate-900/50 border border-slate-800 rounded-lg px-6 data-[state=open]:border-blue-500/50">
                <AccordionTrigger className="text-left text-white hover:text-blue-400 hover:no-underline py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-300 pb-5 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}

export function PricingFinalCTA() {
  const { openModal } = useContactModal()
  
  return (
    <section className="py-24 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
            Chưa Biết Chọn Gói Nào?
          </h2>
          <p className="text-lg text-slate-300 mb-8 text-balance">
            Liên hệ NextGen Media để được tư vấn giải pháp livestream phù hợp nhất với nhu cầu của bạn.
          </p>
          <Button 
            onClick={openModal}
            className="bg-blue-600 hover:bg-blue-500 text-white px-10 h-12 font-semibold rounded-lg transition-all duration-300 group cursor-pointer shadow-lg shadow-blue-600/50"
          >
            Tư Vấn Miễn Phí
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
