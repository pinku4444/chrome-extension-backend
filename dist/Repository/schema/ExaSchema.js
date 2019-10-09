"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class ExaSchema extends mongoose.Schema {
    constructor(options) {
        const baseSchema = {
            _id: String,
            desc_id: {
                required: true,
                type: String
            },
            example: {
                required: true,
                type: String
            }
        };
        super(baseSchema, options);
    }
}
exports.default = ExaSchema;
//# sourceMappingURL=ExaSchema.js.map