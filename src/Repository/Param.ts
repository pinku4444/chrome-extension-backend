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
}
