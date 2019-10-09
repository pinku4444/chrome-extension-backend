import * as mongoose from "mongoose";
export default class ListSchema extends mongoose.Schema {
  constructor(options: any) {
    const baseSchema = {
      _id: String,
      functionName: {
        required: true,
        type: String
      },
      keyword: {
        required: true,
        type: String
      }
    };
    super(baseSchema, options);
  }
}
