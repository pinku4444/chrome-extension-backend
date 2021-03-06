"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class ListSchema extends mongoose.Schema {
    constructor(options) {
        const baseSchema = {
            _id: String,
            functionName: {
                required: true,
                type: String
            },
            keyword: {
                required: true,
                type: Array
            },
            user: {
                required: true,
                type: String
            },
            type: {
                required: true,
                type: String,
            },
            isVerified: {
                required: true,
                type: Number,
            }
        };
        super(baseSchema, options);
    }
}
exports.default = ListSchema;
//# sourceMappingURL=ListSchema.js.map