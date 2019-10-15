import * as express from "express";
import controller from "./controller";
import authmeddleware from "./../../libs/authmeddleware";
const UserRoutes = express.Router();

UserRoutes.route("/post").post(authmeddleware(), controller.create);
UserRoutes.route("/signup").post(controller.signin);
UserRoutes.route("/login").post(controller.login);

export { UserRoutes };
