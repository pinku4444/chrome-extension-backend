"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const List_1 = require("./../../Repository/List");
const Description_1 = require("./../../Repository/Description");
const Example_1 = require("./../../Repository/Example");
const Param_1 = require("./../../Repository/Param");
//instances of repository
const list = new List_1.default();
const description = new Description_1.default();
const exa = new Example_1.default();
const paramsObject = new Param_1.default();
class Controller {
    // This API is used for keyWord search
    getKeyword(req, res, next) {
        const limit = config_1.config.response_limit;
        const { keyword } = req.query;
        list
            .find({ keyword: { $regex: keyword }, isVerified: 1 })
            .limit(8)
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
    // This API is Return description example and param on the basis of id
    getParameter(req, res, next) {
        const { id } = req.query;
        description
            .find({ list_id: id })
            .then(desc => {
            const descriptId = desc["0"]["_id"];
            exa
                .find({ desc_id: descriptId })
                .then(examples => {
                paramsObject
                    .find({ desc_id: descriptId })
                    .then(param => {
                    res.send({
                        status: "Ok",
                        code: 200,
                        message: "Get Parameters Successfully",
                        data: {
                            description: desc,
                            examples,
                            param
                        }
                    });
                })
                    .catch(err => {
                    res.send({
                        code: 403,
                        Error: err
                    });
                });
            })
                .catch(err => {
                res.send({
                    code: 403,
                    Error: err
                });
            });
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