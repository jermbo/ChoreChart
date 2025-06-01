import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useRouter } from '@tanstack/react-router'

interface RegisterFormData {
  email: string
  password: string
  firstName: string
  lastName: string
}

const RegisterParent: React.FC = () => {
  const { registerParent, isLoading } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    registerParent(formData)
    router.navigate({
      to: '/',
      search: { message: 'Registration successful!' },
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pastel-blue-400 via-pastel-pink-300 to-pastel-pink-500">
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-pastel-blue-500 to-pastel-pink-400 bg-clip-text text-transparent">
          Register as Parent
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Create your account to get started
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue-400 focus:border-transparent outline-none transition-all"
              placeholder="Enter your first name"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue-400 focus:border-transparent outline-none transition-all"
              placeholder="Enter your last name"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue-400 focus:border-transparent outline-none transition-all"
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-pink-400 focus:border-transparent outline-none transition-all"
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pastel-blue-500 via-pastel-pink-300 to-pastel-pink-400 text-white py-2 px-4 rounded-lg font-medium hover:from-pastel-blue-600 hover:via-pastel-pink-400 hover:to-pastel-pink-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => router.navigate({ to: '/' })}
              className="text-pastel-blue-500 font-medium hover:text-pastel-blue-600 transition-colors"
              disabled={isLoading}
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterParent
