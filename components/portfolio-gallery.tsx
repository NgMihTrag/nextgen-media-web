"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const allProjects = [
  {
    id: 1,
    name: "Stream Thời Trang - LEVENTS",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=720&fit=crop",
  },
  {
    id: 2,
    name: "Shopee Live - Cocolux",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=720&fit=crop",
  },
  {
    id: 3,
    name: "Lazada 11.11 Super Show",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=720&fit=crop",
  },
  {
    id: 4,
    name: "LockLock Vietnam",
    image: "https://images.unsplash.com/photo-1441986300352-7e3dee05ae6e?w=400&h=720&fit=crop",
  },
  {
    id: 5,
    name: "PNJ Jewelry",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=720&fit=crop",
  },
  {
    id: 6,
    name: "TikTok 9.9 Super Brand Day",
    image: "https://images.unsplash.com/photo-1489599849228-8d604c3ee4a1?w=400&h=720&fit=crop",
  },
  {
    id: 7,
    name: "Beauty Store VN",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=720&fit=crop",
  },
  {
    id: 8,
    name: "Fashion Hub",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=720&fit=crop",
  },
  {
    id: 9,
    name: "Tech Gadget Pro",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=720&fit=crop",
  },
  {
    id: 10,
    name: "Home Living",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=720&fit=crop",
  },
  {
    id: 11,
    name: "Food Delivery Pro",
    image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=720&fit=crop",
  },
  {
    id: 12,
    name: "Wellness Shop",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=720&fit=crop",
  },
]

const PROJECTS_PER_PAGE = 12

export function PortfolioGallery() {
  const [displayCount, setDisplayCount] = useState(PROJECTS_PER_PAGE)

  const displayedProjects = useMemo(() => {
    return allProjects.slice(0, displayCount)
  }, [displayCount])

  const hasMore = displayCount < allProjects.length

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + PROJECTS_PER_PAGE, allProjects.length))
  }

  return (
    <section className="py-20 bg-[#0a0f1e]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Gallery Grid - Responsive Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6 mb-12">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group cursor-pointer"
            >
              {/* Project Card - 9:16 Aspect Ratio */}
              <div className="relative rounded-lg overflow-hidden bg-slate-900 border border-slate-800 group-hover:border-blue-500 transition-all duration-300 h-full">
                {/* Image Container */}
                <div className="relative w-full aspect-[9/16] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                </div>

                {/* Title Below Image */}
                <div className="p-3 bg-gradient-to-t from-slate-950 to-slate-900/50">
                  <h3 className="text-sm font-medium text-white line-clamp-2 leading-tight">
                    {project.name}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Button
              onClick={handleLoadMore}
              size="lg"
              className="border border-blue-500 bg-transparent hover:bg-blue-500/10 text-blue-400 hover:text-blue-300 px-8 rounded-lg transition-all duration-300"
            >
              Tải thêm dự án
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
