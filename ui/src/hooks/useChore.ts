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

// const getAssignments = async (): Promise<{
//   assignments: ChoreAssignment[]
// }> => {
//   return api.get('/chores/assignments')
// }

const createChore = async (data: CreateChoreData): Promise<Chore> => {
  return api.post('/createchore', data)
}

const updateChore = async (data: UpdateChoreData): Promise<Chore> => {
  return api.put(`/updatechore/${data.id}`, data)
}

const deleteChore = async (id: string): Promise<void> => {
  return api.delete(`/deletechore/${id}`)
}

const assignChore = async (
  choreId: string,
  childIds: string[],
): Promise<ChoreAssignment> => {
  return api.post(`/assignchore`, { choreId, childIds })
}

const unassignChore = async (
  choreId: string,
  childId: string,
): Promise<void> => {
  return api.delete(`/chores/${choreId}/assign/${childId}`)
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

  // const { data: assignmentsData, isLoading: isLoadingAssignments } = useQuery({
  //   queryKey: ['choreAssignments'],
  //   queryFn: async () => {
  //     const result = await getAssignments()
  //     return result.assignments
  //   },
  // })

  const createMutation = useMutation({
    mutationFn: createChore,
    onSuccess: (data) => {
      queryClient.setQueryData(['chores'], (old: Chore[] = []) => {
        return [data, ...old]
      })
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateChore,
    onSuccess: (data) => {
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

  const unassignMutation = useMutation({
    mutationFn: ({ choreId, childId }: { choreId: string; childId: string }) =>
      unassignChore(choreId, childId),
    onSuccess: (_, { choreId, childId }) => {
      queryClient.setQueryData(
        ['choreAssignments'],
        (old: ChoreAssignment[] = []) => {
          return old.filter(
            (assignment) =>
              !(
                assignment.chore_id === choreId &&
                assignment.child_id === childId
              ),
          )
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
    unassignChore: unassignMutation.mutate,
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
