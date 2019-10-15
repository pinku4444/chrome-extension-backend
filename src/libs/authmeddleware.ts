import * as jwt from "jsonwebtoken";
import { config } from "../config";
import User from "./../Repository/User";

const UserObject = new User();
export default () => (req, res, next) => {
  // try {
  const token = req.headers["authorization"];
  const userInfo = jwt.verify(token, config.secret_key);

  UserObject.findOne({ email: userInfo["userEmail"] })
    .then(user => {
      req.user = user;
      if (!user) {
        next("User Not Found !!!!!!!!!!!!!!!!!!!!!!!!!!");
        res.send({
          code: 401
        });
      }
      next();
    })
    .catch(err => {
      res.send({
        code: 401,
        err
      });
    });
};
