import React from 'react'
import { useRouter } from '@tanstack/react-router'

const Parent: React.FC = () => {
  const router = useRouter()

  const handleChildManagement = () => {
    router.navigate({ to: '/childManagement' })
  }

  const handleHome = () => {
    router.navigate({ to: '/' })
  }

  const handleChoreManagement = () => {
    router.navigate({ to: '/choreManagement' })
  }

  return (
    <div>
      <h1>Parent</h1>
      <div className="flex gap-2">
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={handleHome}
        >
          Home
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={handleChildManagement}
        >
          Child Management
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={handleChoreManagement}
        >
          Chore Management
        </button>
      </div>
    </div>
  )
}

export default Parent
