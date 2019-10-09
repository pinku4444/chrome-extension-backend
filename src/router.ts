import * as express from "express";
import { Routes } from "./controller/routes";
// import { userRouter } from "./controllers";

const router = express.Router();

router.use("/search", Routes);

export default router;
