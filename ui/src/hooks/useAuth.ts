import { useMutation } from '@tanstack/react-query'
import { api } from '../services/api'
import { useUserContext } from '../context/userContext'

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
  const { setUser } = useUserContext()
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data.user)
    },
  })

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    isError: loginMutation.isError,
  }
}
