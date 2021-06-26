import Datastore from 'nedb-promises'
import Ajv, { ValidateFunction } from 'ajv'
import { UserResponse, UserPayload } from '@/shared/dataStore/user'
import { DayPayload } from '@/shared/dataStore/days';

const notificationSchema = {
  type: 'object',
  properties: {
    time: {
      type: 'number'
    },
    amount: {
      type: 'number'
    },
    active: {
      type: 'boolean'
    }
  }
}



class NotificationsStore {
  schemaValidator: ValidateFunction<unknown>
  db: Datastore
  constructor() {
    const ajv = new Ajv({
      allErrors: true,
      useDefaults: true
    });

    this.schemaValidator = ajv.compile(notificationSchema);
    const dbPath = `${process.cwd()}/notifications.db`;
    this.db = Datastore.create({
      filename: dbPath,
      timestampData: true,
    });
  }

  validate(data: any) {
    return this.schemaValidator(data);
  }

  async create(data: any) {
    const isValid = this.validate(data);
    if (isValid) {
      const response = await this.db.insert(data)
      return response
    }
  }

  async getNotification() {
    const notifications = await this.db.find({}).limit(99999)
    return notifications[0]
  }

  async edit(data: any, id: string) {
    const isValid = this.validate(data);
    if (isValid) {
      const response = await this.db.update(
        { _id: id }, 
        { $set: data },
      )

      return response
    }
  }
}

export const notifications = new NotificationsStore()