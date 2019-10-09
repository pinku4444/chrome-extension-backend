import * as mongoose from "mongoose";
export default interface IDescModel extends mongoose.Document {
  id: string;
  list_id: string;
  definition: string;
  syntax: string;
}
