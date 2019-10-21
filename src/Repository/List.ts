// import { ListModel } from "./RepositoryModel";
import { ListModel } from "./models/ListModel";
// import { ListModel, DescModel, ExaModel, ParamModel } from "./models";

export default class List {
  listModel;

  constructor() {
    this.listModel = ListModel;
  }
  find(functionName) {
    return this.listModel.find(functionName).lean();
  }
  create(data) {
    return this.listModel.create(data);
  }
  update(id, data) {
    return this.listModel.updateOne({ _id: id }, {
      $set: {
        isVerified: data
      }
    })
  }
  delete(id) {
    console.log(" delete terminal here");
    return this.listModel.deleteOne({ _id: id })
  }
}
