import { useMutation } from '@tanstack/react-query'
import { api } from '../services/api'

interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
  }
}

const loginUser = async (
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  return api.post<LoginResponse>('/login', credentials)
}

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Store the token in localStorage or your preferred storage
      localStorage.setItem('token', data.token)
      // You can also store user data if needed
      localStorage.setItem('user', JSON.stringify(data.user))
    },
  })

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    isError: loginMutation.isError,
  }
}
