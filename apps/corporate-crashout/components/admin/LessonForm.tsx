'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Section } from '@prisma/client'

export function LessonForm({ sections }: { sections: Section[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    sectionId: sections[0]?.id || '',
    title: '',
    description: '',
    googleDriveUrl: '',
    orderIndex: 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/admin/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        router.refresh()
        setFormData({
          sectionId: sections[0]?.id || '',
          title: '',
          description: '',
          googleDriveUrl: '',
          orderIndex: 0,
        })
      }
    } catch (error) {
      console.error('Error creating lesson:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Section</label>
          <select
            value={formData.sectionId}
            onChange={(e) => setFormData({ ...formData, sectionId: e.target.value })}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            required
          >
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Order</label>
          <input
            type="number"
            value={formData.orderIndex}
            onChange={(e) => setFormData({ ...formData, orderIndex: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Google Drive URL</label>
        <input
          type="url"
          value={formData.googleDriveUrl}
          onChange={(e) => setFormData({ ...formData, googleDriveUrl: e.target.value })}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
          required
          placeholder="https://drive.google.com/..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Lesson'}
      </button>
    </form>
  )
}

