export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'PARENT' | 'CHILD'
  createdAt: string
  updatedAt: string
}
