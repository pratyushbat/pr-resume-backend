"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var nodemailer_1 = require("../nodemailer");
var ContactUsRouter = /** @class */ (function () {
    function ContactUsRouter() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    ContactUsRouter.prototype.routes = function () {
        this.router.post('', this.sendEmail);
    };
    ContactUsRouter.prototype.sendEmail = function (req, res) {
        if (!req.body.name || !req.body.email || !req.body.message) {
            res.status(422).json({
                message: 'please provide a valid name, email and message ',
                status_code: 422
            });
        }
        else {
            var html = "<h3>You have recieved new query</h3> \n<h2>Full name :  ".concat(req.body.name, "</h2>\n<h2>email :  ").concat(req.body.email, "</h2>\n<h2>message :  ").concat(req.body.message, "</h2>");
            nodemailer_1.Nodemailer.sendEmail('shagungarg2010@gmail.com', 'shagungarg20170@gmail.com', 'recieved new query', html).then(function () {
                res.status(200).json({
                    message: 'Email sent Successfully'
                });
            });
        }
    };
    return ContactUsRouter;
}());
exports.default = new ContactUsRouter().router;
//name email
//# sourceMappingURL=contact-us-router.js.map