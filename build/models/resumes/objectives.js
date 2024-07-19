"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
var resume_1 = require("./resume");
var objectiveSchema = new mongoose.Schema({
    objective: { type: String, required: true },
    date: { type: Number, required: true },
    place: { type: String, required: true },
    declaration: { type: String, required: true },
});
objectiveSchema.post('remove', (function (doc) {
    var data = doc;
    resume_1.default.findOne({ objectives: { $in: [data._id] } }).then(function (response) {
        if (response) {
            response.update({ $pull: { objectives: data._id } }, { new: true }).then(function (res) {
                console.log(res, 'response hai');
            }).catch(function (err) {
                console.log(err);
            });
        }
    }).catch(function (err) {
        console.log(err);
    });
}));
exports.default = (0, mongoose_1.model)('objectives', objectiveSchema);
//# sourceMappingURL=objectives.js.map