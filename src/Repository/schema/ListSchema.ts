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
        type: Array
      },
      user: {
        required: true,
        type: String
      },
      type: {
        required: true,
        type: String,
      },
      isVerified: {
        required: true,
        type: Number,
      }
    };
    super(baseSchema, options);
  }
}
