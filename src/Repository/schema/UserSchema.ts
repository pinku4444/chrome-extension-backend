import * as mongoose from "mongoose";
export default class UserSchema extends mongoose.Schema {
  constructor(options: any) {
    const baseSchema = {
      _id: String,
      email: {
        required: true,
        type: String
      },
      password: {
        required: true,
        type: String
      },
      role: {
        required: true,
        type: String
      }
    };
    super(baseSchema, options);
  }
}
