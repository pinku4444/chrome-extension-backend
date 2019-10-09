import ExaSchema from "../schema/ExaSchema";
import IExaModel from "./../Imodels/IExaModel";
import * as mongoose from "mongoose";

const toConvert = {
  transform: (doc, ret) => {
    ret.id = ret.id;
    delete ret.id;
    delete ret.v;
  },
  virtuals: true
};

export const ExaSchema1 = new ExaSchema({
  collection: "Example",
  toJSON: toConvert,
  toObject: toConvert
});

export const ExaModel: mongoose.Model<IExaModel> = mongoose.model<IExaModel>(
  "Example",
  ExaSchema1,
  "Examples",
  true
);
