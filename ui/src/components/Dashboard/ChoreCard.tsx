import React from 'react'
import type { Chore } from '@/types'
import { formatDate } from '@/utility/utils'

interface ChoreCardProps {
  chore: Chore & { assignmentId: string }
  onStatusChange?: (
    choreId: string,
    assignmentId: string,
    newStatus: Chore['status'],
  ) => Promise<void>
  showActions?: boolean
}

export const ChoreCard: React.FC<ChoreCardProps> = ({
  chore,
  onStatusChange,
  showActions = true,
}) => {
  const getStatusColor = (status: Chore['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'in progress':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'verified':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{chore.title}</h3>
        <span
          className={`px-2 py-1 rounded-full text-sm ${getStatusColor(chore.status)}`}
        >
          {chore.status}
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

      {showActions && chore.status !== 'verified' && (
        <div className="flex space-x-2">
          {chore.status === 'pending' && onStatusChange && (
            <button
              onClick={() =>
                onStatusChange(chore.id, chore.assignmentId, 'in progress')
              }
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Start
            </button>
          )}
          {chore.status === 'in progress' && onStatusChange && (
            <button
              onClick={() =>
                onStatusChange(chore.id, chore.assignmentId, 'completed')
              }
              className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Complete
            </button>
          )}
          {chore.status === 'completed' && onStatusChange && (
            <button
              onClick={() =>
                onStatusChange(chore.id, chore.assignmentId, 'verified')
              }
              className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            >
              Verify
            </button>
          )}
        </div>
      )}
    </div>
  )
}
