"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DescModel_1 = require("./models/DescModel");
class Description {
    constructor() {
        this.descModel = DescModel_1.DescModel;
    }
    find(id) {
        return this.descModel.find(id).lean();
    }
    create(data) {
        return this.descModel.create(data);
    }
}
exports.default = Description;
//# sourceMappingURL=Description.js.map