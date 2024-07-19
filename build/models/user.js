"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
var moment = require("moment");
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
    onboarding: { type: Number, required: true, default: false },
    verified: { type: Boolean, required: true, default: false },
    code: { type: String, required: true },
    last_active: { type: String, required: true, default: moment().format('LLLL') },
    job_category: { type: String, required: true },
    experience_level: { type: String, required: true }
});
exports.default = (0, mongoose_1.model)('user', userSchema);
//# sourceMappingURL=user.js.map