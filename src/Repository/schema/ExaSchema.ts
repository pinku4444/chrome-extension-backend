import * as mongoose from "mongoose";
export default class ExaSchema extends mongoose.Schema {
  constructor(options: any) {
    const baseSchema = {
      _id: String,
      desc_id: {
        required: true,
        type: String
      },

      example: {
        required: true,
        type: String
      }
    };
    super(baseSchema, options);
  }
}
