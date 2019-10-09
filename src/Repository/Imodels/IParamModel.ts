import * as mongoose from "mongoose";
export default interface IParamModel extends mongoose.Document {
  id: string;
  desc_id: string;
  param: string;
  desc: string;
}
