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
  data: User
  success: boolean
}

const loginUser = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/login', credentials)
  return response
}

const registerParent = async (data: RegisterData): Promise<AuthResponse> => {
  return api.post<AuthResponse>('/register', { ...data, role: 'parent' })
}

export const useAuth = () => {
  const { saveUserDetails } = useUserContext()
  const router = useRouter()

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: ({ data }) => {
      if (!data) {
        console.error('User data is missing from the response')
        return
      }
      saveUserDetails(data)

      if (data.role === 'parent') {
        router.navigate({
          to: '/parentDashboard',
          search: {
            message: 'Login successful',
          },
        })
      } else {
        router.navigate({
          to: '/childDashboard',
        })
      }
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
