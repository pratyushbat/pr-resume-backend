"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
var resume_1 = require("./resume");
var educationSchema = new mongoose.Schema({
    school_name: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    field: { type: String, required: true },
    percentage: { type: String, required: true },
    degree_type: { type: String, required: true },
    graduation_month: { type: String, required: true },
    graduation_year: { type: Number, required: true },
});
educationSchema.post('remove', function (doc) {
    var data = doc;
    resume_1.default.findOne({ education: { $in: [data._id] } }).then(function (response) {
        if (response) {
            response.update({ $pull: { education: data._id } }, { new: true }).then(function (res) {
                console.log(res, 'response hai');
            }).catch(function (err) {
                console.log(err);
            });
        }
    }).catch(function (err) {
        console.log(err);
    });
});
exports.default = (0, mongoose_1.model)('education', educationSchema);
//# sourceMappingURL=education.js.map