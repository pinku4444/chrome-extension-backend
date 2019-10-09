import { DescModel } from "./models/DescModel";
export default class Description {
  descModel;

  constructor() {
    this.descModel = DescModel;
  }
  find(id) {
    return this.descModel.find(id).lean();
  }
  create(data) {
    return this.descModel.create(data);
  }
}
