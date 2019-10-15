"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const router_1 = require("./router");
const Database_1 = require("./libs/Database");
class Server {
    constructor(config) {
        this.config = config;
        this.app = express();
    }
    bootstrap() {
        this.initBodyParser();
        this.setupRoutes();
        return this.app;
    }
    initBodyParser() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }
    setupRoutes() {
        const { app } = this;
        app.use("/api", router_1.default);
        this.run();
    }
    run() {
        const { config: { port, mongo_uri } } = this;
        const database = new Database_1.default();
        database.open(mongo_uri);
        const server = this.app.listen(port, () => {
            const message = `|| App is running in '${port}' in mode ||`;
            console.log(message);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map