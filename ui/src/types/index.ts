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
