"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const routes_1 = require("./controller/routes");
// import { userRouter } from "./controllers";
const router = express.Router();
router.use("/search", routes_1.Routes);
exports.default = router;
//# sourceMappingURL=router.js.map