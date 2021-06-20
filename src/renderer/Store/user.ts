import { UserResponse } from "@/shared/dataStore/user"
import create from "zustand"
import userFetchers, { User } from "@/renderer/RemoteData/user"

export interface IStore {
  user: User | null
  fetch: () => Promise<void>
  setUserData: (response: User) => void
}

export const useUserStore = create<IStore>(set => ({
  user: null,
  setUserData: (response: User) => {
    set({ user: response })
  },
  fetch: async () => {
    const response = await userFetchers.get()
    set({ user: response })
  }
}))