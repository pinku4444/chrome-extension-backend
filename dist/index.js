"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const server_1 = require("./server");
let server = new server_1.default(config_1.config);
server.bootstrap();
//# sourceMappingURL=index.js.map