"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../controller/user-controller");
var middlewares_1 = require("../middleware/middlewares");
var UserRouter = /** @class */ (function () {
    function UserRouter() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    UserRouter.prototype.routes = function () {
        this.router.post('/signup', user_controller_1.UserController.signUp);
        this.router.get('/login', user_controller_1.UserController.login);
        this.router.get('/initialize', user_controller_1.UserController.InitializeApp);
        this.router.get('/verify/:code', user_controller_1.UserController.verify);
        this.router.get('/fetch', middlewares_1.auth, user_controller_1.UserController.getUserDetails);
        this.router.get('/send/emailverification', user_controller_1.UserController.sendEmailVerification);
        this.router.patch('/update/profile', middlewares_1.auth, user_controller_1.UserController.updateProfile);
        this.router.patch('/update/name', middlewares_1.auth, user_controller_1.UserController.updateName);
        this.router.patch('/update/password', middlewares_1.auth, user_controller_1.UserController.updatePassword);
        this.router.patch('/update/onboarding', middlewares_1.auth, user_controller_1.UserController.updateOnboarding);
        this.router.get('/reset/password/email', user_controller_1.UserController.sendResetPasswordMail);
        this.router.patch('/reset/password', user_controller_1.UserController.resetPassword);
    };
    return UserRouter;
}());
exports.default = new UserRouter().router;
//# sourceMappingURL=user-router.js.map