import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useRouter, useSearch } from '@tanstack/react-router'
import StylizedHeading from '../Common/StylizedHeading'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error, isError } = useAuth()
  const router = useRouter()

  const search = useSearch({ from: '/', strict: false })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login({ email, password })
  }

  const handleRegister = () => {
    router.navigate({ to: '/register' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pastel-blue-400 via-pastel-pink-300 to-pastel-pink-500">
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <StylizedHeading text="Daily Chores" />
        <p className="text-center text-gray-600 mb-8">
          Please login to continue
        </p>

        {isError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error instanceof Error
              ? error.message
              : 'An error occurred during login'}
          </div>
        )}
        {search?.message && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {search.message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={handleRegister}
              className="text-pastel-blue-500 font-medium hover:text-pastel-blue-600 transition-colors"
              disabled={isLoading}
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
