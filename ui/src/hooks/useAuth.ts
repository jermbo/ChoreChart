import { useMutation } from '@tanstack/react-query'
import { api } from '../services/api'
import { useUserContext } from '../context/userContext'
import type { User } from '../types'
import { useRouter } from '@tanstack/react-router'

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
  data: {
    message: string
    user: User
  }
  success: boolean
}

const loginUser = async (
  credentials: LoginCredentials,
): Promise<AuthResponse['data']> => {
  const response = await api.post<AuthResponse>('/login', credentials)
  return response.data
}

const registerParent = async (data: RegisterData): Promise<AuthResponse> => {
  return api.post<AuthResponse>('/register', {
    ...data,
    role: 'PARENT',
  })
}

export const useAuth = () => {
  const { saveUserDetails } = useUserContext()
  const router = useRouter()

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (!data || !data.user) {
        console.error('User data is missing from the response')
        return
      }
      saveUserDetails(data.user)
      router.navigate({
        to: '/parentDashboard',
        search: { message: undefined },
      })
    },
    onError: (error) => {
      console.error('Login error:', error)
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
