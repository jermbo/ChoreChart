export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'PARENT' | 'CHILD'
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
  status: 'pending' | 'in_progress' | 'completed' | 'verified'
  created_at: string
  updated_at: string
}

export interface ChoreAssignment {
  id: string
  chore_id: string
  child_id: string
  created_at: string
  updated_at: string
  chore?: Chore
  child?: {
    id: string
    user_id: string
    parent_id: string
    base_allowance: number
    avatar_url: string
    created_at: string
    updated_at: string
  }
}
