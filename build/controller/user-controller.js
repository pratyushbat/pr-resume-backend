"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var user_1 = require("../models/user");
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
var moment = require("moment");
var nodemailer_1 = require("../nodemailer");
var randomstring = require("randomstring");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.signUp = function (req, res) {
        if (!req.body.email && !req.body.password) {
            res.status(422).json({
                message: 'Please provide all details',
                status_code: 422
            });
        }
        else if (!req.body.email) {
            res.status(422).json({
                message: 'Please provide an email',
                status_code: 422
            });
        }
        else if (!req.body.password || !req.body.confirm_password) {
            res.status(422).json({
                message: 'Please provide a password and confirm password',
                status_code: 422
            });
        }
        else if (req.body.password !== req.body.confirm_password) {
            res.status(422).json({
                message: 'Password and confirm password does not match',
                status_code: 422
            });
        }
        else if (!req.body.name) {
            res.status(422).json({
                message: 'Please provide your full name',
                status_code: 422
            });
        }
        else if (!req.body.job_category) {
            res.status(422).json({
                message: 'Please provide your job Category',
                status_code: 422
            });
        }
        else if (!req.body.experience_level) {
            res.status(422).json({
                message: 'Please provide your Experience Level',
                status_code: 422
            });
        }
        else {
            user_1.default.find({ email: req.body.email })
                .exec()
                .then(function (user) {
                if (user.length >= 1) {
                    return res.status(409).json({
                        message: "Mail already exists",
                        status_code: 409
                    });
                }
                else {
                    bcrypt.hash(req.body.password, 10, function (err, hash) {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        else {
                            var user_2 = new user_1.default({
                                email: req.body.email,
                                password: hash,
                                name: req.body.name,
                                experience_level: req.body.experience_level,
                                job_category: req.body.job_category,
                                code: randomstring.generate()
                            });
                            user_2
                                .save()
                                .then(function (data) {
                                var uri = data.code;
                                var html = (0, nodemailer_1.EmailVerificationHtml)(uri);
                                // return Nodemailer.sendEmail(' Digi Resume <contact@digiresumes.com>', req.body.email,
                                //     'email verification', html).then(() => {
                                //     return res.status(201).send(data)
                                // })
                                // temp line added
                                return res.status(200).send(data);
                            })
                                .catch(function (err) {
                                return res.status(500).send(err);
                            });
                        }
                    });
                }
            });
        }
    };
    ;
    UserController.verify = function (req, res) {
        var code = req.params.code;
        user_1.default.findOneAndUpdate({ code: code }, { verified: true }).exec().then(function (user) {
            if (user) {
                res.redirect('https://www.digiresumes.com');
            }
            else {
                res.send('email not verified. please try by clicking send email again');
            }
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    UserController.getUserDetails = function (req, res) {
        var date = moment().format('LLLL');
        var userId = req.userData.userID;
        user_1.default.findOneAndUpdate({ _id: userId }, { last_active: date }, { new: true })
            .select('onboarding verified _id email password name code last_active experience_level job_category')
            .then(function (data) {
            res.status(200).send(data);
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    UserController.login = function (req, res) {
        var email = req.query.email;
        var password = req.query.password;
        if (!email || !password) {
            res.status(422).json({
                message: 'please provide an email and password',
                status_code: 422
            });
        }
        user_1.default.find({ email: email }).select('onboarding verified _id email password name code last_active experience_level job_category')
            .exec().then(function (user) {
            if (user.length < 1) {
                return res.status(422).json({
                    message: "Email Does not exist",
                    status_code: 422
                });
            }
            var User = user[0];
            bcrypt.compare(password, User.password, function (err, result) {
                if (err) {
                    return res.status(422).json({
                        message: "Email and password does not match",
                        status_code: 422
                    });
                }
                if (result) {
                    var token = jwt.sign({
                        email: User.email,
                        userID: User._id
                    }, 'secret', {
                        expiresIn: '10days'
                    });
                    return res.status(200).json({
                        token: token,
                        user: User
                    });
                }
                else {
                    return res.status(422).json({
                        message: "Email and password does not match",
                        status_code: 422
                    });
                }
            });
        }).catch(function (err) {
            res.status(500).send(err);
        });
    };
    UserController.sendEmailVerification = function (req, res) {
        var code = req.query.code;
        var email = req.query.email;
        if (!code) {
            res.status(500).json({
                message: 'Please send a valid code',
                status_code: 500
            });
        }
        if (!email) {
            res.status(500).json({
                message: 'Please send a email',
                status_code: 500
            });
        }
        else {
            var html = (0, nodemailer_1.EmailVerificationHtml)(code);
            return nodemailer_1.Nodemailer.sendEmail('shagungarg2010@gmail.com', email, 'email verification', html)
                .then(function (data) {
                return res.status(201).send(data);
            }).catch(function (err) {
                return res.status(500).send(err);
            });
        }
    };
    UserController.updatePassword = function (req, res) {
        var oldPassword = req.body.old_password;
        var newPassword = req.body.new_password;
        var confirmPassword = req.body.confirm_password;
        var userId = req.userData.userID;
        if (!oldPassword || !newPassword || !confirmPassword) {
            res.status(422).json({
                message: "Please provide old,new and confirm password",
                status_code: 422
            });
        }
        else if (newPassword !== confirmPassword) {
            res.status(422).json({
                message: "new password and confirm password does'nt match",
                status_code: 422
            });
        }
        else {
            user_1.default.findOne({ _id: userId }).then(function (response) {
                bcrypt.compare(oldPassword, response.password, function (err, data) {
                    console.log(err, data);
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else if (data) {
                        bcrypt.hash(newPassword, 10, function (err, hash) {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            else {
                                newPassword = hash;
                                return user_1.default.findOneAndUpdate({ _id: userId }, { password: newPassword }, { new: true })
                                    .exec().then(function (data) {
                                    return res.status(200).send(data);
                                }).catch(function (err) {
                                    return res.status(500).send(err);
                                });
                            }
                        });
                    }
                    else {
                        return res.status(422).json({
                            message: "old password does'nt match",
                            status_code: 422
                        });
                    }
                });
            }).catch(function (err) {
                return res.status(500).send(err);
            });
        }
    };
    UserController.updateProfile = function (req, res) {
        var name = req.body.name;
        var job_category = req.body.job_category;
        var experience_level = req.body.experience_level;
        var userId = req.userData.userID;
        if (!name) {
            res.status(422).json({
                message: "Please provide your name",
                status_code: 422
            });
        }
        else if (!experience_level) {
            res.status(422).json({
                message: "Please provide your Experience Level",
                status_code: 422
            });
        }
        else if (!job_category) {
            res.status(422).json({
                message: "Please provide your Job Category",
                status_code: 422
            });
        }
        else {
            var data = {
                name: name,
                job_category: job_category,
                experience_level: experience_level
            };
            user_1.default.findOneAndUpdate({ _id: userId }, data, { new: true }).exec().then(function (data) {
                res.status(200).send(data);
            }).catch(function (err) {
                res.status(500).send(err);
            });
        }
    };
    UserController.updateOnboarding = function (req, res) {
        var onboarding = req.body.onboarding;
        var userId = req.userData.userID;
        if (!onboarding) {
            res.status(422).json({
                message: "Please provide value of onboarding",
                status_code: 422
            });
        }
        else {
            user_1.default.findOneAndUpdate({ _id: userId }, { onboarding: onboarding }, { new: true }).exec().then(function (data) {
                res.status(200).send(data);
            }).catch(function (err) {
                res.status(500).send(err);
            });
        }
    };
    UserController.updateName = function (req, res) {
        var name = req.body.name;
        var userId = req.userData.userID;
        if (!name) {
            res.status(422).json({
                message: "Please provide your name",
                status_code: 422
            });
        }
        else {
            user_1.default.findOneAndUpdate({ _id: userId }, { name: name }, { new: true }).exec().then(function (data) {
                res.status(200).send(data);
            }).catch(function (err) {
                res.status(500).send(err);
            });
        }
    };
    UserController.sendResetPasswordMail = function (req, res) {
        var email = req.query.email;
        if (!email) {
            res.status(422).json({
                message: 'Please send an email',
                status_code: 422
            });
        }
        else {
            user_1.default.findOne({ email: email }).then(function (data) {
                var code = data.code;
                var html = (0, nodemailer_1.PasswordResetHtml)(code);
                nodemailer_1.Nodemailer.sendEmail(' Digi Resume <contact@digiresumes.com>', email, 'Password Reset Email', html).then(function () {
                    res.status(200).json({
                        message: 'A password email has been sent to you',
                        status_code: 200
                    });
                });
                // res.status(200).json({
                //     message: 'A password email has been sent to you',
                //     code:code,
                //     status_code: 200
                // });
            });
        }
    };
    UserController.resetPassword = function (req, res) {
        var code = req.body.code;
        var new_password = req.body.new_password;
        var confirm_password = req.body.confirm_password;
        if (!code || !new_password || !confirm_password) {
            res.status(422).json({
                message: 'Please send a valid code , password and confirm password',
                status_code: 422
            });
        }
        else if (confirm_password !== new_password) {
            res.status(422).json({
                message: "new password and confirm password does'nt match",
                status_code: 422
            });
        }
        else {
            bcrypt.hash(new_password, 10, function (err, hash) {
                if (err) {
                    return res.status(500).send(err);
                }
                else {
                    new_password = hash;
                    return user_1.default.findOneAndUpdate({ code: code }, { password: new_password }, { new: true })
                        .exec().then(function (data) {
                        return res.status(200).send(data);
                    }).catch(function (err) {
                        return res.status(500).send(err);
                    });
                }
            });
        }
    };
    UserController.InitializeApp = function (req, res) {
        res.status(200).json({
            message: 'App initialized successfully',
            status_code: 200
        });
    };
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=user-controller.js.map