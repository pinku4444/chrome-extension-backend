import { ParamModel } from "./models/ParamModel";

export default class Param {
  paramModel;

  constructor() {
    this.paramModel = ParamModel;
  }
  find(id) {
    return this.paramModel.find(id).lean();
  }
  create(data) {
    return this.paramModel.create(data);
  }
  update(id, data) {
    return this.paramModel.updateOne({ _id: id }, {
      $set: {
        //...data
        ...data
      }
    });

  }
  delete(id) {
    return this.paramModel.deleteMany({ desc_id: id });
  }
}
