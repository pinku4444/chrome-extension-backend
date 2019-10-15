"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const routes_1 = require("./controller/SearchApi/routes");
const User_1 = require("./controller/User");
const router = express.Router();
router.use("/search", routes_1.Routes);
router.use("/User", User_1.UserRoutes);
exports.default = router;
//# sourceMappingURL=router.js.map