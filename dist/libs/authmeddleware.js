"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const config_1 = require("../config");
const User_1 = require("./../Repository/User");
const UserObject = new User_1.default();
exports.default = () => (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        const userInfo = jwt.verify(token, config_1.config.secret_key);
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
    }
    catch (err) {
        res.send({
            status: 'Failed',
            code: 401,
            message: 'Invalid Token'
        });
    }
};
//# sourceMappingURL=authmeddleware.js.map