import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'
import type { Child } from '../types'

interface CreateChildData {
  firstName: string
  lastName: string
  email: string
  password: string
  baseAllowance: number
  parentId: string
}

interface UpdateChildData extends Partial<CreateChildData> {
  id: string
}

const getChildren = async (
  parentId: string,
): Promise<{ success: boolean; data: Child[] }> => {
  return await api.get<{ success: boolean; data: Child[] }>(
    `/getchildrenwithdetails?parentId=${parentId}`,
  )
}

const createChild = async (
  data: CreateChildData,
): Promise<{ success: boolean; data: Child }> => {
  return await api.post<{ success: boolean; data: Child }>('/createchild', data)
}

const updateChild = async (
  data: UpdateChildData,
): Promise<{ success: boolean; data: Child }> => {
  return await api.put<{ success: boolean; data: Child }>(`/updatechild`, data)
}

const deleteChild = async (id: string): Promise<void> => {
  return await api.delete(`/deletechild/${id}`)
}

export const useChild = (parentId: string | undefined) => {
  const queryClient = useQueryClient()

  const { data: children, isLoading } = useQuery({
    queryKey: ['children', parentId],
    queryFn: async () => {
      if (!parentId) {
        throw new Error('Parent ID is required')
      }
      const result = await getChildren(parentId)
      if (result.success) {
        queryClient.setQueryData(['children', parentId], result.data)
        return result.data
      }
      throw new Error('Failed to fetch children')
    },
    enabled: !!parentId,
  })

  const createMutation = useMutation({
    mutationFn: createChild,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(['children', parentId], (old: Child[]) => {
        return [...old, data]
      })
    },
    onError: (error) => {
      console.error('Error creating child:', error)
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateChild,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(['children', parentId], (old: Child[]) => {
        return old.map((child) => {
          if (child.id != data.id) {
            return child
          }
          let updatedChildData = { ...child }
          // updatedChildData.baseAllowance = data.baseAllowance
          updatedChildData.firstName = data.firstName
          updatedChildData.lastName = data.lastName
          updatedChildData.password = data.password
          updatedChildData.email = data.email
          return updatedChildData
        })
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteChild,
    onSuccess: (_, id) => {
      queryClient.setQueryData(['children', parentId], (old: Child[]) => {
        return old.filter((child) => child.id !== id)
      })
    },
    onError: (error) => {
      console.error('Error deleting child:', error)
    },
  })

  return {
    children: children || [],
    isLoading,
    createChild: createMutation.mutate,
    updateChild: updateMutation.mutate,
    deleteChild: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    error: createMutation.error || updateMutation.error || deleteMutation.error,
  }
}
