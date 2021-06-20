import { DayResponse } from "@/shared/dataStore/days"
import create from "zustand"
import daysFetchers from "@/renderer/RemoteData/days"
import { DateTime } from "luxon";

export interface IStore {
  days: DayResponse[]
  fetch: () => Promise<void>
  addDay: (day: DayResponse) => void
  replaceDay: (day: DayResponse, id: string) => void
}

export const useDaysStore = create<IStore>(set => ({
  days: [],
  fetch: async () => {
    const response = await daysFetchers.getAll()
    set({ days: response })
  },
  addDay: (day: DayResponse) => {
    set((state) => {
      return {
        days: [day, ...state.days]
      }
    })
  },
  replaceDay: (editedDay: DayResponse, id: string) => {
    set((state) => {
      return {
        days: state.days.map(day => day._id === id ? editedDay: day)
      }
    })
  }
}))