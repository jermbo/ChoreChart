import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'
import type { Chore, User } from '@/types'

interface UseDashboardProps {
  user?: User
}

type ParentDashboardResponse = Chore & {
  assignmentId: string
  childId: string
  childName: string
}

type childDashboardResponse = Chore & {
  assignmentId: string
}

const getChildDashboard = async (
  childId: string | undefined | null,
): Promise<childDashboardResponse[]> => {
  return await api.get<childDashboardResponse[]>(`/childdashboard/${childId}`)
}

const updateChoreStatus = async (
  choreId: string | undefined,
  assignmentId: string | undefined,
  status: Chore['status'],
): Promise<any> => {
  return api.put(`/updateChoreStatus/${choreId}`, {
    assignmentId,
    status,
  })
}

const getParentDashboard = async (
  parentId: string | undefined | null,
): Promise<ParentDashboardResponse[]> => {
  return await api.get<ParentDashboardResponse[]>(
    `/parentdashboard/${parentId}`,
  )
}

export const useDashboard = ({ user }: UseDashboardProps = {}) => {
  const queryClient = useQueryClient()

  const {
    data: parentChores,
    isLoading: isParentLoading,
    error: parentError,
  } = useQuery({
    queryKey: ['parentChores', user?.parentId],
    queryFn: async () => {
      return await getParentDashboard(user?.parentId)
    },
    enabled: !!user?.parentId,
  })

  const {
    data: childChores,
    isLoading: isChildLoading,
    error: childError,
  } = useQuery({
    queryKey: ['childChores', user?.childId],
    queryFn: async () => {
      return await getChildDashboard(user?.childId)
    },
    enabled: !!user?.childId,
  })

  const updateStatusMutation = useMutation({
    mutationFn: (variables: {
      choreId: string | undefined
      assignmentId: string
      status: Chore['status']
    }) =>
      updateChoreStatus(
        variables.choreId,
        variables.assignmentId,
        variables.status,
      ),
    onSuccess: ({ data }, { assignmentId }) => {
      // Update the cache
      queryClient.setQueryData(
        ['childChores', assignmentId],
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
    parentChores,
    childChores,
    isLoading: isChildLoading || isParentLoading,
    error: childError || parentError,
    updateStatus: updateStatusMutation.mutate,
  }
}
