import DescSchema from "../schema/DescSchema";
import IDescModel from "../Imodels/IDescModel";
import * as mongoose from "mongoose";

const toConvert = {
  transform: (doc, ret) => {
    ret.id = ret.id;
    delete ret.id;
    delete ret.v;
  },
  virtuals: true
};

export const DescSchema1 = new DescSchema({
  collection: "Description",
  toJSON: toConvert,
  toObject: toConvert
});

export const DescModel: mongoose.Model<IDescModel> = mongoose.model<IDescModel>(
  "Description",
  DescSchema1,
  "Descriptions",
  true
);
