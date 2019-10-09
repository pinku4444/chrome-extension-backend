import ListSchema from "./../schema/ListSchema";
import IListModel from "./../Imodels/IListModel";
import * as mongoose from "mongoose";

const toConvert = {
  transform: (doc, ret) => {
    ret.id = ret.id;
    delete ret.id;
    delete ret.v;
  },
  virtuals: true
};

export const ListSchema1 = new ListSchema({
  collection: "FunctionList",
  toJSON: toConvert,
  toObject: toConvert
});

export const ListModel: mongoose.Model<IListModel> = mongoose.model<IListModel>(
  "FunctionList",
  ListSchema1,
  "FunctionLists",
  true
);
