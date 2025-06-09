import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Chore, ChoreAssignment } from '../types/index'
import { api } from '../services/api'

interface CreateChoreData {
  title: string
  description: string
  value: number
  dueDate: string
  childrenId: string[]
}

interface UpdateChoreData extends Partial<CreateChoreData> {
  id: string
}

const getAllChores = async (): Promise<Chore[]> => {
  const response = await api.get<{ success: boolean; data: Chore[] }>(
    `/getallchores`,
  )
  return response.success ? response.data : []
}

const createChore = async (
  data: CreateChoreData,
): Promise<{ success: boolean; data: Chore }> => {
  return await api.post<{ success: boolean; data: Chore }>('/createchore', data)
}

const updateChore = async (
  data: UpdateChoreData,
): Promise<{ success: boolean; data: Chore }> => {
  return await api.put<{ success: boolean; data: Chore }>(
    `/updatechore/${data.id}`,
    data,
  )
}

const deleteChore = async (id: string): Promise<void> => {
  return await api.delete(`/deletechore/${id}`)
}

const assignChore = async (
  choreId: string,
  childIds: string[],
): Promise<ChoreAssignment> => {
  return await api.post(`/assignchore`, { choreId, childIds })
}

export const useChore = () => {
  const queryClient = useQueryClient()

  const { data: chores, isLoading: isLoadingChores } = useQuery({
    queryKey: ['chores'],
    queryFn: async () => {
      const chores = await getAllChores()
      //store in tanstack query cache
      queryClient.setQueryData(['chores'], chores)
      return chores
    },
  })

  const createMutation = useMutation({
    mutationFn: createChore,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(['chores'], (old: Chore[] = []) => {
        return [data, ...old]
      })
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateChore,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(['chores'], (old: Chore[] = []) => {
        return old.map((chore) =>
          chore.id === data.id
            ? {
                ...chore,
                title: data.title,
                description: data.description,
                value: data.value,
                dueDate: data.dueDate,
              }
            : chore,
        )
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteChore,
    onSuccess: (_, id) => {
      queryClient.setQueryData(['chores'], (old: Chore[] = []) => {
        return old.filter((chore) => chore.id !== id)
      })
    },
  })

  const assignMutation = useMutation({
    mutationFn: ({
      choreId,
      childIds,
    }: {
      choreId: string
      childIds: string[]
    }) => assignChore(choreId, childIds),
    onSuccess: (data, { choreId }) => {
      queryClient.setQueryData(
        ['choreAssignments', choreId],
        (old: ChoreAssignment[] = []) => {
          return [...old, ...data.data]
        },
      )
    },
  })

  return {
    chores: chores || [],
    // assignments: assignmentsData || [],
    isLoading: isLoadingChores,
    createChore: createMutation.mutate,
    updateChore: updateMutation.mutate,
    deleteChore: deleteMutation.mutate,
    assignChore: assignMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    // isAssigning: assignMutation.isPending,
    // isUnassigning: unassignMutation.isPending,
    error: createMutation.error || updateMutation.error || deleteMutation.error,
    // assignMutation.error ||
    // unassignMutation.error,
  }
}
