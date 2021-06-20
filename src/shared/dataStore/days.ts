export interface IDrink {
  name: string
  number: number
  drinkedAt: Date
}

export interface DayPayload {
  days: IDrink[]
}

export interface DayResponse {
  _id: string
  days: IDrink[]
  createdAt: Date
}

export interface IDaysCrud {
  createDay: (payload: DayPayload) => Promise<DayResponse>
  getDays: () => Promise<DayResponse[]>
  updateDay: (id: string, payload: DayPayload) => Promise<DayResponse>
}