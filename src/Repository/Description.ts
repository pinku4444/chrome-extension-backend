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
  update(id, data) {
    return this.descModel.updateOne({ list_id: id }, {
      $set: {
        //...data
        ...data
      }
    });

  }
}
