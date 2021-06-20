import Datastore from 'nedb-promises'
import Ajv, { ValidateFunction } from 'ajv'
import { UserResponse, UserPayload } from '@/shared/dataStore/user'
import { DayPayload } from '@/shared/dataStore/days';

const singleDrink = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    number: {
      type: 'number'
    },
    drinkedAt: {
      type: 'number'
    }
  }
}

const daysSchema = {
  type: 'object',
  properties: {
    drinks: {
      type: 'array',
      items: singleDrink,
    },
  },
};


class DaysStore {
  schemaValidator: ValidateFunction<unknown>
  db: Datastore
  constructor() {
    const ajv = new Ajv({
      allErrors: true,
      useDefaults: true
    });

    this.schemaValidator = ajv.compile(daysSchema);
    const dbPath = `${process.cwd()}/days.db`;
    this.db = Datastore.create({
      filename: dbPath,
      timestampData: true,
    });
  }

  validate(data: any) {
    return this.schemaValidator(data);
  }

  async create(data: any): Promise<any> | undefined {
    const isValid = this.validate(data);
    if (isValid) {
      const response = await this.db.insert(data)
      return response
    }
  }

  async edit(data: any, id: string): Promise<any> | undefined {
    const isValid = this.validate(data);
    if (isValid) {
      const response = await this.db.update(
        { _id: id }, 
        { $set: data },
      )

      return response
    }
  }

  async getDays() {
    const days = await this.db.find({}).limit(99999)
    return days
  }
}

export const days = new DaysStore()