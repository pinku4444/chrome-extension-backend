"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserSchema_1 = require("../schema/UserSchema");
const mongoose = require("mongoose");
const toConvert = {
    transform: (doc, ret) => {
        ret.id = ret.id;
        delete ret.id;
        delete ret.v;
    },
    virtuals: true
};
exports.RepositorySchema1 = new UserSchema_1.default({
    collection: "User",
    toJSON: toConvert,
    toObject: toConvert
});
exports.UserModel = mongoose.model("User", exports.RepositorySchema1, "User", true);
//# sourceMappingURL=UserModel.js.map