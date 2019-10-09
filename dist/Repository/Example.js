"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { ListModel } from "./RepositoryModel";
const ExaModel_1 = require("./models/ExaModel");
// import { ListModel, DescModel, ExaModel, ParamModel } from "./models";
class Example {
    constructor() {
        this.exaModel = ExaModel_1.ExaModel;
    }
    find(id) {
        return this.exaModel.find(id).lean();
    }
    create(data) {
        return this.exaModel.create(data);
    }
}
exports.default = Example;
//# sourceMappingURL=Example.js.map