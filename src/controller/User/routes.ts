import * as express from "express";
import controller from "./controller";
import authmeddleware from "./../../libs/authmeddleware";
const UserRoutes = express.Router();

UserRoutes.route("/post").post(authmeddleware('getUsers', 'read'), controller.create);
UserRoutes.route("/signup").post(controller.signup);
UserRoutes.route("/login").post(controller.login);
UserRoutes.route("/getunverified").get(authmeddleware('getUsers', 'all'), controller.getZeros);
UserRoutes.route("/verified").put(controller.verified);
UserRoutes.route("/delete").delete(authmeddleware('getUsers', 'all'), controller.delete);
UserRoutes.route("/updateFunction").post(authmeddleware('getUsers', 'all'), controller.update);
UserRoutes.route("/checkFunction").post(controller.getFunction);


export { UserRoutes };
