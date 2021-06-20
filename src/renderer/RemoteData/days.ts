import { IDaysCrud } from '@/shared/dataStore/days';
import { DayResponse, DayPayload } from '@/shared/dataStore/days'

declare const window: {
  days: IDaysCrud
};

class DaysFetchers {
  constructor(private readonly fetchers: IDaysCrud) {}
  
  getAll = async () => {
    return this.fetchers.getDays()
  }

  edit = async (id: string, payload: DayPayload) => {
    return this.fetchers.updateDay(id, payload)
  }

  create = async (payload: DayPayload) => {
    return this.fetchers.createDay(payload)
  }
}

const daysFetchers = new DaysFetchers(window.days)

export default daysFetchers