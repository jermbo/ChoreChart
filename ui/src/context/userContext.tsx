import React, { createContext, useContext, useState } from 'react'
import type { User } from '../types'

interface UserContextType {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  saveUserDetails: (user: User) => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

// 3. Create provider component (✅ this is a valid JSX component now)
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const saveUserDetails = (user: User) => {
    setUser(user)
  }

  return (
    <UserContext.Provider value={{ user, setUser, saveUserDetails }}>
      {children}
    </UserContext.Provider>
  )
}

// 4. Custom hook for convenience (optional)
export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
