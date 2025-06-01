import React, { useState } from 'react'
import { useChild } from '../../hooks/useChild'
import type { Child } from '../../types'
import { useUserContext } from '../../context/userContext'
import { ChildDialog } from './ChildDialog'

export const ChildManagement: React.FC = () => {
  const { user } = useUserContext()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingChild, setEditingChild] = useState<Child | null>(null)
  const {
    children = [],
    isLoading,
    createChild,
    updateChild,
    deleteChild,
    isCreating,
    isUpdating,
    isDeleting,
    error,
  } = useChild(user?.parentId || undefined)

  console.log(children)
  const handleCreateChild = (
    data: Omit<Child, 'id' | 'createdAt' | 'updatedAt' | 'parentId'>,
  ) => {
    if (!user?.parentId) return
    createChild({ ...data, parentId: user.parentId })
    setIsDialogOpen(false)
  }

  const handleUpdateChild = (
    data: Omit<Child, 'id' | 'createdAt' | 'updatedAt' | 'parentId'>,
  ) => {
    if (editingChild) {
      updateChild({ ...data, id: editingChild.id })
      setEditingChild(null)
      setIsDialogOpen(false)
    }
  }

  const handleDeleteChild = (id: string) => {
    if (window.confirm('Are you sure you want to delete this child?')) {
      deleteChild(id)
    }
  }

  const handleOpenAddDialog = () => {
    setEditingChild(null)
    setIsDialogOpen(true)
  }

  const handleOpenEditDialog = (child: Child) => {
    setEditingChild(child)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingChild(null)
  }

  if (isLoading) {
    return <div>Loading children...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Child Management</h2>
        <button
          onClick={handleOpenAddDialog}
          className="px-4 py-2 bg-gradient-to-r from-pastel-blue-500 to-pastel-pink-400 text-white rounded-md hover:from-pastel-blue-600 hover:to-pastel-pink-500"
        >
          Add Child
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error instanceof Error ? error.message : 'An error occurred'}
        </div>
      )}

      <ChildDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={editingChild ? handleUpdateChild : handleCreateChild}
        initialData={editingChild || undefined}
        isLoading={isCreating || isUpdating}
        mode={editingChild ? 'edit' : 'add'}
      />

      <div className="space-y-4">
        {Array.isArray(children) &&
          children.map((child) => (
            <div
              key={child.id}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">
                    {child.firstName} {child.lastName}
                  </h3>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleOpenEditDialog(child)}
                    className="text-pastel-blue-500 hover:text-pastel-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteChild(child.id)}
                    className="text-red-500 hover:text-red-600"
                    disabled={isDeleting}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
