import React, { useState, useEffect } from 'react'
import type { Child } from '../../types'

interface ChildFormProps {
  onSubmit: (
    data: Omit<Child, 'id' | 'createdAt' | 'updatedAt' | 'parentId'>,
  ) => void
  initialData?: Partial<Child>
  isLoading?: boolean
  submitLabel?: string
}

export const ChildForm: React.FC<ChildFormProps> = ({
  onSubmit,
  initialData,
  isLoading,
  submitLabel = 'Add Child',
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    baseAllowance: 0,
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        email: initialData.email || '',
        password: initialData.password || '',
        baseAllowance: initialData.baseAllowance || 0,
      })
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pastel-blue-500 focus:ring-pastel-blue-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pastel-blue-500 focus:ring-pastel-blue-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pastel-blue-500 focus:ring-pastel-blue-500"
          required
        />{' '}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pastel-blue-500 focus:ring-pastel-blue-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="baseAllowance"
          className="block text-sm font-medium text-gray-700"
        >
          Base Allowance
        </label>
        <input
          type="number"
          id="baseAllowance"
          name="baseAllowance"
          value={formData.baseAllowance}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pastel-blue-500 focus:ring-pastel-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-pastel-blue-500 to-pastel-pink-400 hover:from-pastel-blue-600 hover:to-pastel-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pastel-blue-500 disabled:opacity-50"
      >
        {isLoading ? 'Saving...' : submitLabel}
      </button>
    </form>
  )
}
