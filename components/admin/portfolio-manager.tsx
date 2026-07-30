'use client'

import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Edit2, Trash2, Save, X, Upload, Image as ImageIcon, Plus, ChevronDown } from 'lucide-react'
import { getPortfolioProjects, createPortfolioProject, updatePortfolioProject, deletePortfolioProject } from '@/app/actions/portfolio'
import Image from 'next/image'

const CATEGORIES = ['Jewelry', 'Fashion', 'Cosmetics', 'TikTok Idol', 'Enterprise', 'Other']

interface Project {
  id: string
  title: string
  description: string
  category: string
  imageUrl?: string
  imageAlt?: string
  link?: string
  techStack?: string[]
  featured?: boolean
  orderIndex?: number
  clientName?: string
  clientLogo?: string
  location?: string
  coverImage?: string
  galleryImages?: string[]
  displayOrder?: number
}

export default function PortfolioManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [tagInput, setTagInput] = useState('')
  const [galleryPreviews, setGalleryPreviewsState] = useState<string[]>([])
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    category: '',
    imageUrl: '',
    imageAlt: '',
    link: '',
    techStack: [],
    featured: false,
    clientName: '',
    location: '',
    displayOrder: 0,
    galleryImages: [],
  })

  useEffect(() => {
    loadProjects()
  }, [])

  async function loadProjects() {
    try {
      setLoading(true)
      setError(null)
      const data = await getPortfolioProjects()
      setProjects(data as Project[])
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error('[v0] Failed to load projects:', errorMessage)
      setError(`Failed to load projects: ${errorMessage}`)
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  async function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setError(null)
      setUploading(true)
      setUploadProgress(0)

      // Show preview immediately
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Upload to MinIO
      const formDataToSend = new FormData()
      formDataToSend.append('file', file)

      const response = await fetch('/api/admin/uploads', {
        method: 'POST',
        body: formDataToSend,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed')
      }

      setFormData((prev) => ({
        ...prev,
        imageUrl: result.imageUrl,
        imageAlt: file.name,
      }))

      setUploadProgress(100)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error('[v0] Upload failed:', errorMessage)
      setError(`Upload failed: ${errorMessage}`)
      setPreviewUrl(null)
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  async function handleSave() {
    try {
      setError(null)
      
      if (!formData.title || !formData.description || !formData.category) {
        setError('Please fill in all required fields: Title, Description, and Category')
        return
      }
      
      if (editingId) {
        await updatePortfolioProject(editingId, formData)
      } else {
        console.log('[v0] Creating project with data:', formData)
        const result = await createPortfolioProject(formData as any)
        console.log('[v0] Project creation result:', result)
      }
      
      resetForm()
      await loadProjects()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error('[v0] Failed to save project:', errorMessage, error)
      setError(`Failed to save project: ${errorMessage}`)
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        setError(null)
        await deletePortfolioProject(id)
        await loadProjects()
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error)
        console.error('[v0] Failed to delete project:', errorMessage)
        setError(`Failed to delete project: ${errorMessage}`)
      }
    }
  }

  function resetForm() {
    setFormData({
      title: '',
      description: '',
      category: '',
      imageUrl: '',
      imageAlt: '',
      link: '',
      techStack: [],
      featured: false,
      clientName: '',
      location: '',
      displayOrder: 0,
      galleryImages: [],
    })
    setPreviewUrl(null)
    setTagInput('')
    setGalleryPreviewsState([])
    setEditingId(null)
    setShowForm(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    if (galleryInputRef.current) {
      galleryInputRef.current.value = ''
    }
  }

  function handleEdit(project: Project) {
    setEditingId(project.id)
    setFormData(project)
    setShowForm(true)
  }

  if (loading) return <div className="text-white text-center py-8">Loading projects...</div>

  return (
    <div className="space-y-4">
      {!showForm && (
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
        >
          Create New Project
        </Button>
      )}

      {showForm && (
        <Card className="p-6 bg-[rgba(10,18,35,0.9)] border-blue-500/15 space-y-6">
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded text-red-300 text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-300">Project Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Title *</label>
                <Input
                  placeholder="Project title"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-[rgba(20,30,50,0.8)] border-blue-500/20 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Client Name</label>
                <Input
                  placeholder="Client name"
                  value={formData.clientName || ''}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="bg-[rgba(20,30,50,0.8)] border-blue-500/20 text-black"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">Description *</label>
              <textarea
                placeholder="Project description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-[rgba(20,30,50,0.8)] border border-blue-500/20 text-white p-2 rounded"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Category *</label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-[rgba(20,30,50,0.8)] border border-blue-500/20 text-white p-2 rounded"
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Location</label>
                <Input
                  placeholder="City, region"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="bg-[rgba(20,30,50,0.8)] border-blue-500/20 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Display Order</label>
                <Input
                  type="number"
                  placeholder="Sort order"
                  value={formData.displayOrder || 0}
                  onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                  className="bg-[rgba(20,30,50,0.8)] border-blue-500/20 text-black"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-blue-500/10 pt-4 space-y-4">
            <h3 className="text-lg font-semibold text-blue-300">Cover Image</h3>
            
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? `Uploading...` : 'Choose Image'}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {(previewUrl || formData.imageUrl) && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">Preview</label>
                <div className="relative w-full h-40 bg-[rgba(20,30,50,0.8)] border border-blue-500/20 rounded overflow-hidden">
                  <Image
                    src={previewUrl || formData.imageUrl || ''}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">Image Alt Text</label>
              <Input
                placeholder="Alt text for image"
                value={formData.imageAlt || ''}
                onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                className="bg-[rgba(20,30,50,0.8)] border-blue-500/20 text-black"
              />
            </div>
          </div>

          <div className="border-t border-blue-500/10 pt-4 space-y-4">
            <h3 className="text-lg font-semibold text-blue-300">Technology Stack</h3>
            
            <div className="flex gap-2">
              <Input
                placeholder="Enter technology name (e.g., React, Next.js)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && tagInput.trim()) {
                    e.preventDefault()
                    setFormData({
                      ...formData,
                      techStack: [...(formData.techStack || []), tagInput.trim()],
                    })
                    setTagInput('')
                  }
                }}
                className="bg-[rgba(20,30,50,0.8)] border-blue-500/20 text-black flex-1"
              />
              <Button
                type="button"
                onClick={() => {
                  if (tagInput.trim()) {
                    setFormData({
                      ...formData,
                      techStack: [...(formData.techStack || []), tagInput.trim()],
                    })
                    setTagInput('')
                  }
                }}
                className="bg-blue-600 hover:bg-blue-500"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {formData.techStack && formData.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.techStack.map((tag, idx) => (
                  <div
                    key={idx}
                    className="bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button
                      onClick={() =>
                        setFormData({
                          ...formData,
                          techStack: formData.techStack?.filter((_, i) => i !== idx),
                        })
                      }
                      className="hover:text-blue-100"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-blue-500/10 pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured || false}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <span className="text-white/80 font-medium">Featured Project</span>
              </label>
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t border-blue-500/10">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-500 flex-1">
              <Save className="w-4 h-4 mr-2" />
              Save Project
            </Button>
            <Button onClick={resetForm} variant="outline" className="flex-1">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {projects.map((project) => (
          <Card key={project.id} className="p-4 bg-[rgba(10,18,35,0.9)] border-blue-500/15 hover:border-blue-500/30 transition-all">
            <div className="grid grid-cols-12 gap-4 items-start">
              {/* Cover Image */}
              {project.imageUrl && (
                <div className="col-span-2 relative w-full aspect-video bg-[rgba(20,30,50,0.8)] border border-blue-500/20 rounded overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              {/* Project Info */}
              <div className={project.imageUrl ? 'col-span-7' : 'col-span-9'}>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    {project.featured && (
                      <span className="text-xs bg-yellow-500/30 text-yellow-300 px-2 py-0.5 rounded-full font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  {project.clientName && (
                    <p className="text-sm text-blue-300">Client: {project.clientName}</p>
                  )}
                  
                  <p className="text-sm text-white/60 line-clamp-1">{project.description}</p>
                  
                  <div className="flex gap-2 flex-wrap pt-2">
                    <span className="text-xs bg-blue-500/30 text-blue-300 px-2 py-1 rounded font-medium">
                      {project.category}
                    </span>
                    {project.location && (
                      <span className="text-xs bg-slate-700/40 text-slate-300 px-2 py-1 rounded">
                        📍 {project.location}
                      </span>
                    )}
                    {project.techStack && project.techStack.length > 0 && (
                      <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">
                        {project.techStack.length} tech
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Metadata */}
              <div className="col-span-3 flex flex-col items-end gap-3 text-right">
                <div className="text-xs text-white/50">
                  <div>{new Date(project.createdAt).toLocaleDateString()}</div>
                  {project.displayOrder !== undefined && (
                    <div className="mt-1 text-blue-300">Order: {project.displayOrder}</div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(project)}
                    className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(project.id)}
                    className="hover:bg-red-500/20"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {projects.length === 0 && !showForm && (
        <div className="text-center py-12">
          <p className="text-white/60">No projects yet. Create your first one!</p>
        </div>
      )}
    </div>
  )
}
