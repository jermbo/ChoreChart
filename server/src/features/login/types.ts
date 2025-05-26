export type UserResponse = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  parentId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthResponse = {
  message: string;
  user: UserResponse;
  token: string;
};
