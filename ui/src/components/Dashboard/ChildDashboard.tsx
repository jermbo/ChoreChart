import React, { useState, useMemo } from 'react'
import { useRouter } from '@tanstack/react-router'
import { useUserContext } from '@/context/userContext'
import { ChoreCard } from './ChoreCard'
import type { Chore } from '@/types'
import { useDashboard } from '@/hooks/useDashboard'

const ChildDashboard: React.FC = () => {
  const router = useRouter()
  const { user } = useUserContext()
  const [selectedStatus, setSelectedStatus] = useState<Chore['status'] | 'all'>(
    'all',
  )

  const {
    childChores: chores,
    isLoading,
    error,
    updateStatus,
  } = useDashboard({
    user: user || undefined,
  })

  // Filter chores based on selected status
  const filteredChores = useMemo(() => {
    if (!chores) return []
    if (selectedStatus === 'all') return chores
    return chores.filter((chore) => chore.status === selectedStatus)
  }, [chores, selectedStatus])

  const handleHome = () => {
    router.navigate({ to: '/', search: { message: undefined } })
  }

  const handleStatusChange = async (
    choreId: string,
    assignmentId: string,
    newStatus: Chore['status'],
  ) => {
    try {
      await updateStatus({ choreId, assignmentId, status: newStatus })
    } catch (error) {
      console.error('Error updating chore status:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600">Loading your chores...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        Error loading chores. Please try again later.
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Chores</h1>
        <button
          onClick={handleHome}
          className="px-4 py-2 bg-gradient-to-r from-pastel-blue-500 to-pastel-pink-400 text-white rounded-md hover:from-pastel-blue-600 hover:to-pastel-pink-500"
        >
          Home
        </button>
      </div>

      <div className="mb-6">
        <div className="flex space-x-2">
          {['all', 'pending', 'in progress', 'completed', 'verified'].map(
            (status) => (
              <button
                key={status}
                onClick={() =>
                  setSelectedStatus(status as Chore['status'] | 'all')
                }
                className={`px-4 py-2 rounded-md ${
                  selectedStatus === status
                    ? 'bg-gradient-to-r from-pastel-blue-500 to-pastel-pink-400 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ),
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredChores.map((chore) => (
          <ChoreCard
            key={chore.id}
            chore={chore}
            onStatusChange={handleStatusChange}
            showActions={chore.status !== 'verified'}
          />
        ))}
      </div>

      {filteredChores.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No chores found for this status.
          </p>
        </div>
      )}
    </div>
  )
}

export default ChildDashboard
