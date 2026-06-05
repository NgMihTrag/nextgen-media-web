"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    name: "Stream Thời Trang - LEVENTS",
    category: "Livestream Thời Trang",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=720&fit=crop",
  },
  {
    name: "Shopee Live - Cocolux",
    category: "TikTok Shop",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=720&fit=crop",
  },
  {
    name: "Lazada 11.11 Super Show",
    category: "Livestream Sự Kiện",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=720&fit=crop",
  },
  {
    name: "LockLock Vietnam",
    category: "Livestream Bán Hàng",
    image: "https://images.unsplash.com/photo-1441986300352-7e3dee05ae6e?w=400&h=720&fit=crop",
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

        {/* Featured Projects Carousel */}
        <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 lg:overflow-visible lg:mx-0 lg:px-0 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-80 lg:w-96"
            >
              {/* Vertical Project Card - 9:16 Aspect Ratio */}
              <div className="group cursor-pointer h-full">
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-800 group-hover:border-blue-500/80 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/20">
                  {/* Image Container - 9:16 Ratio */}
                  <div className="relative w-full aspect-[9/16] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>
                  
                  {/* Content Below Image */}
                  <div className="p-5 bg-gradient-to-t from-slate-950 to-slate-900/50">
                    <h3 className="text-base font-semibold text-white mb-1 line-clamp-2">
                      {project.name}
                    </h3>
                    <p className="text-sm text-blue-400 font-medium">
                      {project.category}
                    </p>
                  </div>
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
          className="flex justify-center mt-12"
        >
          <a href="/portfolio">
            <Button 
              size="lg"
              className="border border-blue-500 bg-transparent hover:bg-blue-500/10 text-blue-400 hover:text-blue-300 px-8 rounded-lg transition-all duration-300"
            >
              Xem tất cả dự án
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
