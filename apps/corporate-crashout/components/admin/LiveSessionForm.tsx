'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function LiveSessionForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    date: '',
    title: '',
    description: '',
    meetingUrl: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/admin/livesessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: new Date(formData.date).toISOString(),
        }),
      })

      if (res.ok) {
        router.refresh()
        setFormData({
          date: '',
          title: '',
          description: '',
          meetingUrl: '',
        })
      }
    } catch (error) {
      console.error('Error creating live session:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Date & Time</label>
          <input
            type="datetime-local"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Meeting URL</label>
          <input
            type="url"
            value={formData.meetingUrl}
            onChange={(e) => setFormData({ ...formData, meetingUrl: e.target.value })}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            required
            placeholder="https://meet.google.com/..."
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

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Session'}
      </button>
    </form>
  )
}

