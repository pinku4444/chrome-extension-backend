"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class ParamSchema extends mongoose.Schema {
    constructor(options) {
        const baseSchema = {
            _id: String,
            desc_id: {
                required: true,
                type: String
            },
            param: {
                required: true,
                type: String
            },
            description: {
                required: true,
                type: String
            }
        };
        super(baseSchema, options);
    }
}
exports.default = ParamSchema;
//# sourceMappingURL=ParamSchema.js.map