import React, { useState } from 'react'
import { ChoreDialog } from './ChoreDialog'
import type { Chore } from '../../types/index'
import { useChore } from '@/hooks/useChore'

export const ChoreManagement: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedChore, setSelectedChore] = useState<Chore | undefined>()
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [selectedChoreForAssignment, setSelectedChoreForAssignment] = useState<
    Chore | undefined
  >()
  const [selectedChildId, setSelectedChildId] = useState<string>('')

  const {
    chores,
    assignments,
    isLoading,
    error,
    createChore,
    updateChore,
    deleteChore,
    assignChore,
    unassignChore,
    updateChoreStatus,
  } = useChore()

  const handleAddChore = () => {
    setSelectedChore(undefined)
    setIsDialogOpen(true)
  }

  const handleEditChore = (chore: Chore) => {
    setSelectedChore(chore)
    setIsDialogOpen(true)
  }

  const handleDeleteChore = async (choreId: string) => {
    if (window.confirm('Are you sure you want to delete this chore?')) {
      try {
        await deleteChore(choreId)
      } catch (error) {
        console.error('Error deleting chore:', error)
      }
    }
  }

  const handleSaveChore = async (
    choreData: Omit<Chore, 'id' | 'created_at' | 'updated_at' | 'status'>,
  ) => {
    try {
      if (selectedChore) {
        await updateChore({
          id: selectedChore.id,
          title: choreData.title,
          description: choreData.description,
          value: choreData.value,
          dueDate: choreData.due_date,
          childrenId: [], // TODO: Add support for multiple children
        })
      } else {
        await createChore({
          title: choreData.title,
          description: choreData.description,
          value: choreData.value,
          dueDate: choreData.due_date,
          childrenId: [], // TODO: Add support for multiple children
        })
      }
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Error saving chore:', error)
    }
  }

  const handleAssignChore = async (chore: Chore) => {
    setSelectedChoreForAssignment(chore)
    setIsAssignDialogOpen(true)
  }

  const handleSaveAssignment = async () => {
    if (!selectedChoreForAssignment || !selectedChildId) return

    try {
      await assignChore({
        choreId: selectedChoreForAssignment.id,
        childId: selectedChildId,
      })
      setIsAssignDialogOpen(false)
      setSelectedChoreForAssignment(undefined)
      setSelectedChildId('')
    } catch (error) {
      console.error('Error assigning chore:', error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-600">Loading chores...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Chore Management</h2>
        <button
          onClick={handleAddChore}
          className="px-4 py-2 bg-gradient-to-r from-pastel-blue-500 to-pastel-pink-400 text-white rounded-md hover:from-pastel-blue-600 hover:to-pastel-pink-500"
        >
          Add Chore
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error.message}
        </div>
      )}

      <div className="space-y-4">
        {chores.map((chore) => (
          <div
            key={chore.id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900">
                  {chore.title}
                </h3>
                <p className="text-gray-600">{chore.description}</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    ${chore.value}
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                    {formatDate(chore.dueDate)}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditChore(chore)}
                  className="text-pastel-blue-500 hover:text-pastel-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteChore(chore.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleAssignChore(chore)}
                  className="text-green-500 hover:text-green-600"
                >
                  Assign
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ChoreDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveChore}
        chore={selectedChore}
      />

      {isAssignDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Assign Chore</h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="child-select"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Child
                </label>
                <select
                  id="child-select"
                  value={selectedChildId}
                  onChange={(e) => setSelectedChildId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-blue-500"
                >
                  <option value="">Select a child...</option>
                  {/* TODO: Add child options here */}
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsAssignDialogOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAssignment}
                  disabled={!selectedChildId}
                  className="px-4 py-2 bg-gradient-to-r from-pastel-blue-500 to-pastel-pink-400 text-white rounded-md hover:from-pastel-blue-600 hover:to-pastel-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Assign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
