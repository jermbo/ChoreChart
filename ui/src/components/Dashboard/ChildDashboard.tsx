import React, { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { useUserContext } from '@/context/userContext'
import { useChildDashboard } from '@/hooks/useChildDashboard'
import type { Chore } from '@/types'
import { formatDate } from '@/utility/utils'

const ChildDashboard: React.FC = () => {
  const router = useRouter()
  const { user } = useUserContext()
  const [selectedStatus, setSelectedStatus] = useState<Chore['status'] | 'all'>(
    'all',
  )

  const { chores, isLoading, error, updateStatus } = useChildDashboard({
    childId: user?.childId || undefined,
  })

  const handleHome = () => {
    router.navigate({ to: '/' })
  }

  const handleStatusChange = async (
    choreId: string,
    newStatus: Chore['status'],
  ) => {
    try {
      await updateStatus.mutateAsync({ choreId, status: newStatus })
    } catch (error) {
      console.error('Error updating chore status:', error)
    }
  }

  const getStatusColor = (status: Chore['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'verified':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
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
          {['all', 'pending', 'in_progress', 'completed', 'verified'].map(
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
                {status.charAt(0).toUpperCase() +
                  status.slice(1).replace('_', ' ')}
              </button>
            ),
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {chores?.map((chore) => (
          <div
            key={chore.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {chore.title}
              </h3>
              <span
                className={`px-2 py-1 rounded-full text-sm ${getStatusColor(chore.status)}`}
              >
                {chore.status?.replace('_', ' ')}
              </span>
            </div>

            <p className="text-gray-600 mb-4">{chore.description}</p>

            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-green-600">
                ${chore.value}
              </span>
              <span className="text-sm text-gray-500">
                Due: {formatDate(chore.dueDate)}
              </span>
            </div>

            {chore.status !== 'verified' && (
              <div className="flex space-x-2">
                {chore.status === 'pending' && (
                  <button
                    onClick={() => handleStatusChange(chore.id, 'in_progress')}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Start
                  </button>
                )}
                {chore.status === 'in_progress' && (
                  <button
                    onClick={() => handleStatusChange(chore.id, 'completed')}
                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Complete
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {chores?.length === 0 && (
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
