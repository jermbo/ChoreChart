import React, { useState } from 'react'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement login logic
    console.log('Login attempt with:', { email, password })
  }

  const handleRegister = () => {
    // TODO: Implement register navigation
    console.log('Navigate to register page')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pastel-blue-300 via-pastel-purple-300 to-pastel-pink-300">
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Welcome to ChoreChart
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Please login to continue
        </p>

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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-blue-400 focus:border-transparent outline-none transition-all"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pastel-blue-400 to-pastel-purple-400 text-white py-2 px-4 rounded-lg font-medium hover:from-pastel-blue-500 hover:to-pastel-purple-500 transition-all duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={handleRegister}
              className="text-pastel-blue-500 font-medium hover:text-pastel-blue-600 transition-colors"
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
