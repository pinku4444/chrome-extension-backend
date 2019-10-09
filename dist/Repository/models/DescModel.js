"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DescSchema_1 = require("../schema/DescSchema");
const mongoose = require("mongoose");
const toConvert = {
    transform: (doc, ret) => {
        ret.id = ret.id;
        delete ret.id;
        delete ret.v;
    },
    virtuals: true
};
exports.DescSchema1 = new DescSchema_1.default({
    collection: "Description",
    toJSON: toConvert,
    toObject: toConvert
});
exports.DescModel = mongoose.model("Description", exports.DescSchema1, "Descriptions", true);
//# sourceMappingURL=DescModel.js.map