"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
var resume_1 = require("../resumes/resume");
var weaknessSchema = new mongoose.Schema({
    name: { type: String, required: true },
});
weaknessSchema.post('remove', (function (doc) {
    var data = doc;
    resume_1.default.findOne({ weakness: { $in: [data._id] } }).then(function (response) {
        if (response) {
            response.update({ $pull: { weakness: data._id } }, { new: true }).then(function (res) {
                console.log(res, 'response hai');
            }).catch(function (err) {
                console.log(err);
            });
        }
    }).catch(function (err) {
        console.log(err);
    });
}));
exports.default = (0, mongoose_1.model)('weakness', weaknessSchema);
//# sourceMappingURL=weakness.js.map