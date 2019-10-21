"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { ListModel } from "./RepositoryModel";
const ListModel_1 = require("./models/ListModel");
// import { ListModel, DescModel, ExaModel, ParamModel } from "./models";
class List {
    constructor() {
        this.listModel = ListModel_1.ListModel;
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
        });
    }
    delete(id) {
        console.log(" delete terminal here");
        return this.listModel.deleteOne({ _id: id });
    }
}
exports.default = List;
//# sourceMappingURL=List.js.map