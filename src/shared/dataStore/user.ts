export interface UserResponse {
  id: string
  weight: number
  name: string
  createdAt: Date
}

export interface UserPayload {
  weight: number
  name: string
}

export interface IUserCrud {
  createUser: (payload: UserPayload) => Promise<UserResponse>
  getUser: () => Promise<UserResponse>
  updateUser: (id: string, payload: UserPayload) => Promise<UserResponse>
}