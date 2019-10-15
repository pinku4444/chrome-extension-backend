import * as mongoose from "mongoose";
export default interface IListModel extends mongoose.Document {
  id: string;
  function_name: string;
  keyword: [string];
  user: string;
}
