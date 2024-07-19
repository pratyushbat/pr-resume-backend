"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
var resume_1 = require("../resumes/resume");
var skillsSchema = new mongoose.Schema({
    skill: { type: String, required: true },
    level: { type: String, required: true },
});
skillsSchema.post('remove', (function (doc) {
    var data = doc;
    resume_1.default.findOne({ skills: { $in: [data._id] } }).then(function (response) {
        if (response) {
            response.update({ $pull: { skills: data._id } }, { new: true }).then(function (res) {
                console.log(res, 'response hai');
            }).catch(function (err) {
                console.log(err);
            });
        }
    }).catch(function (err) {
        console.log(err);
    });
}));
exports.default = (0, mongoose_1.model)('skills', skillsSchema);
//# sourceMappingURL=skills.js.map