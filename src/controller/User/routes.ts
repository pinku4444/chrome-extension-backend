import * as express from "express";
import controller from "./controller";
import authmeddleware from "./../../libs/authmeddleware";
const UserRoutes = express.Router();

UserRoutes.route("/post").post(authmeddleware('getUsers', 'read'), controller.create);
UserRoutes.route("/signup").post(controller.signup);
UserRoutes.route("/login").post(controller.login);
UserRoutes.route("/getunverified").get(authmeddleware('getUsers', 'all'), controller.getZeros);
UserRoutes.route("/verified").put(controller.verified);
<<<<<<< HEAD
UserRoutes.route("/delete").delete(authmeddleware('getUsers', 'all'), controller.delete);
UserRoutes.route("/updateFunction").post(authmeddleware('getUsers', 'all'), controller.update);
UserRoutes.route("/checkFunction").get(controller.getFunction);
=======
UserRoutes.route("/delete").post(authmeddleware('getUsers', 'all'), controller.delete);
UserRoutes.route("/updateFunction").post(authmeddleware('getUsers', 'all'), controller.update);
>>>>>>> 7c83cae4e430ed616bcb311eced8b38a8f7cdba0

export { UserRoutes };
