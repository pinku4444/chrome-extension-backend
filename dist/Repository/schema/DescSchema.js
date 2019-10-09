"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class DescSchema extends mongoose.Schema {
    constructor(options) {
        const baseSchema = {
            _id: String,
            list_id: {
                required: true,
                type: String
            },
            definition: {
                required: true,
                type: String
            },
            syntax: {
                required: true,
                type: String
            }
        };
        super(baseSchema, options);
    }
}
exports.default = DescSchema;
//# sourceMappingURL=DescSchema.js.map