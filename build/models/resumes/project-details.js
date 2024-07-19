"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
var resume_1 = require("./resume");
var projectDetailSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    role: { type: String, required: true },
});
projectDetailSchema.post('remove', function (doc) {
    var data = doc;
    resume_1.default.findOne({ projectDetails: { $in: [data._id] } }).then(function (response) {
        if (response) {
            response.update({ $pull: { projectDetails: data._id } }, { new: true }).then(function (res) {
                console.log(res, 'response hai');
            }).catch(function (err) {
                console.log(err);
            });
        }
    }).catch(function (err) {
        console.log(err);
    });
});
exports.default = (0, mongoose_1.model)('projectDetails', projectDetailSchema);
//# sourceMappingURL=project-details.js.map