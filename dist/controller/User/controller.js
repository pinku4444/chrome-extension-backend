"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const config_1 = require("../../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const List_1 = require("./../../Repository/List");
const Description_1 = require("./../../Repository/Description");
const Example_1 = require("./../../Repository/Example");
const Param_1 = require("./../../Repository/Param");
const User_1 = require("./../../Repository/User");
const listObject = new List_1.default();
const descObject = new Description_1.default();
const exampleObject = new Example_1.default();
const paramObject = new Param_1.default();
const userObject = new User_1.default();
class Controller {
    // This get Api Is used For search Function name on the basis given String
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { functionName, definition, syntax, example, output, keyword, type, param } = req.body;
            const data = yield listObject.find({ functionName: functionName });
            if (data.length >= 1) {
                res.send({
                    status: "ok",
                    code: 422,
                    message: "Function Already exist"
                });
            }
            else {
                // Create function List data
                const listData = {
                    _id: mongoose.Types.ObjectId(),
                    functionName,
                    definition,
                    keyword,
                    type,
                    user: req.user.email
                };
                const functionLists = yield listObject.create(listData);
                //Create description with List Id
                const descData = {
                    _id: mongoose.Types.ObjectId(),
                    list_id: functionLists.id,
                    definition,
                    syntax
                };
                const description = yield descObject.create(descData);
                // Create example with description Id
                const exampleData = {
                    _id: mongoose.Types.ObjectId(),
                    desc_id: description._id,
                    example,
                    output
                };
                try {
                    const exampleList = yield exampleObject.create(exampleData);
                }
                catch (err) {
                    res.send({
                        code: 403,
                        err
                    });
                }
                // Create params with description Id
                param.forEach(element => {
                    const paramsData = {
                        _id: mongoose.Types.ObjectId(),
                        desc_id: description.id,
                        argument: element["argument"],
                        description: element["desc"]
                    };
                    paramObject
                        .create(paramsData)
                        .then(paramList => { })
                        .catch(err => {
                        res.send({
                            code: 403,
                            err
                        });
                    });
                });
            }
            res.send({
                status: "Ok",
                code: 200,
                message: "Function Add successfully"
            });
        });
    }
    signin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
            const user = {
                _id: mongoose.Types.ObjectId(),
                email,
                password: hash
            };
            try {
                const tempUser = yield userObject.findOne({ email });
                if (tempUser != null) {
                    res.send({
                        status: "ok",
                        code: 200,
                        message: "User already exist"
                    });
                }
                const userList = yield userObject.create(user);
            }
            catch (err) {
                res.send({
                    status: "Failed",
                    code: 403,
                    err
                });
            }
            res.send({
                status: "ok",
                code: 200,
                message: "User add Successfully "
            });
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield userObject.findOne({ email });
                const crypt = yield bcrypt.compare(password, user.password);
                if (!crypt) {
                    res.send({
                        status: "failed",
                        message: "Wrong Credential"
                    });
                }
                const userEmail = user.email;
                const token = jwt.sign({ userEmail }, config_1.config.secret_key, {
                    expiresIn: "4h"
                });
                res.send({
                    status: "Ok",
                    code: 200,
                    message: "Login succesfully",
                    token
                });
            }
            catch (err) {
                res.send({
                    status: "Failed",
                    code: 401,
                    message: "Login Failed",
                    err
                });
            }
        });
    }
}
exports.default = new Controller();
//# sourceMappingURL=controller.js.map