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
                <div className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/40 via-slate-900/50 to-slate-950/60 backdrop-blur-xl border border-blue-500/20 group-hover:border-blue-400/40 transition-all duration-500 p-0 flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-400/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:via-blue-400/5 group-hover:to-cyan-500/10 transition-all duration-500 pointer-events-none" />
                  
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 group-hover:via-black/30 transition-all duration-500" />
                  </div>

                  <div className="flex-1 p-4 flex flex-col justify-between backdrop-blur-sm">
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-white line-clamp-2 leading-snug group-hover:text-blue-200 transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {project.category && (
                        <div>
                          <span className="inline-block text-xs font-medium text-blue-300 bg-blue-500/20 px-2.5 py-1 rounded-full border border-blue-500/40 group-hover:border-blue-400 group-hover:text-blue-200 group-hover:bg-blue-500/30 transition-all duration-300">
                            {project.category}
                          </span>
                        </div>
                      )}

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

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeProject}
              className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <motion.div className="relative w-full max-w-7xl bg-gradient-to-br from-slate-950 via-slate-900 to-black backdrop-blur-2xl rounded-3xl overflow-hidden border-2 border-blue-500/40 shadow-2xl shadow-blue-500/30 max-h-[90vh] flex flex-col lg:flex-row">
                
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeProject}
                  className="absolute top-6 right-6 z-30 p-3 bg-black/60 hover:bg-blue-600/40 backdrop-blur-md rounded-full border border-blue-500/30 hover:border-blue-400 transition-all duration-300 group"
                >
                  <X className="w-6 h-6 text-white group-hover:text-blue-200" />
                </motion.button>

                {/* LEFT - Gallery */}
                <div className="lg:w-[70%] w-full bg-slate-950/50 flex flex-col items-center justify-center p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-blue-500/20 overflow-y-auto max-h-[50vh] lg:max-h-[90vh]">
                  <div className="w-full flex items-center justify-center gap-4">
                    {/* Thumbnails */}
                    {galleryImages.length > 1 && (
                      <div className="hidden sm:flex flex-col gap-3 overflow-y-auto max-h-96 pr-2">
                        {galleryImages.slice(0, 5).map((img, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setLightboxIndex(i)}
                            className={`relative flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 w-20 h-32 ${
                              lightboxIndex === i
                                ? 'border-blue-400 shadow-xl shadow-blue-400/70'
                                : 'border-slate-600 hover:border-blue-400/60'
                            }`}
                          >
                            <Image
                              src={img}
                              alt={`Thumbnail ${i + 1}`}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </motion.button>
                        ))}
                      </div>
                    )}

                    {/* Main Image */}
                    <motion.div
                      key={lightboxIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex-1 flex items-center justify-center relative"
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleTouchEnd}
                    >
                      <div className="relative w-full max-w-md rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-950 border-2 border-blue-500/40 shadow-2xl shadow-blue-500/40">
                        <div className="relative aspect-[9/16] w-full flex items-center justify-center bg-black overflow-hidden">
                          {galleryImages.length > 0 && (
                            <Image
                              src={galleryImages[lightboxIndex]}
                              alt={selectedProject.title}
                              fill
                              className="object-contain"
                              priority
                            />
                          )}
                        </div>
                      </div>

                      {galleryImages.length > 1 && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.2, x: -4 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handlePrevGallery}
                            className="absolute -left-20 top-1/2 -translate-y-1/2 p-3.5 bg-black/50 hover:bg-blue-600/60 backdrop-blur-md rounded-full border border-blue-400/40 hover:border-blue-300 transition-all duration-300 hidden sm:block group"
                          >
                            <ChevronLeft className="w-6 h-6 text-white group-hover:text-blue-100" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.2, x: 4 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleNextGallery}
                            className="absolute -right-20 top-1/2 -translate-y-1/2 p-3.5 bg-black/50 hover:bg-blue-600/60 backdrop-blur-md rounded-full border border-blue-400/40 hover:border-blue-300 transition-all duration-300 hidden sm:block group"
                          >
                            <ChevronRight className="w-6 h-6 text-white group-hover:text-blue-100" />
                          </motion.button>
                        </>
                      )}
                    </motion.div>
                  </div>

                  {/* Counter & Dots */}
                  {galleryImages.length > 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mt-6 flex flex-col items-center gap-4 w-full"
                    >
                      <div className="text-sm font-semibold text-slate-300">
                        <span className="text-blue-400">{lightboxIndex + 1}</span>
                        <span className="text-slate-500 mx-1">/</span>
                        <span>{galleryImages.length}</span>
                      </div>
                      <div className="flex gap-2">
                        {galleryImages.map((_, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setLightboxIndex(i)}
                            className={`rounded-full transition-all duration-300 ${
                              lightboxIndex === i
                                ? 'bg-blue-500 w-2.5 h-2.5 shadow-lg shadow-blue-500/60'
                                : 'bg-slate-600 hover:bg-slate-500 w-1.5 h-1.5'
                            }`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* RIGHT - Info */}
                <div className="lg:w-[30%] w-full bg-gradient-to-b from-slate-900/80 to-black/80 backdrop-blur-md p-6 lg:p-8 flex flex-col gap-6 overflow-y-auto max-h-[90vh]">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-2xl font-bold text-white leading-tight">{selectedProject.title}</h2>
                  </motion.div>

                  {selectedProject.category && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <span className="inline-block text-xs font-semibold text-blue-300 bg-blue-500/20 px-3 py-1.5 rounded-full border border-blue-500/50">
                        {selectedProject.category}
                      </span>
                    </motion.div>
                  )}

                  {selectedProject.description && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="border-t border-blue-500/20 pt-6"
                    >
                      <p className="text-sm text-white/70 leading-relaxed">{selectedProject.description}</p>
                    </motion.div>
                  )}

                  {selectedProject.techStack && selectedProject.techStack.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 }}
                      className="border-t border-blue-500/20 pt-6"
                    >
                      <p className="text-xs font-semibold text-blue-300 uppercase tracking-widest mb-3">Công Nghệ</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.techStack.map((tech, i) => (
                          <span key={i} className="text-xs font-medium text-slate-300 bg-slate-700/40 px-2.5 py-1 rounded-full border border-slate-600/50 hover:border-blue-500/30 transition-all">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="border-t border-blue-500/20 pt-6"
                  >
                    <p className="text-xs font-semibold text-blue-300 uppercase tracking-widest mb-3">Thiết Bị</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { icon: '📷', label: 'Camera' },
                        { icon: '💡', label: 'Lighting' },
                        { icon: '🎙️', label: 'Microphone' },
                        { icon: '🎛️', label: 'Mixer' },
                        { icon: '📺', label: 'Capture' },
                        { icon: '🖥️', label: 'Monitor' },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ y: -2, scale: 1.05 }}
                          className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-800/40 border border-slate-700/50 hover:border-blue-500/30 transition-all group"
                        >
                          <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{item.icon}</span>
                          <span className="text-xs text-slate-400 group-hover:text-blue-300 transition-colors text-center">{item.label}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <div className="flex-1" />

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      closeProject()
                      openModal()
                    }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/40 hover:shadow-xl hover:shadow-blue-500/60 border border-blue-400/50 hover:border-blue-300"
                  >
                    Tư Vấn Dự Án Tương Tự
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={closeProject}
                    className="w-full px-6 py-2 bg-slate-700/30 hover:bg-slate-700/50 text-white font-semibold rounded-xl transition-all duration-300 border border-slate-600/50 hover:border-slate-500"
                  >
                    Đóng
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
