import * as express from "express";
import controller from "./controller";
const Routes = express.Router();


Routes.route("/keyword").get(controller.getKeyword);
Routes.route("/parameters").get(controller.getParameter);

export { Routes };
