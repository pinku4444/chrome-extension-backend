import * as jwt from "jsonwebtoken";
import { config } from "../config";
import hasPermission from "./permission";
import User from "./../Repository/User";
import { permissions } from './constant';

const UserObject = new User();

export default (moduleName, permissionType) => (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const userInfo = jwt.verify(token, config.secret_key);

    const role = userInfo.role;


    UserObject
      .findOne({ email: userInfo["userEmail"] })
      .then(user => {

        req.user = user;

        if (!user) {
          next("User Not Found !!!!!!!!!!!!!!!!!!!!!!!!!!");
          res.send({
            code: 404
          });
        }
        if (hasPermission(moduleName, role, permissionType)) {
          next();
        } else {
          res.send({
            code: 401,
            message: " unauthorized access"
          });

        }
      })
      .catch(err => {
        res.send({
          code: 401,
          err
        });
      });
  }
  catch (err) {
    res.send({
      status: 'Failed',
      code: 401,
      message: 'Invalid Token'
    })
  }
};
