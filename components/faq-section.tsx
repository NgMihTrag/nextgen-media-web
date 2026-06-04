"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Thời gian setup bao lâu?",
    answer: "Thời gian setup phụ thuộc vào gói dịch vụ bạn chọn. Với gói Cơ Bản, chúng tôi có thể setup trong vòng 1-2 ngày. Gói Chuyên Nghiệp và Doanh Nghiệp có thể mất 3-5 ngày để đảm bảo mọi thứ hoàn hảo.",
  },
  {
    question: "Có hỗ trợ TikTok Shop không?",
    answer: "Có, chúng tôi hỗ trợ toàn diện về TikTok Shop bao gồm: mở shop, tối ưu sản phẩm, quản lý đơn hàng, và chiến lược marketing. Đội ngũ của chúng tôi có kinh nghiệm sâu về nền tảng này.",
  },
  {
    question: "Chi phí như thế nào?",
    answer: "Chi phí được tính theo gói dịch vụ và nhu cầu cụ thể của bạn. Gói Cơ Bản từ 9.990.000đ, Chuyên Nghiệp từ 19.990.000đ, và Doanh Nghiệp từ 29.990.000đ. Chúng tôi cũng có các gói tùy chỉnh theo yêu cầu.",
  },
  {
    question: "Có hỗ trợ vận hành không?",
    answer: "Có, với gói Chuyên Nghiệp và Doanh Nghiệp, chúng tôi cung cấp dịch vụ vận hành livestream đầy đủ bao gồm: quản lý kỹ thuật, hỗ trợ tương tác, xử lý đơn hàng, và báo cáo hiệu quả sau mỗi phiên live.",
  },
  {
    question: "Có thể thuê theo ngày không?",
    answer: "Có, chúng tôi có dịch vụ cho thuê studio và thiết bị theo ngày. Liên hệ trực tiếp để được báo giá chi tiết và kiểm tra lịch trống. Chúng tôi cũng có các gói ưu đãi khi thuê dài hạn.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Những câu hỏi thường gặp
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Giải đáp các thắc mắc phổ biến của khách hàng.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="text-left text-card-foreground hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
