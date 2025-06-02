import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'
import type { Chore } from '@/types'

interface UseChildChoresProps {
  childId?: string
}

type childDashboardResponse = Chore & {
  assignmentId: string
}

const getChildDashboard = async (
  childId: string | undefined,
): Promise<childDashboardResponse[]> => {
  return await api.get<childDashboardResponse[]>(`/childdashboard/${childId}`)
}

const updateChoreStatus = async (
  childId: string | undefined,
  choreId: string | undefined,
  status: Chore['status'],
): Promise<any> => {
  return api.put(`/updateChoreStatus/${choreId}`, {
    childId,
    status,
  })
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

  const updateStatusMutation = useMutation({
    mutationFn: (variables: {
      choreId: string | undefined
      status: Chore['status']
    }) => updateChoreStatus(childId, variables.choreId, variables.status),
    onSuccess: ({ data }) => {
      // Update the cache
      queryClient.setQueryData(
        ['childChores', childId],
        (oldData: childDashboardResponse[] | undefined) => {
          if (!oldData) return []
          return oldData.map((chore) =>
            chore.id === data.choreId
              ? { ...chore, status: data.status }
              : chore,
          )
        },
      )
    },
  })

  return {
    chores,
    isLoading,
    error,
    updateStatus: updateStatusMutation.mutate,
  }
}
