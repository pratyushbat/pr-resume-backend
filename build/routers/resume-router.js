"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var middlewares_1 = require("../middleware/middlewares");
var resume_controller_1 = require("../controller/resume-controller");
var multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var fileFilter = function (req, file, cb) {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
var upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 6
    }
});
var ResumeRouter = /** @class */ (function () {
    function ResumeRouter() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    ResumeRouter.prototype.routes = function () {
        // adding routes for resume
        this.router.post('/add/resume', middlewares_1.auth, resume_controller_1.ResumeController.addResume);
        this.router.post('/add/contactDetails/:id', middlewares_1.auth, resume_controller_1.ResumeController.addContactDetails);
        this.router.post('/add/education/:id', middlewares_1.auth, resume_controller_1.ResumeController.addEducation);
        this.router.post('/add/employmentHistory/:id', middlewares_1.auth, resume_controller_1.ResumeController.addEmploymentHistory);
        this.router.post('/add/language/:id', middlewares_1.auth, resume_controller_1.ResumeController.addLanguages);
        this.router.post('/add/skill/:id', middlewares_1.auth, resume_controller_1.ResumeController.addSkills);
        this.router.post('/add/refrence/:id', middlewares_1.auth, resume_controller_1.ResumeController.addRefrences);
        this.router.post('/add/award/:id', middlewares_1.auth, resume_controller_1.ResumeController.addAwardsAndAchivements);
        this.router.post('/add/interest/:id', middlewares_1.auth, resume_controller_1.ResumeController.addInterest);
        this.router.post('/add/industrialExposure/:id', middlewares_1.auth, resume_controller_1.ResumeController.addIndustrialExposure);
        this.router.post('/add/projectDetail/:id', middlewares_1.auth, resume_controller_1.ResumeController.addProjectDetails);
        this.router.post('/add/strength/:id', middlewares_1.auth, resume_controller_1.ResumeController.addStrength);
        this.router.post('/add/weakness/:id', middlewares_1.auth, resume_controller_1.ResumeController.addWeakness);
        this.router.post('/add/objective/:id', middlewares_1.auth, resume_controller_1.ResumeController.addObjectives);
        this.router.post('/add/image/:id', middlewares_1.auth, upload.single('profile_image'), resume_controller_1.ResumeController.addImage);
        this.router.post('/add/pdf', resume_controller_1.ResumeController.renderPDF);
        this.router.get('/get/pdf');
        // get Routes for resume
        this.router.get('/all', middlewares_1.auth, resume_controller_1.ResumeController.getAllResume);
        this.router.get('/:id', resume_controller_1.ResumeController.getResume);
        // Updating routes for resume
        this.router.patch('/update/resume/:id', middlewares_1.auth, resume_controller_1.ResumeController.updateResume);
        this.router.patch('/update/resume/views/:id', resume_controller_1.ResumeController.updateResumeViews);
        this.router.patch('/update/contactDetails/:id', middlewares_1.auth, resume_controller_1.ResumeController.updateContactDetails);
        this.router.patch('/update/education/:id', middlewares_1.auth, resume_controller_1.ResumeController.updateEducation);
        this.router.patch('/update/employmentHistory/:id', middlewares_1.auth, resume_controller_1.ResumeController.updateEmploymentHistory);
        this.router.patch('/update/language/:id', middlewares_1.auth, resume_controller_1.ResumeController.updateLanguage);
        this.router.patch('/update/skill/:id', middlewares_1.auth, resume_controller_1.ResumeController.updateSkill);
        this.router.patch('/update/refrence/:id', middlewares_1.auth, resume_controller_1.ResumeController.updateRefrence);
        this.router.patch('/update/awardAchivements/:id', middlewares_1.auth, resume_controller_1.ResumeController.updateAwardAchivements);
        this.router.patch('/update/interest/:id', middlewares_1.auth, resume_controller_1.ResumeController.updateInterest);
        this.router.patch('/update/industrialExposure/:id', middlewares_1.auth, resume_controller_1.ResumeController.updateIndustrialExposure);
        this.router.patch('/update/projectDetail/:id', middlewares_1.auth, resume_controller_1.ResumeController.updateProjectDetails);
        this.router.patch('/update/strength/:id', middlewares_1.auth, resume_controller_1.ResumeController.updateStrength);
        this.router.patch('/update/weakness/:id', middlewares_1.auth, resume_controller_1.ResumeController.updateWeakness);
        this.router.patch('/update/objective/:id', middlewares_1.auth, resume_controller_1.ResumeController.updateObjective);
        this.router.patch('/import/video/:id', middlewares_1.auth, resume_controller_1.ResumeController.importVideo);
        // delete routes for resume
        this.router.delete('/delete/resume/:id', middlewares_1.auth, resume_controller_1.ResumeController.deleteResume);
        this.router.delete('/delete/contactDetails/:id', middlewares_1.auth, resume_controller_1.ResumeController.deleteContactDetails);
        this.router.delete('/delete/education/:id', middlewares_1.auth, resume_controller_1.ResumeController.deleteEducation);
        this.router.delete('/delete/employmentHistory/:id', middlewares_1.auth, resume_controller_1.ResumeController.deleteEmploymentHistory);
        this.router.delete('/delete/language/:id', middlewares_1.auth, resume_controller_1.ResumeController.deleteLanguage);
        this.router.delete('/delete/skill/:id', middlewares_1.auth, resume_controller_1.ResumeController.deleteSkill);
        this.router.delete('/delete/refrence/:id', middlewares_1.auth, resume_controller_1.ResumeController.deleteRefrence);
        this.router.delete('/delete/awardAchivements/:id', middlewares_1.auth, resume_controller_1.ResumeController.deleteAwardAchivements);
        this.router.delete('/delete/interest/:id', middlewares_1.auth, resume_controller_1.ResumeController.deleteInterest);
        this.router.delete('/delete/industrialExposure/:id', middlewares_1.auth, resume_controller_1.ResumeController.deleteIndustrialExposure);
        this.router.delete('/delete/projectDetail/:id', middlewares_1.auth, resume_controller_1.ResumeController.deleteProjectDetails);
        this.router.delete('/delete/strength/:id', middlewares_1.auth, resume_controller_1.ResumeController.deleteStrength);
        this.router.delete('/delete/weakness/:id', middlewares_1.auth, resume_controller_1.ResumeController.deleteWeakness);
        this.router.delete('/delete/objective/:id', middlewares_1.auth, resume_controller_1.ResumeController.deleteObjective);
        this.router.delete('/delete/image/:id', middlewares_1.auth, resume_controller_1.ResumeController.deleteImage);
    };
    return ResumeRouter;
}());
exports.default = new ResumeRouter().router;
// fs.readFile(__dirname + '/resume.pdf', ((err, data) => {
//             console.log(data);
//             res.type('application/pdf');
//             res.end(data,'binary')
//         }));
//# sourceMappingURL=resume-router.js.map