import * as express from "express";
import controller from "./controller";
const Routes = express.Router();

Routes.route("/get/:functionName").get(controller.get);
Routes.route("/keyword/:keyword").get(controller.getKeyword);
Routes.route("/parameters/:id").get(controller.getParameter);
Routes.route("/addFunction").post(controller.create);
export { Routes };
