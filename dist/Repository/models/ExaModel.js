"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExaSchema_1 = require("../schema/ExaSchema");
const mongoose = require("mongoose");
const toConvert = {
    transform: (doc, ret) => {
        ret.id = ret.id;
        delete ret.id;
        delete ret.v;
    },
    virtuals: true
};
exports.ExaSchema1 = new ExaSchema_1.default({
    collection: "Example",
    toJSON: toConvert,
    toObject: toConvert
});
exports.ExaModel = mongoose.model("Example", exports.ExaSchema1, "Examples", true);
//# sourceMappingURL=ExaModel.js.map