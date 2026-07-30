'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useContactModal } from '@/context/contact-modal-context'

const PROJECTS_PER_PAGE = 12

interface Project {
  id: string
  title: string
  description: string
  category: string
  imageUrl?: string | null
  imageAlt?: string | null
  link?: string | null
  techStack?: string[] | null
  featured?: boolean
}

interface PremiumProjectShowcaseProps {
  projects: Project[]
}

export function PremiumProjectShowcase({ projects }: PremiumProjectShowcaseProps) {
  const [displayCount, setDisplayCount] = useState(PROJECTS_PER_PAGE)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const { openModal } = useContactModal()

  const displayedProjects = useMemo(() => {
    return projects.slice(0, displayCount)
  }, [projects, displayCount])

  const hasMore = displayCount < projects.length

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + PROJECTS_PER_PAGE, projects.length))
  }

  const openProject = (project: Project) => {
    setSelectedProject(project)
    setLightboxIndex(0)
    document.body.style.overflow = 'hidden'
  }

  const closeProject = () => {
    setSelectedProject(null)
    document.body.style.overflow = 'auto'
  }

  const galleryImages = selectedProject?.imageUrl ? [selectedProject.imageUrl] : []

  // Keyboard navigation
  useEffect(() => {
    if (!selectedProject) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevGallery()
      } else if (e.key === 'ArrowRight') {
        handleNextGallery()
      } else if (e.key === 'Escape') {
        closeProject()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedProject, lightboxIndex])

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNextGallery()
      } else {
        handlePrevGallery()
      }
    }
  }

  const handlePrevGallery = () => {
    setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const handleNextGallery = () => {
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length)
  }

  // Handle ESC key
  // Note: useEffect would be used for ESC key handling in actual implementation
  // Since we're using onClick, the ESC handling is managed at the modal level

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
    <>
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Portfolio Grid - Premium Design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => openProject(project)}
                className="group cursor-pointer h-full"
              >
                {/* Premium Glass Card */}
                <div className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/40 via-slate-900/50 to-slate-950/60 backdrop-blur-xl border border-blue-500/20 group-hover:border-blue-400/40 transition-all duration-500 p-0 flex flex-col">
                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-400/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:via-blue-400/5 group-hover:to-cyan-500/10 transition-all duration-500 pointer-events-none" />
                  
                  {/* Image Container with 9:16 Aspect Ratio */}
                  <div className="relative w-full aspect-[9/16] overflow-hidden rounded-2xl">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.imageAlt || project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-600/30 to-cyan-600/30 flex items-center justify-center">
                        <span className="text-slate-300 text-xs text-center px-2">{project.title}</span>
                      </div>
                    )}
                    
                    {/* Dark Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 group-hover:via-black/30 transition-all duration-500" />
                    

                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-4 flex flex-col justify-between backdrop-blur-sm">
                    {/* Title */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-white line-clamp-2 leading-snug group-hover:text-blue-200 transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>

                    {/* Category & Tech Tags */}
                    <div className="space-y-3">
                      {/* Category Badge */}
                      {project.category && (
                        <div>
                          <span className="inline-block text-xs font-medium text-blue-300 bg-blue-500/20 px-2.5 py-1 rounded-full border border-blue-500/40 group-hover:border-blue-400 group-hover:text-blue-200 group-hover:bg-blue-500/30 transition-all duration-300">
                            {project.category}
                          </span>
                        </div>
                      )}

                      {/* Tech Stack */}
                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.slice(0, 3).map((tech, i) => (
                            <span
                              key={i}
                              className="text-xs text-slate-300 bg-slate-700/40 px-2 py-1 rounded border border-slate-600/50 group-hover:border-blue-500/30 group-hover:text-blue-200 transition-all duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 3 && (
                            <span className="text-xs text-slate-400">+{project.techStack.length - 3}</span>
                          )}
                        </div>
                      )}

                      {/* CTA Button */}
                      <div className="pt-2">
                        <div className="w-full px-3 py-2 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 hover:from-blue-600/50 hover:to-cyan-600/50 border border-blue-500/30 group-hover:border-blue-400/60 rounded-lg text-center text-xs font-semibold text-blue-200 group-hover:text-blue-100 transition-all duration-300 backdrop-blur-sm">
                          Xem Dự Án
                        </div>
                      </div>
                    </div>
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
                className="border border-blue-500/50 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 hover:text-blue-200 px-8 rounded-lg transition-all duration-300 backdrop-blur-sm"
              >
                Tải thêm dự án
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeProject}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <motion.div className="relative w-full max-w-6xl bg-slate-950/95 backdrop-blur-xl rounded-[24px] overflow-hidden border border-blue-500/30 shadow-2xl shadow-blue-500/20 max-h-[90vh] flex flex-col">
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeProject}
                  className="absolute top-6 right-6 z-20 p-2.5 bg-black/50 hover:bg-black/70 backdrop-blur-md rounded-full border border-white/20 hover:border-blue-400/50 transition-all duration-300"
                >
                  <X className="w-6 h-6 text-white" />
                </motion.button>

                {/* Gallery & Main Image Section */}
                <div className="flex flex-1 overflow-hidden">
                  {/* LEFT SIDEBAR - Thumbnail Gallery */}
                  {galleryImages.length > 1 && (
                    <div className="w-32 bg-black/40 border-r border-blue-500/20 flex flex-col items-center py-6 px-3 gap-3 overflow-y-auto">
                      {galleryImages.map((img, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setLightboxIndex(i)}
                          className={`relative flex-shrink-0 rounded-[16px] overflow-hidden border-2 transition-all duration-300 ${
                            lightboxIndex === i
                              ? 'border-blue-400 shadow-lg shadow-blue-400/60 ring-2 ring-blue-400/50'
                              : 'border-slate-700 hover:border-blue-400/70 hover:shadow-lg hover:shadow-blue-400/40'
                          }`}
                          style={{ width: '100%', aspectRatio: '9/16' }}
                        >
                          <Image
                            src={img}
                            alt={`Gallery ${i + 1}`}
                            fill
                            className="object-cover"
                            sizes="120px"
                          />
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {/* CENTER - Main Portrait Image */}
                  <div className="flex-1 bg-slate-900/50 flex flex-col items-center justify-center p-6 overflow-y-auto">
                    {/* Large Portrait Image */}
                    <motion.div
                      key={lightboxIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="relative w-full max-w-sm flex-shrink-0"
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleTouchEnd}
                    >
                      <div className="relative rounded-[24px] overflow-hidden bg-gradient-to-br from-slate-800 to-slate-950 border border-blue-500/40 shadow-2xl shadow-blue-500/30">
                        <div className="relative aspect-[9/16] w-full flex items-center justify-center bg-slate-950">
                          {galleryImages.length > 0 ? (
                            <Image
                              src={galleryImages[lightboxIndex]}
                              alt={selectedProject.title}
                              fill
                              className="object-contain"
                              priority
                            />
                          ) : (
                            <div className="flex items-center justify-center text-slate-400">No Image</div>
                          )}
                        </div>
                      </div>

                      {/* Navigation Arrows - Show on Hover (Desktop) */}
                      {galleryImages.length > 1 && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.15, opacity: 1 }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.5 }}
                            onClick={handlePrevGallery}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 p-3 bg-black/50 hover:bg-blue-600/60 backdrop-blur-md rounded-full border border-blue-400/40 hover:border-blue-300 transition-all duration-300 hidden md:block"
                          >
                            <ChevronLeft className="w-6 h-6 text-white" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.15, opacity: 1 }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.5 }}
                            onClick={handleNextGallery}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 p-3 bg-black/50 hover:bg-blue-600/60 backdrop-blur-md rounded-full border border-blue-400/40 hover:border-blue-300 transition-all duration-300 hidden md:block"
                          >
                            <ChevronRight className="w-6 h-6 text-white" />
                          </motion.button>
                        </>
                      )}
                    </motion.div>

                    {/* Project Information Below Image */}
                    <div className="w-full mt-8 space-y-6 text-center md:text-left">
                      {/* Project Name */}
                      <div>
                        <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
                      </div>

                      {/* Category & Location */}
                      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        {selectedProject.category && (
                          <span className="text-xs font-semibold text-blue-300 bg-blue-500/25 px-3 py-1.5 rounded-full border border-blue-500/50">
                            {selectedProject.category}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      {selectedProject.description && (
                        <p className="text-sm text-white/70 leading-relaxed max-w-2xl">
                          {selectedProject.description}
                        </p>
                      )}

                      {/* Technology Stack */}
                      {selectedProject.techStack && selectedProject.techStack.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-blue-300 uppercase tracking-widest mb-3">
                            Công nghệ sử dụng
                          </p>
                          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {selectedProject.techStack.map((tech, i) => (
                              <span
                                key={i}
                                className="text-xs font-medium text-slate-300 bg-slate-700/50 px-2.5 py-1 rounded-full border border-slate-600/50 hover:border-blue-500/30 hover:text-blue-200 transition-all duration-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA - Full Width */}
                <div className="border-t border-blue-500/20 bg-black/30 backdrop-blur-sm p-4 flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={closeProject}
                    className="px-6 py-2.5 bg-slate-700/40 hover:bg-slate-700/60 text-white font-semibold rounded-lg transition-all duration-300 border border-slate-600/50 hover:border-slate-500"
                  >
                    Đóng
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      closeProject()
                      openModal()
                    }}
                    className="flex-1 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 border border-blue-400/50 hover:border-blue-300"
                  >
                    Tư Vấn Giải Pháp Tương Tự
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
