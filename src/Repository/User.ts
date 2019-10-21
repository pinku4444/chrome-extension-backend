import { UserModel } from "./models/UserModel";

export default class User {
  userModel;

  constructor() {
    this.userModel = UserModel;
  }
  find(id) {
    return this.userModel.find(id).lean();
  }
  create(data) {
    return this.userModel.create(data);
  }
  findOne(data) {
    return this.userModel.findOne(data);
  }
  count() {
    return this.userModel.countDocuments({}, function (err, count) {
      return count;
    });
  }

}
