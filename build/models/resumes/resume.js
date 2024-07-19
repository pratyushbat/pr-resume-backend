"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
var resumeSchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique: false },
    name: { type: String, required: true },
    image_url: { type: String, required: false, default: null },
    video_url: { type: String, required: false, default: null },
    views: { type: Number, required: false, default: 0 },
    contact_details: { type: mongoose.Schema.Types.ObjectId, ref: 'contactDetails' },
    education: [{ type: mongoose.Schema.Types.ObjectId, ref: 'education' }],
    employment_history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'employmentHistory' }],
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'skills' }],
    languages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'languages' }],
    refrences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'refrences' }],
    award_achivements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'awardsAchivements' }],
    interests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'interest' }],
    industrialExposures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'industrialExposure' }],
    projectDetails: [{ type: mongoose.Schema.Types.ObjectId, ref: 'projectDetails' }],
    strengths: [{ type: mongoose.Schema.Types.ObjectId, ref: 'strength' }],
    weakness: [{ type: mongoose.Schema.Types.ObjectId, ref: 'weakness' }],
    objectives: [{ type: mongoose.Schema.Types.ObjectId, ref: 'objectives' }],
});
resumeSchema.post('remove', function (data) {
    console.log(data);
    var contact_detals = mongoose.model('contactDetails');
    var education = mongoose.model('education');
    var employment_history = mongoose.model('employmentHistory');
    var skills = mongoose.model('skills');
    var languages = mongoose.model('languages');
    var refrences = mongoose.model('refrences');
    var award_achivements = mongoose.model('awardsAchivements');
    var interests = mongoose.model('interest');
    var industrial_exposure = mongoose.model('industrialExposure');
    var project_details = mongoose.model('projectDetails');
    var strengths = mongoose.model('strength');
    var weaknessModel = mongoose.model('weakness');
    var objectiesModel = mongoose.model('objectives');
    var doc = data;
    if (doc.contact_details) {
        contact_detals.remove({ _id: doc.contact_details }).then(function (res) {
            console.log(res);
        }).catch(function (error) {
            console.log(error);
        });
    }
    var a = education.remove({ _id: { $in: doc.education } });
    var b = employment_history.remove({ _id: { $in: doc.employment_history } });
    var c = skills.remove({ _id: { $in: doc.skills } });
    var d = languages.remove({ _id: { $in: doc.languages } });
    var e = refrences.remove({ _id: { $in: doc.refrences } });
    var f = award_achivements.remove({ _id: { $in: doc.award_achivements } });
    var i = interests.remove({ _id: { $in: doc.interests } });
    var j = industrial_exposure.remove({ _id: { $in: doc.industrialExposures } });
    var k = project_details.remove({ _id: { $in: doc.projectDetails } });
    var l = strengths.remove({ _id: { $in: doc.strengths } });
    var m = weaknessModel.remove({ _id: { $in: doc.weakness } });
    var n = objectiesModel.remove({ _id: { $in: doc.objectives } });
    Promise.all([a, b, c, d, e, f, i, j, k, l, m, n]).then(function (res) {
        console.log(res);
    }).catch(function (error) {
        console.log(error, 'error hai');
    });
});
exports.default = (0, mongoose_1.model)('resume', resumeSchema);
//# sourceMappingURL=resume.js.map