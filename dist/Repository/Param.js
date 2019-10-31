"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParamModel_1 = require("./models/ParamModel");
class Param {
    constructor() {
        this.paramModel = ParamModel_1.ParamModel;
    }
    find(id) {
        return this.paramModel.find(id).lean();
    }
    create(data) {
        return this.paramModel.create(data);
    }
    update(id, data) {
        return this.paramModel.updateOne({ _id: id }, {
            $set: Object.assign({}, data)
        });
    }
    delete(id) {
        return this.paramModel.deleteMany({ desc_id: id });
    }
}
exports.default = Param;
//# sourceMappingURL=Param.js.map