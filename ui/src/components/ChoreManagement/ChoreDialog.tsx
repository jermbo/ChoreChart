import React, { useState, useEffect } from 'react'
import type { Chore } from '../../types/index'

interface ChoreDialogProps {
  open: boolean
  onClose: () => void
  onSave: (
    chore: Omit<Chore, 'id' | 'created_at' | 'updated_at' | 'status'>,
  ) => Promise<void>
  chore?: Chore
}

export const ChoreDialog: React.FC<ChoreDialogProps> = ({
  open,
  onClose,
  onSave,
  chore,
}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (chore) {
      setTitle(chore.title)
      setDescription(chore.description)
      setValue(chore.value.toString())
      setDueDate(new Date(chore.dueDate).toISOString().split('T')[0])
    } else {
      setTitle('')
      setDescription('')
      setValue('')
      setDueDate('')
    }
  }, [chore])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description || !value || !dueDate) return
    await onSave({
      title,
      description,
      value: parseFloat(value),
      dueDate: new Date(dueDate).toISOString(),
    })
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {chore ? 'Edit Chore' : 'Add New Chore'}
          </h2>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)
                }
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="value"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Value
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  id="value"
                  type="number"
                  value={value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setValue(e.target.value)
                  }
                  required
                  min="0"
                  step="0.01"
                  className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-blue-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Due Date
              </label>
              <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDueDate(e.target.value)
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                isSubmitting || !title || !description || !value || !dueDate
              }
              className="px-4 py-2 bg-gradient-to-r from-pastel-blue-500 to-pastel-pink-400 text-white rounded-md hover:from-pastel-blue-600 hover:to-pastel-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
