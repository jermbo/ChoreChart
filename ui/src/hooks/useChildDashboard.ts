import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'
import type { Chore } from '@/types'

interface UseChildChoresProps {
  childId?: string
}

const getChildDashboard = async (
  childId: string | undefined,
): Promise<Chore[]> => {
  return await api.get<Chore[]>(`/childdashboard/${childId}`)
}

export const useChildDashboard = ({ childId }: UseChildChoresProps = {}) => {
  const queryClient = useQueryClient()

  const {
    data: chores,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['childChores', childId],
    queryFn: async () => {
      return await getChildDashboard(childId)
    },
    enabled: !!childId,
  })

  const updateStatus = useMutation({
    mutationFn: async ({
      choreId,
      status,
    }: {
      choreId: string
      status: Chore['status']
    }) => {
      const { data, error } = await api.put(`/updatechore/${choreId}`, {
        status,
      })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['childChores'] })
    },
  })

  return {
    chores,
    isLoading,
    error,
    updateStatus,
  }
}
