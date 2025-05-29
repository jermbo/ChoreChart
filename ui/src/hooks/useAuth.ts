import { useMutation } from '@tanstack/react-query'
import { api } from '../services/api'
import { useUserContext } from '../context/userContext'
import type { User } from '../types'

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
}

interface AuthResponse {
  token: string
  user: User
}

const loginUser = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  return api.post<AuthResponse>('/login', credentials)
}

const registerParent = async (data: RegisterData): Promise<AuthResponse> => {
  return api.post<AuthResponse>('/register', {
    ...data,
    role: 'PARENT',
  })
}

export const useAuth = () => {
  const { setUser } = useUserContext()

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data.user)
    },
  })

  const registerMutation = useMutation({
    mutationFn: registerParent,
  })

  return {
    login: loginMutation.mutate,
    registerParent: registerMutation.mutate,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    error: loginMutation.error || registerMutation.error,
    isError: loginMutation.isError || registerMutation.isError,
  }
}
