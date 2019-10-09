// import { ListModel } from "./RepositoryModel";
import { ExaModel } from "./models/ExaModel";
// import { ListModel, DescModel, ExaModel, ParamModel } from "./models";

export default class Example {
  exaModel;

  constructor() {
    this.exaModel = ExaModel;
  }
  find(id) {
    return this.exaModel.find(id).lean();
  }
  create(data) {
    return this.exaModel.create(data);
  }
}
