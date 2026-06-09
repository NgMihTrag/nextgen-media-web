"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"

export function ContactContent() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Phone,
              title: "Hotline",
              content: "0838 110 501",
              description: "Gọi chúng tôi để tư vấn trực tiếp"
            },
            {
              icon: Mail,
              title: "Email",
              content: "nextgenmedia868@gmail.com",
              description: "Gửi email với bất kỳ câu hỏi"
            },
            {
              icon: MapPin,
              title: "Địa Chỉ",
              content: "54 Lê Lai, Hà Đông, Hà Nội",
              description: "Ghé thăm studio của chúng tôi"
            }
          ].map((contact, idx) => (
            <motion.div
              key={contact.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="bg-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <contact.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">{contact.title}</h3>
                  <p className="text-primary font-semibold mb-2">{contact.content}</p>
                  <p className="text-muted-foreground text-sm">{contact.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-lg p-8 max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Gửi Lời Nhắn Cho Chúng Tôi</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Họ và Tên</label>
              <input type="text" placeholder="Nhập tên của bạn" className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input type="email" placeholder="Nhập email của bạn" className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nội Dung</label>
              <textarea placeholder="Viết nội dung của bạn ở đây" rows={5} className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"></textarea>
            </div>
            <Button className="w-full bg-primary hover:bg-[#1d4ed8] text-white h-12">
              Gửi Lời Nhắn
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
