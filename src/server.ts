import * as express from "express";
import * as bodyParser from "body-parser";
import { default as router } from "./router";
import Database from "./libs/Database";
export default class Server {
  private app: express.Express;

  constructor(private config: any) {
    this.app = express();
  }
  bootstrap() {
    this.initBodyParser();
    this.setupRoutes();
    return this.app;
  }

  initBodyParser() {
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }
  setupRoutes() {
    const { app } = this;

    app.use("/api", router);

    this.run();
  }
  public run() {
    const {
      config: { port, mongo_uri }
    } = this;

    console.log(port);
    const database = new Database();
    database.open(mongo_uri);

    console.log("Port is :", port);
    const server = this.app.listen(port, () => {
      const message = `|| App is running in '${port}' in mode ||`;
      console.log(message);
    });
  }
}
