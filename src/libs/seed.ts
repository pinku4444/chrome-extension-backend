import * as bcrypt from "bcrypt";
import { config } from "../config";
import * as mongoose from "mongoose";
import User from "../Repository/User";

export default () => {
    const userAdmin = new User();

    const envPassword = config.password;
    const role = config.role

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
        } else {

        }
    });
};
