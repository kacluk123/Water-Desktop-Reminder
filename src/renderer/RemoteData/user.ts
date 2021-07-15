import { IUserCrud, UserPayload, UserResponse } from '@/shared/dataStore/user'

declare const window: {
  user: IUserCrud
};

class UserFetchers {
  constructor(private readonly fetchers: IUserCrud) {}
  
  get = async () => {
    const user = await this.fetchers.getUser()
    return new User(user)
  }

  edit = async (id: string, payload: UserPayload) => {
    return this.fetchers.updateUser(id, payload)
  }

  create = async (payload: UserPayload) => {
    const user = await this.fetchers.createUser(payload)
    return new User(user)
  }
}

export class User {
  readonly weight: number
  readonly name: string 
  readonly id: string
  readonly createdAt: Date

  constructor(payload: UserResponse) {
    this.weight = payload.weight
    this.name = payload.name
    this.id = payload._id
    this.createdAt = payload.createdAt
  }

  get neededWater() {
    return this.weight * 35
  }
}

const userFetchers = new UserFetchers(window.user)

export default userFetchers