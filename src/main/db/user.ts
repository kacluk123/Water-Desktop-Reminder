import Datastore from 'nedb-promises'
import Ajv, { ValidateFunction } from 'ajv'
import { UserResponse, UserPayload } from '@/shared/dataStore/user'

const userSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    weight: {
      type: 'number',
    }
  },
};


class UserStore {
  schemaValidator: ValidateFunction<unknown>
  db: Datastore
  constructor() {
    const ajv = new Ajv({
      allErrors: true,
      useDefaults: true
    });

    this.schemaValidator = ajv.compile(userSchema);
    const dbPath = `${process.cwd()}/user.db`;
    this.db = Datastore.create({
      filename: dbPath,
      timestampData: true,
    });
  }

  validate(data: any) {
      return this.schemaValidator(data);
  }

  create(data: any): Promise<UserResponse> | undefined {
    const isValid = this.validate(data);
    if (isValid) {
      return this.db.insert(data);
    }
  }

  async getUser() {
    const user = await this.db.find({}).limit(99999)
    return user[0]
  }

  editUser(id: string, data: any) {
    return this.db.update(
      { _id: id }, 
      { $set: data },
    )
  }
}

export const user = new UserStore()