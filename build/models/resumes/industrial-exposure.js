"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
var resume_1 = require("./resume");
var industrialExposureSchema = new mongoose.Schema({
    organisation: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    start_month: { type: String, required: true },
    start_year: { type: Number, required: true },
    end_month: { type: String, required: false },
    end_year: { type: Number, required: false },
    work: { type: String, required: false }
});
industrialExposureSchema.post('remove', function (doc) {
    var data = doc;
    resume_1.default.findOne({ industrialExposures: { $in: [data._id] } }).then(function (response) {
        if (response) {
            response.update({ $pull: { industrialExposures: data._id } }, { new: true }).then(function (res) {
                console.log(res, 'response hai');
            }).catch(function (err) {
                console.log(err);
            });
        }
    }).catch(function (err) {
        console.log(err);
    });
});
exports.default = (0, mongoose_1.model)('industrialExposure', industrialExposureSchema);
//# sourceMappingURL=industrial-exposure.js.map