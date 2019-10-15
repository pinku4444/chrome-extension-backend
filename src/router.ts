import * as express from "express";
import { Routes } from "./controller/SearchApi/routes";
import { UserRoutes } from "./controller/User";

const router = express.Router();

router.use("/search", Routes);
router.use("/User", UserRoutes);

export default router;
