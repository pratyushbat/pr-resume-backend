"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
var resume_1 = require("./resume");
var awardsAchivementsSchema = new mongoose.Schema({
    awards_and_achivements: { type: String, required: true },
});
awardsAchivementsSchema.post('remove', function (doc) {
    var data = doc;
    resume_1.default.findOne({ award_achivements: { $in: [data._id] } }).then(function (response) {
        if (response) {
            response.update({ $pull: { award_achivements: data._id } }, { new: true }).then(function (res) {
                console.log(res, 'response hai');
            }).catch(function (err) {
                console.log(err);
            });
        }
    }).catch(function (err) {
        console.log(err);
    });
});
exports.default = (0, mongoose_1.model)('awardsAchivements', awardsAchivementsSchema);
//# sourceMappingURL=awards-achivements.js.map