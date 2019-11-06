"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controller_1 = require("./controller");
const authmeddleware_1 = require("./../../libs/authmeddleware");
const UserRoutes = express.Router();
exports.UserRoutes = UserRoutes;
UserRoutes.route("/post").post(authmeddleware_1.default('getUsers', 'read'), controller_1.default.create);
UserRoutes.route("/signup").post(controller_1.default.signup);
UserRoutes.route("/login").post(controller_1.default.login);
UserRoutes.route("/getunverified").get(authmeddleware_1.default('getUsers', 'all'), controller_1.default.getZeros);
UserRoutes.route("/verified").put(controller_1.default.verified);
UserRoutes.route("/delete").delete(authmeddleware_1.default('getUsers', 'all'), controller_1.default.delete);
UserRoutes.route("/updateFunction").post(authmeddleware_1.default('getUsers', 'all'), controller_1.default.update);
UserRoutes.route("/checkFunction").get(controller_1.default.getFunction);
//# sourceMappingURL=routes.js.map