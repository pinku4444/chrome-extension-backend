"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const config_1 = require("../config");
const mongoose = require("mongoose");
const User_1 = require("../Repository/User");
exports.default = () => {
    const userAdmin = new User_1.default();
    const envPassword = config_1.config.password;
    const role = config_1.config.role;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(envPassword, salt);
    const user = {
        _id: mongoose.Types.ObjectId(),
        email: "admin@chrome.com",
        password: hash,
        role
    };
    userAdmin.count().then(count => {
        if (count === 0) {
            userAdmin.create(user)
                .then(res => {
                res.send({
                    status: 'Ok',
                    code: 200,
                    message: "Admin Create Successfully"
                });
            })
                .catch(err => {
            });
        }
        else {
        }
    });
};
//# sourceMappingURL=seed.js.map