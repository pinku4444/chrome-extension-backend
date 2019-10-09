"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ListSchema_1 = require("./../schema/ListSchema");
const mongoose = require("mongoose");
const toConvert = {
    transform: (doc, ret) => {
        ret.id = ret.id;
        delete ret.id;
        delete ret.v;
    },
    virtuals: true
};
exports.ListSchema1 = new ListSchema_1.default({
    collection: "FunctionList",
    toJSON: toConvert,
    toObject: toConvert
});
exports.ListModel = mongoose.model("FunctionList", exports.ListSchema1, "FunctionLists", true);
//# sourceMappingURL=ListModel.js.map