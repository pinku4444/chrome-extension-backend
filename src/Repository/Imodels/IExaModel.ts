import * as mongoose from "mongoose";
export default interface IExaModel extends mongoose.Document {
  id: string;
  desc_id: string;
  example: string;
  output: string;
}
