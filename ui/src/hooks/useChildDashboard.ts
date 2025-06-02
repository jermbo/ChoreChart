import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'
import type { Chore } from '@/types'

interface UseChildChoresProps {
  childId?: string
  status?: Chore['status']
}

export const useChildDashboard = ({
  childId,
  status,
}: UseChildChoresProps = {}) => {
  const queryClient = useQueryClient()

  const {
    data: chores,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['childChores', childId, status],
    queryFn: async () => {
      const { data, error } = await api.get(
        `/chores/child/${childId}${status ? `?status=${status}` : ''}`,
      )
      if (error) throw error
      return data as Chore[]
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
      const { data, error } = await api.patch(`/chores/${choreId}/status`, {
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
