import * as mongoose from "mongoose";
export default class DescSchema extends mongoose.Schema {
  constructor(options: any) {
    const baseSchema = {
      _id: String,
      list_id: {
        required: true,
        type: String
      },
      definition: {
        required: true,
        type: String
      },
      syntax: {
        required: true,
        type: String
      }
    };
    super(baseSchema, options);
  }
}
