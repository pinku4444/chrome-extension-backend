import * as mongoose from "mongoose";
import { config } from "../../config";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import List from "./../../Repository/List";
import Description from "./../../Repository/Description";
import Example from "./../../Repository/Example";
import Param from "./../../Repository/Param";
import User from "./../../Repository/User";

const listObject = new List();
const descObject = new Description();
const exampleObject = new Example();
const paramObject = new Param();
const userObject = new User();
class Controller {
  // This get Api Is used For search Function name on the basis given String
  async create(req, res, next) {
    const {
      functionName,
      definition,
      syntax,
      example,
      output,
      keyword,
      type,
      param
    } = req.body;

    const data = await listObject.find({ functionName: functionName });
    if (data.length >= 1) {
      res.send({
        status: "ok",
        code: 422,
        message: "Function Already exist"
      });
    } else {
      // Create function List data
      let isVerified = 0;
      const listData = {
        _id: mongoose.Types.ObjectId(),
        functionName,
        definition,
        keyword,
        type,
        user: req.user.email,
        isVerified
      };
      const functionLists = await listObject.create(listData);

      //Create description with List Id
      const descData = {
        _id: mongoose.Types.ObjectId(),
        list_id: functionLists.id,
        definition,
        syntax
      };

      const description = await descObject.create(descData);

      // Create example with description Id
      const exampleData = {
        _id: mongoose.Types.ObjectId(),
        desc_id: description._id,
        example,
        output
      };
      try {
        const exampleList = await exampleObject.create(exampleData);
      } catch (err) {
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
  }

  async signup(req, res, next) {
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
      const tempUser = await userObject.findOne({ email });
      if (tempUser != null) {
        res.send({
          status: "ok",
          code: 422,
          message: "User already exist"
        });
      }
      const userList = await userObject.create(user);
    } catch (err) {
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
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await userObject.findOne({ email });
      const crypt = await bcrypt.compare(password, user.password);

      if (!crypt) {
        res.send({
          status: "failed",
          message: "Wrong Credential",
          code: 401
        });
      }
      const userEmail = user.email;
      const role = user.role;
      const token = jwt.sign({ userEmail, role }, config.secret_key, {
        expiresIn: "4h"
      });

      res.send({
        status: "Ok",
        code: 200,
        message: "Login succesfully",
        token,
        role
      });
    } catch (err) {
      res.send({
        status: "Failed",
        code: 401,
        message: "Login Failed",
        err
      });
    }
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
          })
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
  async verified(req, res, next) {
    const { id } = req.body;
    const verified = 1;
    try {
      await listObject.update(id, verified);
      res.send({
        status: 'Ok',
        code: 200,
        message: "successfully Update"
      })
    }
    catch (err) {
      res.send({
        status: 'Failed',
        code: 204,
        message: "Does Not Update",
        err
      })

    }

  }

  async delete(req, res, next) {

    const { id } = req.body;

    try {
      await listObject.delete(id);
      res.send({
        status: 'Ok',
        code: 200,
        message: "successfully Delete"
      })
    }
    catch (err) {
      res.send({
        status: 'Failed',
        code: 409,
        message: "Does Not delete",
        err
      })
    }

  }


}
export default new Controller();
