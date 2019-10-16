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
export default new Controller();
