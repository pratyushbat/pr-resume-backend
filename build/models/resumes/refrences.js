"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
var resume_1 = require("./resume");
var referencesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
});
referencesSchema.post('remove', function (doc) {
    var data = doc;
    resume_1.default.findOne({ refrences: { $in: [data._id] } }).then(function (response) {
        if (response) {
            response.update({ $pull: { refrences: data._id } }, { new: true }).then(function (res) {
                console.log(res, 'response hai');
            }).catch(function (err) {
                console.log(err);
            });
        }
    }).catch(function (err) {
        console.log(err);
    });
});
exports.default = (0, mongoose_1.model)('refrences', referencesSchema);
//# sourceMappingURL=refrences.js.map