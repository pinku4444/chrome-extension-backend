import * as mongoose from "mongoose";
export default class ParamSchema extends mongoose.Schema {
  constructor(options: any) {
    const baseSchema = {
      _id: String,
      desc_id: {
        required: true,
        type: String
      },
      argument: {
        required: true,
        type: String
      },
      description: {
        required: true,
        type: String
      }
    };
    super(baseSchema, options);
  }
}
