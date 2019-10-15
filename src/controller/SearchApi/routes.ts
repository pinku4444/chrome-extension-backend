import * as express from "express";
import controller from "./controller";
const Routes = express.Router();

Routes.route("/get").get(controller.get);
Routes.route("/keyword").get(controller.getKeyword);
Routes.route("/parameters").get(controller.getParameter);
Routes.route("/addFunction").post(controller.create);
export { Routes };
