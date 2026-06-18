'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const PROJECTS_PER_PAGE = 12

interface Project {
  id: string
  title: string
  description: string
  category: string
  imageUrl?: string
  imageAlt?: string
  link?: string
  featured?: boolean
}

interface PortfolioGalleryProps {
  projects: Project[]
}

export function PortfolioGallery({ projects }: PortfolioGalleryProps) {
  const [displayCount, setDisplayCount] = useState(PROJECTS_PER_PAGE)

  const displayedProjects = useMemo(() => {
    return projects.slice(0, displayCount)
  }, [projects, displayCount])

  const hasMore = displayCount < projects.length

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + PROJECTS_PER_PAGE, projects.length))
  }

  // Fallback if no projects
  if (!projects || projects.length === 0) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center py-12">
            <p className="text-white/60">Không có dự án nào để hiển thị.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20">
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
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.imageAlt || project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-b from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                      <span className="text-slate-400 text-xs text-center">{project.title}</span>
                    </div>
                  )}
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                </div>

                {/* Title Below Image */}
                <div className="p-3 bg-gradient-to-t from-slate-950 to-slate-900/50">
                  <h3 className="text-sm font-medium text-slate-100 line-clamp-2 leading-tight">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="inline-block text-xs text-yellow-400 mt-1">⭐ Featured</span>
                  )}
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
