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
            const functionIntoLower = functionName.toLowerCase();
            const data = yield listObject.find({ functionName: functionIntoLower });
            if (data.length >= 1) {
                res.send({
                    status: "ok",
                    code: 422,
                    message: "Function Already exist"
                });
            }
            else {
                // Create function List data
                let isVerified = 0;
                const listData = {
                    _id: mongoose.Types.ObjectId(),
                    functionName: functionIntoLower,
                    definition,
                    keyword,
                    type,
                    user: req.user.email,
                    isVerified
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
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, role } = req.body;
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
            const user = {
                _id: mongoose.Types.ObjectId(),
                email,
                password: hash,
                role
            };
            try {
                const tempUser = yield userObject.findOne({ email });
                if (tempUser != null) {
                    res.send({
                        status: "ok",
                        code: 422,
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
                        message: "Wrong Credential",
                        code: 401
                    });
                }
                const userEmail = user.email;
                const role = user.role;
                const token = jwt.sign({ userEmail, role }, config_1.config.secret_key, {
                    expiresIn: "4h"
                });
                res.send({
                    status: "Ok",
                    code: 200,
                    message: "Login succesfully",
                    token,
                    role
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
    // It returns which is not verified
    getZeros(req, res, next) {
        listObject
            .find({ isVerified: 0 })
            .then(user => {
            const count = user.length;
            if (count === 0) {
                res.send({
                    message: 'Result Not Found',
                    code: 404
                });
            }
            else {
                res.send({
                    status: "Ok",
                    code: 200,
                    message: "Fetch  KeyWord succesfully",
                    data: {
                        user
                    },
                    count
                });
            }
        })
            .catch(err => {
            res.send({
                code: 403,
                Error: err
            });
        });
    }
    //this api verified function
    verified(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const verified = 1;
            try {
                yield listObject.update(id, verified);
                res.send({
                    status: 'Ok',
                    code: 200,
                    message: "successfully Update"
                });
            }
            catch (err) {
                res.send({
                    status: 'Failed',
                    code: 204,
                    message: "Does Not Update",
                    err
                });
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            try {
                const functionDataList = yield listObject.find({ _id: id });
                console.log("function ", functionDataList.length);
                if (functionDataList.length > 0) {
                    const deleted = yield listObject.delete(id);
                    console.log(deleted);
                    res.send({
                        status: 'Ok',
                        code: 200,
                        message: "successfully Delete"
                    });
                }
                else {
                    res.send({
                        status: 'Failed',
                        code: 404,
                        message: "Function does not exist",
                    });
                }
            }
            catch (err) {
                res.send({
                    status: 'Failed',
                    code: 409,
                    message: "Does Not delete",
                    err
                });
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, data } = req.body;
            try {
                const functionData = yield listObject.find({ _id: id });
                const descData = yield descObject.find({ list_id: functionData[0]._id });
                const exampleData = yield exampleObject.find({ desc_id: descData[0]._id });
                const paramData = yield paramObject.find({ desc_id: descData[0]._id });
                const dataArray = Object.keys(data);
                dataArray.forEach(el => {
                    const updateData = {
                        [el]: data[el]
                    };
                    // update function List
                    if (el in functionData[0]) {
                        console.log(" we are in listObject");
                        listObject.updateManydata(id, updateData).then(update => {
                            console.log("function update", update);
                        }).catch(err => {
                            console.log("err is ", err);
                            res.send({
                                status: "failed list",
                                code: 304,
                                err
                            });
                        });
                    }
                    //update description data
                    if (el in descData[0]) {
                        console.log(" we are in descObject");
                        descObject.update(functionData[0]._id, updateData).then(update => {
                            console.log("description update", update);
                        }).catch(err => {
                            res.send({
                                status: "failed descdata",
                                code: 304,
                                err
                            });
                        });
                    }
                    //update example data
                    if (el in exampleData[0]) {
                        console.log(" we are in exampleObject");
                        exampleObject.update(descData[0]._id, updateData).then(update => {
                            console.log("example  update", update);
                        }).catch(err => {
                            res.send({
                                status: "failed example",
                                code: 304,
                                err
                            });
                        });
                    }
                    //update param Data
                    // if (el in paramData[0]) {
                    //   const paramArray = Object.keys(paramData);
                    //   console.log('paramArra: ', paramArray);
                    //   paramArray.forEach(element => {
                    //     console.log(" PAram array is ", paramData[element]);
                    //     if (el in paramData) {
                    //       console.log(" we are in paramData");
                    //     }
                    //   })
                    // }
                });
                if ('param' in data) {
                    yield paramObject.delete(descData[0]._id);
                    const params = req.body.data.param;
                    for (let i = 0; i < params.length; i++) {
                        const paramdata = {
                            _id: mongoose.Types.ObjectId(),
                            desc_id: descData[0]._id,
                            argument: params[i].argument,
                            description: params[i].description
                        };
                        try {
                            yield paramObject.create(paramdata);
                        }
                        catch (err) {
                            res.send({
                                status: "failed param",
                                code: 304,
                                err
                            });
                        }
                    }
                }
            }
            catch (err) {
                res.send({
                    status: "failed",
                    message: "invalid ID",
                    code: 304,
                    err
                });
            }
            res.send({
                status: 'ok'
            });
        });
    }
    getFunction(req, res, next) {
        const limit = config_1.config.response_limit;
        const { functionName } = req.body;
        const functionLowerCase = functionName.toLowerCase();
        listObject
            .find({ functionName: functionLowerCase })
            .then(user => {
            const count = user.length;
            if (count === 0) {
                res.send({
                    message: 'function does not exist',
                    code: 200
                });
            }
            else {
                res.send({
                    status: "Ok",
                    code: 200,
                    message: "function already exist ",
                });
            }
        })
            .catch(err => {
            res.send({
                code: 403,
                Error: err
            });
        });
    }
}
exports.default = new Controller();
//# sourceMappingURL=controller.js.map