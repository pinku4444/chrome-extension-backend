"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
const envVars = process.env;
const configuration = Object.freeze({
    port: envVars.PORT,
    mongo_uri: envVars.MONGO_URL,
    response_limit: envVars.RESPONSE_LIMIT,
    secret_key: envVars.SECRET_KEY,
    role: envVars.ROLE,
    password: envVars.PASSWORD
});
exports.default = configuration;
//# sourceMappingURL=configuration.js.map