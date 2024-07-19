"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
var resume_1 = require("./resume");
var interestSchema = new mongoose.Schema({
    interest: { type: String, required: true },
});
interestSchema.post('remove', function (doc) {
    var data = doc;
    resume_1.default.findOne({ interests: { $in: [data._id] } }).then(function (response) {
        if (response) {
            response.update({ $pull: { interests: data._id } }, { new: true }).then(function (res) {
                console.log(res, 'response hai');
            }).catch(function (err) {
                console.log(err);
            });
        }
    }).catch(function (err) {
        console.log(err);
    });
});
exports.default = (0, mongoose_1.model)('interest', interestSchema);
//# sourceMappingURL=interests.js.map