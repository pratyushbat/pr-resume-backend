"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeController = void 0;
var resume_1 = require("../models/resumes/resume");
var education_1 = require("../models/resumes/education");
var employment_history_1 = require("../models/resumes/employment-history");
var languages_1 = require("../models/resumes/languages");
var skills_1 = require("../models/resumes/skills");
var refrences_1 = require("../models/resumes/refrences");
var contact_details_1 = require("../models/resumes/contact-details");
var awards_achivements_1 = require("../models/resumes/awards-achivements");
var interests_1 = require("../models/resumes/interests");
var industrial_exposure_1 = require("../models/resumes/industrial-exposure");
var project_details_1 = require("../models/resumes/project-details");
var strength_1 = require("../models/resumes/strength");
var weakness_1 = require("../models/resumes/weakness");
var objectives_1 = require("../models/resumes/objectives");
var mongoose_1 = require("mongoose");
var pdf = require("html-pdf");
var ResumeController = /** @class */ (function () {
    function ResumeController() {
    }
    ResumeController.addContactDetails = function (req, res) {
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var phone_number = req.body.phone_number;
        var email = req.body.email;
        var address = req.body.address;
        var city = req.body.city;
        var state = req.body.state;
        var zip_code = req.body.zip_code;
        var country = req.body.country;
        var resume_id = req.params.id;
        var summary = req.body.summary;
        var linkedin_url = req.body.linkedin_url;
        var website_url = req.body.website_url;
        var contact_details = new contact_details_1.default({
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            email: email,
            address: address,
            city: city,
            state: state,
            zip_code: zip_code,
            country: country,
            summary: summary,
            linkedin_url: linkedin_url,
            website_url: website_url
        });
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            });
        }
        resume_1.default.findOneAndUpdate({ _id: resume_id }, { contact_details: contact_details }, { new: true }).then(function () {
            contact_details.save().then(function (data) {
                res.status(200).send(data);
            }).catch(function (err) {
                res.status(500).send(err);
            });
        });
    };
    ResumeController.addEducation = function (req, res) {
        var resume_id = req.params.id;
        var school_name = req.body.school_name;
        var city = req.body.city;
        var state = req.body.state;
        var field = req.body.field;
        var degree_type = req.body.degree_type;
        var graduation_month = req.body.graduation_month;
        var graduation_year = req.body.graduation_year;
        var percentage = req.body.percentage;
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            });
        }
        var education = new education_1.default({
            school_name: school_name,
            city: city,
            state: state,
            field: field,
            degree_type: degree_type,
            graduation_month: graduation_month,
            graduation_year: graduation_year,
            percentage: percentage,
        });
        resume_1.default.findOne({ _id: resume_id }).then(function (data) {
            data.education.push(education);
            mongoose_1.Promise.all([education.save(), data.save()]).then(function (data) {
                res.status(200).send(education);
            }).catch(function (err) {
                res.status(500).send(err);
            });
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.addResume = function (req, res) {
        var userId = req.userData.userID;
        var name = req.body.name;
        var resume = new resume_1.default({
            user_id: userId,
            name: name,
        });
        resume.save().then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.addEmploymentHistory = function (req, res) {
        var resume_id = req.params.id;
        var employer = req.body.employer;
        var job_title = req.body.designation;
        var city = req.body.city;
        var state = req.body.state;
        var organisation = req.body.organisation;
        var start_month = req.body.start_month;
        var start_year = req.body.start_year;
        var end_month = req.body.end_month ? req.body.end_month : null;
        var end_year = req.body.end_year ? req.body.end_year : null;
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            });
        }
        var emplymentHistory = new employment_history_1.default({
            resume_id: resume_id,
            employer: employer,
            designation: job_title,
            organisation: organisation,
            city: city,
            state: state,
            start_month: start_month,
            start_year: start_year,
            end_month: end_month,
            end_year: end_year
        });
        resume_1.default.findOne({ _id: resume_id }).then(function (data) {
            data.employment_history.push(emplymentHistory);
            mongoose_1.Promise.all([emplymentHistory.save(), data.save()]).then(function (data) {
                res.status(200).send(emplymentHistory);
            }).catch(function (err) {
                res.status(500).send(err);
            });
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.addLanguages = function (req, res) {
        var name = req.body.name;
        var level = req.body.level;
        var resume_id = req.params.id;
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            });
        }
        var language = new languages_1.default({
            name: name,
            level: level,
        });
        resume_1.default.findOne({ _id: resume_id }).then(function (data) {
            data.languages.push(language);
            mongoose_1.Promise.all([language.save(), data.save()]).then(function (data) {
                res.status(200).send(language);
            }).catch(function (err) {
                res.status(500).send(err);
            });
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.addSkills = function (req, res) {
        var skill = req.body.skill;
        var level = req.body.level;
        var resume_id = req.params.id;
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            });
        }
        var newSkill = new skills_1.default({
            skill: skill,
            level: level,
        });
        resume_1.default.findOne({ _id: resume_id }).then(function (data) {
            data.skills.push(newSkill);
            mongoose_1.Promise.all([newSkill.save(), data.save()]).then(function (data) {
                res.status(200).send(newSkill);
            }).catch(function (err) {
                res.status(500).send(err);
            });
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.addRefrences = function (req, res) {
        var name = req.body.name;
        var relationship = req.body.relationship;
        var company = req.body.company;
        var email = req.body.email;
        var phone = req.body.phone;
        var address = req.body.address;
        var resume_id = req.params.id;
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            });
        }
        var refrence = new refrences_1.default({
            name: name,
            relationship: relationship,
            company: company,
            email: email,
            phone: phone,
            address: address,
        });
        resume_1.default.findOne({ _id: resume_id }).then(function (data) {
            data.refrences.push(refrence);
            mongoose_1.Promise.all([refrence.save(), data.save()]).then(function (data) {
                res.status(200).send(refrence);
            }).catch(function (err) {
                res.status(500).send(err);
            });
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.addAwardsAndAchivements = function (req, res) {
        var awards_and_achivements = req.body.awards_and_achivements;
        var resume_id = req.params.id;
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            });
        }
        var award_achivements = new awards_achivements_1.default({
            awards_and_achivements: awards_and_achivements
        });
        resume_1.default.findOne({ _id: resume_id }).then(function (data) {
            data.award_achivements.push(award_achivements);
            mongoose_1.Promise.all([award_achivements.save(), data.save()]).then(function (data) {
                res.status(200).send(award_achivements);
            }).catch(function (err) {
                res.status(500).send(err);
            });
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.addInterest = function (req, res) {
        var interest = req.body.interest;
        var resume_id = req.params.id;
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            });
        }
        var newInterest = new interests_1.default({
            interest: interest
        });
        resume_1.default.findOne({ _id: resume_id }).then(function (data) {
            data.interests.push(newInterest);
            mongoose_1.Promise.all([newInterest.save(), data.save()]).then(function (data) {
                res.status(200).send(newInterest);
            }).catch(function (err) {
                res.status(500).send(err);
            });
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.addIndustrialExposure = function (req, res) {
        var resume_id = req.params.id;
        var organisation = req.body.organisation;
        var city = req.body.city;
        var state = req.body.state;
        var start_month = req.body.start_month;
        var start_year = req.body.start_year;
        var end_month = req.body.end_month;
        var end_year = req.body.end_year;
        var work = req.body.work;
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            });
        }
        var industrialExposure = new industrial_exposure_1.default({
            organisation: organisation,
            city: city,
            state: state,
            start_month: start_month,
            start_year: start_year,
            end_month: end_month,
            end_year: end_year,
            work: work,
        });
        resume_1.default.findOne({ _id: resume_id }).then(function (data) {
            data.industrialExposures.push(industrialExposure);
            mongoose_1.Promise.all([industrialExposure.save(), data.save()]).then(function (data) {
                res.status(200).send(industrialExposure);
            }).catch(function (err) {
                res.status(500).send(err);
            });
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.addProjectDetails = function (req, res) {
        var resume_id = req.params.id;
        var title = req.body.title;
        var description = req.body.description;
        var duration = req.body.duration;
        var role = req.body.role;
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            });
        }
        var projectDetail = new project_details_1.default({
            title: title,
            description: description,
            duration: duration,
            role: role,
        });
        resume_1.default.findOne({ _id: resume_id }).then(function (data) {
            data.projectDetails.push(projectDetail);
            mongoose_1.Promise.all([projectDetail.save(), data.save()]).then(function (data) {
                res.status(200).send(projectDetail);
            }).catch(function (err) {
                res.status(500).send(err);
            });
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.addStrength = function (req, res) {
        var resume_id = req.params.id;
        var name = req.body.name;
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            });
        }
        var strength = new strength_1.default({
            name: name
        });
        resume_1.default.findOne({ _id: resume_id }).then(function (data) {
            data.strengths.push(strength);
            mongoose_1.Promise.all([strength.save(), data.save()]).then(function (data) {
                res.status(200).send(strength);
            }).catch(function (err) {
                res.status(500).send(err);
            });
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.addWeakness = function (req, res) {
        var resume_id = req.params.id;
        var name = req.body.name;
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            });
        }
        var weakness = new weakness_1.default({
            name: name
        });
        resume_1.default.findOne({ _id: resume_id }).then(function (data) {
            data.weakness.push(weakness);
            mongoose_1.Promise.all([weakness.save(), data.save()]).then(function (data) {
                res.status(200).send(weakness);
            }).catch(function (err) {
                res.status(500).send(err);
            });
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.addObjectives = function (req, res) {
        var resume_id = req.params.id;
        var objective = req.body.objective;
        var date = req.body.date;
        var place = req.body.place;
        var declaration = req.body.declaration;
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            });
        }
        var newOjective = new objectives_1.default({
            objective: objective,
            date: date,
            place: place,
            declaration: declaration,
        });
        resume_1.default.findOne({ _id: resume_id }).then(function (data) {
            data.objectives.push(newOjective);
            mongoose_1.Promise.all([newOjective.save(), data.save()]).then(function (data) {
                res.status(200).send(newOjective);
            }).catch(function (err) {
                res.status(500).send(err);
            });
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.renderPDF = function (req, res) {
        var html = req.body.html;
        if (!html) {
            res.status(422).json({
                message: 'please provide html to proceed',
                status_code: 422
            });
        }
        var border = {
            "top": "24px",
            "right": "24px",
            "bottom": "24px",
            "left": "24px"
        };
        pdf.create(html, { border: border, format: 'A4' }).toBuffer((function (err, buffer) {
            res.send(buffer);
        }));
    };
    ResumeController.addImage = function (req, res) {
        var resumeId = req.params.id;
        var image_url = req.file.path;
        var path = image_url ? 'http://localhost:5000/' + image_url : null;
        if (!resumeId) {
            res.status(422).json({
                message: 'please provide a contact detail id',
                status_code: 422
            });
        }
        if (!path) {
            res.status(422).json({
                message: 'please upload an image to proceed',
                status_code: 422
            });
        }
        resume_1.default.findOneAndUpdate({ _id: resumeId }, { image_url: path }, { new: true }).populate("education skills languages refrences contact_details employment_history \n        award_achivements interests industrialExposures projectDetails strengths weakness objectives")
            .then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });
    };
    ResumeController.getAllResume = function (req, res) {
        var userId = req.userData.userID;
        resume_1.default.find({ user_id: userId }).populate("education skills languages refrences contact_details employment_history \n        award_achivements interests industrialExposures projectDetails strengths weakness objectives ").then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.getResume = function (req, res) {
        var resume_id = req.params.id;
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            });
        }
        resume_1.default.findOne({ _id: resume_id }).populate("education skills languages refrences contact_details employment_history \n        award_achivements interests industrialExposures projectDetails strengths weakness objectives").then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.updateResume = function (req, res) {
        var resume_id = req.params.id;
        var name = req.body.name;
        var data = {
            name: name
        };
        if (!name) {
            res.status(422).json({
                message: 'please provide a name',
                status_code: 422
            });
        }
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            });
        }
        resume_1.default.findOneAndUpdate({ _id: resume_id }, data, { new: true }).populate("education skills languages refrences contact_details employment_history \n        award_achivements interests industrialExposures projectDetails strengths weakness objectives")
            .then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.updateResumeViews = function (req, res) {
        var views = req.body.views;
        var resume_id = req.params.id;
        if (!views) {
            res.status(422).json({
                message: 'please provide views',
                status_code: 422
            });
        }
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            });
        }
        ;
        resume_1.default.findOneAndUpdate({ _id: resume_id }, { views: views }, { new: true }).populate("education skills languages refrences contact_details employment_history \n        award_achivements interests industrialExposures projectDetails strengths weakness objectives")
            .then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.updateContactDetails = function (req, res) {
        var contact_detail_id = req.params.id;
        var first_name = req.body.first_name;
        var phone_number = req.body.phone_number;
        var email = req.body.email;
        var address = req.body.address;
        var state = req.body.state;
        var city = req.body.city;
        var zip_code = req.body.zip_code;
        var country = req.body.country;
        var summary = req.body.summary;
        var last_name = req.body.last_name;
        var linkedin_url = req.body.linkedin_url;
        var website_url = req.body.website_url;
        var data = {
            first_name: first_name,
            phone_number: phone_number,
            email: email,
            address: address,
            state: state,
            city: city,
            zip_code: zip_code,
            country: country,
            summary: summary,
            last_name: last_name,
            linkedin_url: linkedin_url,
            website_url: website_url
        };
        contact_details_1.default.findOneAndUpdate({ _id: contact_detail_id }, data, { new: true }).then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.updateEducation = function (req, res) {
        var education_id = req.params.id;
        var school_name = req.body.school_name;
        var city = req.body.city;
        var state = req.body.state;
        var field = req.body.field;
        var degree_type = req.body.degree_type;
        var graduation_month = req.body.graduation_month;
        var graduation_year = req.body.graduation_year;
        var percentage = req.body.percentage;
        var data = {
            school_name: school_name,
            city: city,
            state: state,
            field: field,
            degree_type: degree_type,
            graduation_year: graduation_year,
            graduation_month: graduation_month,
            percentage: percentage,
        };
        education_1.default.findOneAndUpdate({ _id: education_id }, data, { new: true }).then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.updateEmploymentHistory = function (req, res) {
        var employment_history_id = req.params.id;
        var employer = req.body.employer;
        var organisation = req.body.organisation;
        var job_title = req.body.designation;
        var city = req.body.city;
        var state = req.body.state;
        var start_month = req.body.start_month;
        var start_year = req.body.start_year;
        var end_month = req.body.end_month ? req.body.end_month : null;
        var end_year = req.body.end_year ? req.body.end_year : null;
        var data = {
            employer: employer,
            designation: job_title,
            organisation: organisation,
            city: city,
            state: state,
            start_month: start_month,
            start_year: start_year,
            end_month: end_month,
            end_year: end_year,
        };
        employment_history_1.default.findOneAndUpdate({ _id: employment_history_id }, data, { new: true }).then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.updateLanguage = function (req, res) {
        var language_id = req.params.id;
        var name = req.body.name;
        var level = req.body.level;
        var data = {
            name: name,
            level: level,
        };
        languages_1.default.findOneAndUpdate({ _id: language_id }, data, { new: true }).then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.updateSkill = function (req, res) {
        var skill_id = req.params.id;
        var skill = req.body.skill;
        var level = req.body.level;
        var data = {
            skill: skill,
            level: level,
        };
        skills_1.default.findOneAndUpdate({ _id: skill_id }, data, { new: true }).then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.updateRefrence = function (req, res) {
        var reference_id = req.params.id;
        var name = req.body.name;
        var relationship = req.body.relationship;
        var company = req.body.company;
        var email = req.body.email;
        var phone = req.body.phone;
        var address = req.body.address;
        var data = {
            name: name,
            relationship: relationship,
            company: company,
            email: email,
            phone: phone,
            address: address,
        };
        refrences_1.default.findOneAndUpdate({ _id: reference_id }, data, { new: true }).then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.updateAwardAchivements = function (req, res) {
        var award_achivement_id = req.params.id;
        var awards_and_achivements = req.body.awards_and_achivements;
        var data = {
            awards_and_achivements: awards_and_achivements
        };
        awards_achivements_1.default.findOneAndUpdate({ _id: award_achivement_id }, data, { new: true }).then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.updateInterest = function (req, res) {
        var interest_id = req.params.id;
        var interest = req.body.interest;
        var data = {
            interest: interest
        };
        interests_1.default.findOneAndUpdate({ _id: interest_id }, data, { new: true }).then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.updateIndustrialExposure = function (req, res) {
        var industrial_exposure_id = req.params.id;
        var organisation = req.body.organisation;
        var city = req.body.city;
        var state = req.body.state;
        var start_month = req.body.start_month;
        var start_year = req.body.start_year;
        var end_month = req.body.end_month;
        var end_year = req.body.end_year;
        var work = req.body.work;
        var data = {
            organisation: organisation,
            city: city,
            state: state,
            start_month: start_month,
            start_year: start_year,
            end_month: end_month,
            end_year: end_year,
            work: work,
        };
        industrial_exposure_1.default.findOneAndUpdate({ _id: industrial_exposure_id }, data, { new: true }).then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.updateProjectDetails = function (req, res) {
        var projectDetailId = req.params.id;
        var title = req.body.title;
        var description = req.body.description;
        var duration = req.body.duration;
        var role = req.body.role;
        var data = {
            title: title,
            description: description,
            duration: duration,
            role: role,
        };
        project_details_1.default.findOneAndUpdate({ _id: projectDetailId }, data, { new: true }).then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.updateStrength = function (req, res) {
        var strengthId = req.params.id;
        var name = req.body.name;
        var data = {
            name: name
        };
        strength_1.default.findOneAndUpdate({ _id: strengthId }, data, { new: true }).then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.updateWeakness = function (req, res) {
        var weaknessId = req.params.id;
        var name = req.body.name;
        var data = {
            name: name
        };
        weakness_1.default.findOneAndUpdate({ _id: weaknessId }, data, { new: true }).then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.updateObjective = function (req, res) {
        var objectiveId = req.params.id;
        var objective = req.body.objective;
        var date = req.body.date;
        var place = req.body.place;
        var declaration = req.body.declaration;
        var data = {
            objective: objective,
            date: date,
            declaration: declaration,
            place: place,
        };
        objectives_1.default.findOneAndUpdate({ _id: objectiveId }, data, { new: true }).then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    ResumeController.deleteResume = function (req, res) {
        var resume_id = req.params.id;
        resume_1.default.findOne({ _id: resume_id }).then(function (data) {
            data.remove().then(function (data) {
                res.status(200).send(data);
            }).catch(function (err) {
                res.status(500).send(err);
            });
        });
    };
    ResumeController.deleteContactDetails = function (req, res) {
        var contactDetailsId = req.params.id;
        contact_details_1.default.findOne({ _id: contactDetailsId }).then(function (data) {
            data.remove().then(function (data) {
                res.status(200).send(data);
            }).catch(function (err) {
                console.log(err);
                res.status(500).send(err);
            });
        }).catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });
    };
    ResumeController.deleteEducation = function (req, res) {
        var educationId = req.params.id;
        education_1.default.findOne({ _id: educationId }).then(function (data) {
            data.remove().then(function (data) {
                res.status(200).send(data);
            }).catch(function (err) {
                console.log(err);
                res.status(500).send(err);
            });
        }).catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });
    };
    ResumeController.deleteEmploymentHistory = function (req, res) {
        var employmentHistoryId = req.params.id;
        employment_history_1.default.findOne({ _id: employmentHistoryId }).then(function (data) {
            data.remove().then(function (data) {
                res.status(200).send(data);
            }).catch(function (err) {
                console.log(err);
                res.status(500).send(err);
            });
        }).catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });
    };
    ResumeController.deleteLanguage = function (req, res) {
        var languageId = req.params.id;
        languages_1.default.findOne({ _id: languageId }).then(function (data) {
            data.remove().then(function (data) {
                res.status(200).send(data);
            }).catch(function (err) {
                console.log(err);
                res.status(500).send(err);
            });
        }).catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });
    };
    ResumeController.deleteSkill = function (req, res) {
        var skill_id = req.params.id;
        skills_1.default.findOne({ _id: skill_id }).then(function (data) {
            data.remove().then(function (data) {
                res.status(200).send(data);
            }).catch(function (err) {
                console.log(err);
                res.status(500).send(err);
            });
        }).catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });
    };
    ResumeController.deleteRefrence = function (req, res) {
        var refrenceId = req.params.id;
        refrences_1.default.findOne({ _id: refrenceId }).then(function (data) {
            data.remove().then(function (data) {
                res.status(200).send(data);
            }).catch(function (err) {
                console.log(err);
                res.status(500).send(err);
            });
        }).catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });
    };
    ResumeController.deleteAwardAchivements = function (req, res) {
        var awardAchivementsId = req.params.id;
        awards_achivements_1.default.findOne({ _id: awardAchivementsId }).then(function (data) {
            data.remove().then(function (data) {
                res.status(200).send(data);
            }).catch(function (err) {
                console.log(err);
                res.status(500).send(err);
            });
        }).catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });
    };
    ResumeController.deleteInterest = function (req, res) {
        var interestId = req.params.id;
        interests_1.default.findOne({ _id: interestId }).then(function (data) {
            data.remove().then(function (data) {
                res.status(200).send(data);
            }).catch(function (err) {
                console.log(err);
                res.status(500).send(err);
            });
        }).catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });
    };
    ResumeController.deleteIndustrialExposure = function (req, res) {
        var industrialExposureId = req.params.id;
        industrial_exposure_1.default.findOne({ _id: industrialExposureId }).then(function (data) {
            data.remove().then(function (data) {
                res.status(200).send(data);
            }).catch(function (err) {
                console.log(err);
                res.status(500).send(err);
            });
        }).catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });
    };
    ResumeController.deleteProjectDetails = function (req, res) {
        var projectDetailId = req.params.id;
        project_details_1.default.findOne({ _id: projectDetailId }).then(function (data) {
            data.remove().then(function (data) {
                res.status(200).send(data);
            }).catch(function (err) {
                console.log(err);
                res.status(500).send(err);
            });
        }).catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });
    };
    ResumeController.deleteStrength = function (req, res) {
        var strengthId = req.params.id;
        strength_1.default.findOne({ _id: strengthId }).then(function (data) {
            data.remove().then(function (data) {
                res.status(200).send(data);
            }).catch(function (err) {
                console.log(err);
                res.status(500).send(err);
            });
        }).catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });
    };
    ResumeController.deleteWeakness = function (req, res) {
        var weaknessId = req.params.id;
        weakness_1.default.findOne({ _id: weaknessId }).then(function (data) {
            data.remove().then(function (data) {
                res.status(200).send(data);
            }).catch(function (err) {
                console.log(err);
                res.status(500).send(err);
            });
        }).catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });
    };
    ResumeController.deleteObjective = function (req, res) {
        var objectiveId = req.params.id;
        objectives_1.default.findOne({ _id: objectiveId }).then(function (data) {
            data.remove().then(function (data) {
                res.status(200).send(data);
            }).catch(function (err) {
                console.log(err);
                res.status(500).send(err);
            });
        }).catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });
    };
    ResumeController.importVideo = function (req, res) {
        var resumeId = req.params.id;
        var video_url = req.body.video_url;
        if (!resumeId) {
            res.status(422).json({
                message: 'please provide a correct Resume  id',
                status_code: 422
            });
        }
        resume_1.default.findOneAndUpdate({ _id: resumeId }, { video_url: video_url }, { new: true }).populate("education skills languages refrences contact_details employment_history \n        award_achivements interests industrialExposures projectDetails strengths weakness objectives")
            .then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });
    };
    ResumeController.deleteImage = function (req, res) {
        var resumeId = req.params.id;
        if (!resumeId) {
            return res.status(422).json({
                message: 'please provide a correct resume Id',
                status_code: 422
            });
        }
        resume_1.default.findOneAndUpdate({ _id: resumeId }, { image_url: null }, { new: true }).populate("education skills languages refrences contact_details employment_history \n        award_achivements interests industrialExposures projectDetails strengths weakness objectives")
            .then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    return ResumeController;
}());
exports.ResumeController = ResumeController;
//delete working fine on -
// interest
// education
//employment history
//# sourceMappingURL=resume-controller.js.map