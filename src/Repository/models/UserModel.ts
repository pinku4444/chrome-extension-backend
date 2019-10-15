import UserSchema from "../schema/UserSchema";
import IUserModel from "../Imodels/IUserModel";
import * as mongoose from "mongoose";

const toConvert = {
  transform: (doc, ret) => {
    ret.id = ret.id;
    delete ret.id;
    delete ret.v;
  },
  virtuals: true
};

export const RepositorySchema1 = new UserSchema({
  collection: "User",
  toJSON: toConvert,
  toObject: toConvert
});

export const UserModel: mongoose.Model<IUserModel> = mongoose.model<IUserModel>(
  "User",
  RepositorySchema1,
  "User",
  true
);
