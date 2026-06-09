'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Edit2, Trash2, Save, X, Star } from 'lucide-react'
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '@/app/actions/portfolio'

interface Testimonial {
  id: string
  clientName: string
  company?: string
  quote: string
  avatarUrl?: string
  rating?: number
  featured?: boolean
  orderIndex?: number
}

export default function TestimonialManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    clientName: '',
    company: '',
    quote: '',
    avatarUrl: '',
    rating: 5,
    featured: false,
  })

  useEffect(() => {
    loadTestimonials()
  }, [])

  async function loadTestimonials() {
    try {
      setLoading(true)
      const data = await getTestimonials()
      setTestimonials(data as Testimonial[])
    } catch (error) {
      console.error('Failed to load testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    try {
      if (!formData.clientName || !formData.quote) {
        alert('Please fill in all required fields')
        return
      }

      if (editingId) {
        await updateTestimonial(editingId, formData)
      } else {
        await createTestimonial(formData as any)
      }
      resetForm()
      await loadTestimonials()
    } catch (error) {
      console.error('Failed to save testimonial:', error)
      alert('Failed to save testimonial')
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await deleteTestimonial(id)
        await loadTestimonials()
      } catch (error) {
        console.error('Failed to delete testimonial:', error)
        alert('Failed to delete testimonial')
      }
    }
  }

  function resetForm() {
    setFormData({
      clientName: '',
      company: '',
      quote: '',
      avatarUrl: '',
      rating: 5,
      featured: false,
    })
    setEditingId(null)
    setShowForm(false)
  }

  function handleEdit(testimonial: Testimonial) {
    setEditingId(testimonial.id)
    setFormData(testimonial)
    setShowForm(true)
  }

  if (loading) return <div className="text-white text-center py-8">Loading testimonials...</div>

  return (
    <div className="space-y-4">
      {!showForm && (
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
        >
          Add Testimonial
        </Button>
      )}

      {showForm && (
        <Card className="p-6 bg-[rgba(10,18,35,0.9)] border-blue-500/15">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Client Name *</label>
                <Input
                  placeholder="Client name"
                  value={formData.clientName || ''}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="bg-[rgba(20,30,50,0.8)] border-blue-500/20 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Company</label>
                <Input
                  placeholder="Company name"
                  value={formData.company || ''}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-[rgba(20,30,50,0.8)] border-blue-500/20 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">Quote *</label>
              <textarea
                placeholder="Testimonial quote"
                value={formData.quote || ''}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                className="w-full bg-[rgba(20,30,50,0.8)] border border-blue-500/20 text-white p-2 rounded"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Avatar URL</label>
                <Input
                  placeholder="https://..."
                  value={formData.avatarUrl || ''}
                  onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                  className="bg-[rgba(20,30,50,0.8)] border-blue-500/20 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Rating</label>
                <div className="flex gap-1 items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= (formData.rating || 5)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-white/30'
                        }`}
                      />
                    </button>
                  ))}
                </div>
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
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="p-4 bg-[rgba(10,18,35,0.9)] border-blue-500/15 hover:border-blue-500/30 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-white">{testimonial.clientName}</h3>
                  {testimonial.company && (
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                      {testimonial.company}
                    </span>
                  )}
                </div>
                <p className="text-sm text-white/70 italic mb-2">"{testimonial.quote}"</p>
                <div className="flex gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < (testimonial.rating || 5)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-white/30'
                        }`}
                      />
                    ))}
                  </div>
                  {testimonial.featured && (
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
                  onClick={() => handleEdit(testimonial)}
                  className="hover:bg-blue-500/20"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(testimonial.id)}
                  className="hover:bg-red-500/20"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {testimonials.length === 0 && !showForm && (
        <div className="text-center py-12">
          <p className="text-white/60">No testimonials yet. Add your first one!</p>
        </div>
      )}
    </div>
  )
}
