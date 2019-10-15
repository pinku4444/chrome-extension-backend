"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = require("./models/UserModel");
class User {
    constructor() {
        this.userModel = UserModel_1.UserModel;
    }
    find(id) {
        return this.userModel.find(id).lean();
    }
    create(data) {
        return this.userModel.create(data);
    }
    findOne(data) {
        return this.userModel.findOne(data);
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map