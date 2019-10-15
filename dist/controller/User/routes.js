"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controller_1 = require("./controller");
const authmeddleware_1 = require("./../../libs/authmeddleware");
const UserRoutes = express.Router();
exports.UserRoutes = UserRoutes;
UserRoutes.route("/post").post(authmeddleware_1.default(), controller_1.default.create);
UserRoutes.route("/signup").post(controller_1.default.signin);
UserRoutes.route("/login").post(controller_1.default.login);
//# sourceMappingURL=routes.js.map