'use client'

import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Edit2, Trash2, Save, X, Upload, Image as ImageIcon } from 'lucide-react'
import { getPortfolioProjects, createPortfolioProject, updatePortfolioProject, deletePortfolioProject } from '@/app/actions/portfolio'
import Image from 'next/image'

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
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    category: '',
    imageUrl: '',
    imageAlt: '',
    link: '',
    techStack: [],
    featured: false,
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
    })
    setPreviewUrl(null)
    setEditingId(null)
    setShowForm(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
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
        <Card className="p-6 bg-[rgba(10,18,35,0.9)] border-blue-500/15">
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-300 text-sm">
              {error}
            </div>
          )}
          <div className="space-y-4">
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
              <label className="block text-sm font-medium text-white/80 mb-1">Description *</label>
              <textarea
                placeholder="Project description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-[rgba(20,30,50,0.8)] border border-blue-500/20 text-white p-2 rounded"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Category *</label>
                <Input
                  placeholder="e.g., Web Design, Development"
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="bg-[rgba(20,30,50,0.8)] border-blue-500/20 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Upload Image</label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading ? `Uploading...` : 'Choose File'}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Image Preview */}
            {(previewUrl || formData.imageUrl) && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">Image Preview</label>
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Image Alt Text</label>
                <Input
                  placeholder="Alt text for image"
                  value={formData.imageAlt || ''}
                  onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                  className="bg-[rgba(20,30,50,0.8)] border-blue-500/20 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Project Link</label>
                <Input
                  placeholder="https://..."
                  value={formData.link || ''}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="bg-[rgba(20,30,50,0.8)] border-blue-500/20 text-black"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured || false}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-white/80">Featured</span>
              </label>
            </div>

            <div className="flex gap-2 pt-4 border-t border-blue-500/10">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-500">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={resetForm} variant="outline">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="p-4 bg-[rgba(10,18,35,0.9)] border-blue-500/15 hover:border-blue-500/30 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <p className="text-sm text-white/60 mt-1 line-clamp-2">{project.description}</p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
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
