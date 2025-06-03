export type status = 'pending' | 'in progress' | 'completed' | 'verified'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'parent' | 'child'
  parentId: string | null
  childId: string | null
  createdAt: string
  updatedAt: string
}

export interface Child {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  baseAllowance: number
  parentId: string
  createdAt: string
  updatedAt: string
}

export interface Chore {
  id: string
  title: string
  description: string
  value: number
  dueDate: string
  status: status
  createdAt: string
  updatedAt: string
  verifiedAt: string
  comment: string
}

export interface ChoreAssignment {
  id: string
  choreId: string
  childId: string
  createdAt: string
  updatedAt: string
  chore?: Chore
  child?: {
    id: string
    userId: string
    parentId: string
    baseAllowance: number
    avatarUrl: string
    createdAt: string
    updatedAt: string
  }
}
