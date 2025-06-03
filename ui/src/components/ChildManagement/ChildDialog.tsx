import React from 'react'
import { ChildForm } from './ChildForm'
import type { Child } from '../../types'

type CreateChildData = Omit<
  Child,
  'id' | 'createdAt' | 'updatedAt' | 'parentId'
>
type UpdateChildData = Omit<Child, 'id' | 'createdAt' | 'updatedAt'>

interface ChildDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CreateChildData | UpdateChildData) => void
  initialData?: Child
  isLoading: boolean
  mode: 'add' | 'edit'
}

export const ChildDialog: React.FC<ChildDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
  mode,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">
            {mode === 'add' ? 'Add New Child' : 'Edit Child'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <ChildForm
          onSubmit={onSubmit}
          initialData={initialData}
          isLoading={isLoading}
          submitLabel={mode === 'add' ? 'Add Child' : 'Update Child'}
        />
      </div>
    </div>
  )
}
