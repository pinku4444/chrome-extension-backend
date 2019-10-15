import { Request, Response } from "express";
import * as mongoose from "mongoose";
import { config } from "../../config";
import List from "./../../Repository/List";
import Description from "./../../Repository/Description";
import Example from "./../../Repository/Example";
import Param from "./../../Repository/Param";

//instances of repository
const list = new List();
const description = new Description();
const exa = new Example();
const paramsObject = new Param();

class Controller {
  // This get Api Is used For search Function name on the basis given String
  get(req, res, next) {
    const limit = config.response_limit;
    const { functionName } = req.query;

    list
      .find({ functionName: { $regex: functionName } })
      .limit(6)
      .then(user => {
        const count = user.length;
        res.send({
          status: "Ok",
          message: "Fetch succesfully",
          data: {
            user
          },
          count
        });
      })
      .catch(err => {
        res.send({
          err
        });
      });
  }
  // This API is used for keyWord search

  getKeyword(req, res, next) {
    const limit = config.response_limit;
    const { keyword } = req.query;

    list
      .find({ keyword: { $regex: keyword } })
      .limit(3)
      .then(user => {
        const count = user.length;
        res.send({
          status: "Ok",
          message: "Fetch  KeyWord succesfully",
          data: {
            user
          },
          count
        });
      })
      .catch(err => {
        res.send({
          Error: err
        });
      });
  }

  //This API is Used Create Data

  create(req, res, next) {
    const {
      functionName,
      definition,
      syntax,
      funcDesc,
      example,
      keyword,
      param,
      param_desc
    } = req.body;
    const ID = mongoose.Types.ObjectId();
    const listData = {
      _id: ID,
      functionName,
      keyword
    };
    list
      .create(listData)
      .then(func => {
        const { _id } = func;
        const descData = {
          _id: mongoose.Types.ObjectId(),
          list_id: _id,
          definition,
          syntax
        };
        description
          .create(descData)
          .then(desc => {
            const exampleData = {
              _id: mongoose.Types.ObjectId(),
              desc_id: desc.id,
              example
            };
            exa.create(exampleData);
            const prmData = {
              _id: mongoose.Types.ObjectId(),
              desc_id: desc.id,
              param,
              description: param_desc
            };
            paramsObject.create(prmData);
            res.send({
              status: "OK",
              message: "successfully Add Data"
            });
          })
          .catch(err => {
            res.status(err);
          });
      })
      .catch(err => {
        res.status(err);
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
                  Error: err
                });
              });
          })
          .catch(err => {
            res.send({
              Error: err
            });
          });
      })
      .catch(err => {
        res.send({
          Error: err
        });
      });
  }
}
export default new Controller();
