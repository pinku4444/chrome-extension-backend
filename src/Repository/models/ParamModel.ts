import ParamSchema from "../schema/ParamSchema";
import IParamModel from "../Imodels/IParamModel";
import * as mongoose from "mongoose";

const toConvert = {
  transform: (doc, ret) => {
    ret.id = ret.id;
    delete ret.id;
    delete ret.v;
  },
  virtuals: true
};

export const RepositorySchema1 = new ParamSchema({
  collection: "Param",
  toJSON: toConvert,
  toObject: toConvert
});

export const ParamModel: mongoose.Model<IParamModel> = mongoose.model<
  IParamModel
>("Param", RepositorySchema1, "Param", true);
