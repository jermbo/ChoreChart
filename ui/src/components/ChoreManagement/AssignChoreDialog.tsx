import React, { useState } from 'react'
import type { Chore } from '../../types/index'
import { useChild } from '../../hooks/useChild'
import { useUserContext } from '../../context/userContext'

interface AssignChoreDialogProps {
  open: boolean
  onClose: () => void
  onSave: (choreId: string, childIds: string[]) => Promise<void>
  chore?: Chore
}

export const AssignChoreDialog: React.FC<AssignChoreDialogProps> = ({
  open,
  onClose,
  onSave,
  chore,
}) => {
  const [selectedChildIds, setSelectedChildIds] = useState<string[]>([])
  const { user } = useUserContext()

  const { children } = useChild(user?.parentId || undefined)

  const handleSave = async () => {
    if (!chore || selectedChildIds.length === 0) return

    try {
      await onSave(chore.id, selectedChildIds)
      onClose()
      setSelectedChildIds([])
    } catch (error) {
      console.error('Error assigning chore:', error)
    }
  }

  const handleChildSelect = (childId: string) => {
    setSelectedChildIds((prev) => {
      if (prev.includes(childId)) {
        return prev.filter((id) => id !== childId)
      }
      return [...prev, childId]
    })
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          Assign <b>{chore?.title}</b> Chore to
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Children
            </label>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {children?.length === 0 ? (
                <div className="text-gray-500 text-sm">No children found</div>
              ) : (
                children?.map((child) => (
                  <div
                    key={child.id}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                    onClick={() => handleChildSelect(child.id)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedChildIds.includes(child.id)}
                      onChange={() => {}}
                      className="h-4 w-4 text-pastel-blue-500 focus:ring-pastel-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-900">
                      {child.firstName} {child.lastName}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={selectedChildIds.length === 0}
              className="px-4 py-2 bg-gradient-to-r from-pastel-blue-500 to-pastel-pink-400 text-white rounded-md hover:from-pastel-blue-600 hover:to-pastel-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Assign
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
