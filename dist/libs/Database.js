"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const seed_1 = require("./seed");
class Database {
    open(mongoUri) {
        mongoose.connect(mongoUri, err => {
            if (err) {
                console.log("error is >>>>>", err);
            }
            console.log("successfully connected");
            seed_1.default();
        }, { useNewUrlParser: true });
    }
}
exports.default = Database;
//# sourceMappingURL=Database.js.map