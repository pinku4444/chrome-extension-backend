"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controller_1 = require("./controller");
const Routes = express.Router();
exports.Routes = Routes;
Routes.route("/get").get(controller_1.default.get);
Routes.route("/keyword").get(controller_1.default.getKeyword);
Routes.route("/parameters").get(controller_1.default.getParameter);
Routes.route("/addFunction").post(controller_1.default.create);
//# sourceMappingURL=routes.js.map