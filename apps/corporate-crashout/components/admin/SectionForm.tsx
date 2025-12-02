'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function SectionForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    orderIndex: 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/admin/sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        router.refresh()
        setFormData({ title: '', orderIndex: 0 })
      }
    } catch (error) {
      console.error('Error creating section:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        type="text"
        placeholder="Section Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
        required
      />
      <input
        type="number"
        placeholder="Order"
        value={formData.orderIndex}
        onChange={(e) => setFormData({ ...formData, orderIndex: parseInt(e.target.value) || 0 })}
        className="w-24 px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Section'}
      </button>
    </form>
  )
}

