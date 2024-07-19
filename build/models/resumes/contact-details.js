"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
var resume_1 = require("./resume");
var contactDetailsSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip_code: { type: Number, required: true },
    country: { type: String, required: true },
    summary: { type: String, required: true },
    linkedin_url: { type: String, required: false, default: null },
    website_url: { type: String, required: false, default: null },
});
contactDetailsSchema.post('remove', function (doc) {
    var data = doc;
    resume_1.default.findOne({ 'contact_details._id': data._id }).then(function (response) {
        if (response) {
            response.update({ $pull: { 'contact_details._id': data._id } }, { new: true }).then(function (res) {
                console.log(res, 'response hai');
            }).catch(function (err) {
                console.log(err);
            });
        }
    }).catch(function (err) {
        console.log(err);
    });
});
exports.default = (0, mongoose_1.model)('contactDetails', contactDetailsSchema);
//# sourceMappingURL=contact-details.js.map