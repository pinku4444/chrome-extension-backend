"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParamSchema_1 = require("../schema/ParamSchema");
const mongoose = require("mongoose");
const toConvert = {
    transform: (doc, ret) => {
        ret.id = ret.id;
        delete ret.id;
        delete ret.v;
    },
    virtuals: true
};
exports.RepositorySchema1 = new ParamSchema_1.default({
    collection: "Param",
    toJSON: toConvert,
    toObject: toConvert
});
exports.ParamModel = mongoose.model("Param", exports.RepositorySchema1, "Param", true);
//# sourceMappingURL=ParamModel.js.map