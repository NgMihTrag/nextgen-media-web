"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    name: "Stream Thời Trang - LEVENTS",
    category: "Livestream Thời Trang",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=400&fit=crop",
  },
  {
    name: "Shopee Live - Cocolux",
    category: "TikTok Shop",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=400&fit=crop",
  },
  {
    name: "Lazada 11.11 Super Show",
    category: "Livestream Sự Kiện",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop",
  },
  {
    name: "LockLock Vietnam",
    category: "Livestream Bán Hàng",
    image: "https://images.unsplash.com/photo-1441986300352-7e3dee05ae6e?w=500&h=400&fit=crop",
  },
  {
    name: "PNJ Jewelry",
    category: "Livestream Cao Cấp",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=400&fit=crop",
  },
  {
    name: "TikTok 9.9 Super Brand Day",
    category: "Livestream Sự Kiện",
    image: "https://images.unsplash.com/photo-1489599849228-8d604c3ee4a1?w=500&h=400&fit=crop",
  },
]

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 bg-[#0a0f1e]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-xs font-semibold text-blue-400 tracking-widest uppercase mb-3">
            Portfolio
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Dự án tiêu biểu
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto" />
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-64 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 group-hover:border-blue-500/50 transition-all duration-300">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <h3 className="text-lg font-semibold text-white mb-1">{project.name}</h3>
                  <p className="text-sm text-slate-300">{project.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Button 
            size="lg"
            className="border border-blue-500 bg-transparent hover:bg-blue-500/10 text-blue-400 hover:text-blue-300 px-8 rounded-lg transition-all duration-300"
          >
            Xem tất cả dự án
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
