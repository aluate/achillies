'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function DeleteSectionButton({ sectionId }: { sectionId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this section? This will also delete all lessons in it.')) {
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/admin/sections/${sectionId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        router.refresh()
      }
    } catch (error) {
      console.error('Error deleting section:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition disabled:opacity-50"
    >
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  )
}

