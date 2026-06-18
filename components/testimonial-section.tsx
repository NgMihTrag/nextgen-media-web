"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Nguyễn Văn An",
    company: "Beauty Store VN",
    avatar: "NA",
    review: "NextGen Media đã giúp chúng tôi tăng 300% doanh số chỉ sau 3 tháng. Đội ngũ chuyên nghiệp, nhiệt tình và luôn hỗ trợ kịp thời.",
    color: "#ec4899",
  },
  {
    name: "Trần Thị Bình",
    company: "Fashion Hub",
    avatar: "TB",
    review: "Từ một người không biết gì về livestream, giờ tôi đã có thể tự tin bán hàng trên TikTok với hơn 100K followers. Cảm ơn NextGen Media!",
    color: "#8b5cf6",
  },
  {
    name: "Lê Minh Cường",
    company: "Tech Gadget Pro",
    avatar: "LC",
    review: "Setup studio chuyên nghiệp, thiết bị hiện đại. Đội ngũ vận hành rất am hiểu về TikTok Shop. Strongly recommend!",
    color: "#06b6d4",
  },
]

export function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Khách hàng nói gì về chúng tôi
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Những phản hồi chân thực từ khách hàng đã sử dụng dịch vụ.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-card border-border">
              <CardContent className="p-8 md:p-12">
                <Quote className="w-12 h-12 text-primary/20 mb-6" />
                
                <p className="text-xl md:text-2xl text-card-foreground leading-relaxed mb-8">
                  {`"${testimonials[currentIndex].review}"`}
                </p>
                
                <div className="flex items-center gap-4">
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg"
                    style={{ backgroundColor: testimonials[currentIndex].color }}
                  >
                    {testimonials[currentIndex].avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground">{testimonials[currentIndex].name}</h4>
                    <p className="text-muted-foreground">{testimonials[currentIndex].company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors text-foreground"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors text-foreground"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
