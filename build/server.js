"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
var user_router_1 = require("./routers/user-router");
var contact_us_router_1 = require("./routers/contact-us-router");
var resume_router_1 = require("./routers/resume-router");
var environment_dev_1 = require("./environments/environment.dev");
var Server = /** @class */ (function () {
    // DIST_FOLDER = join(process.cwd(), 'dist');
    // APP_NAME = 'resume-builder';
    function Server() {
        this.corsOptions = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: '*',
            preflightContinue: false
        };
        this.app = express();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        var MONGO_URI = environment_dev_1.environment.db_url;
        mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(function () {
            console.log('connected to database');
        }).catch(function (err) {
            console.log('db error hai', err);
        });
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use('*', cors(this.corsOptions));
    };
    Server.prototype.routes = function () {
        // cal these routes which are commented our to run angular on server side only.
        // paste angular code in a dist folder only
        // const router: express.Router = express.Router();
        // this.app.get('*.*', express.static(join(this.DIST_FOLDER, this.APP_NAME)));
        // // this.app.get('/', (req: Request, res: Response) => {
        // //     res.sendFile(join(this.DIST_FOLDER, this.APP_NAME, 'home.html'));
        // // });
        // this.app.get('/get-started/', (req: Request, res: Response) => {
        //     res.sendFile(join(this.DIST_FOLDER, this.APP_NAME, 'get-started.html'));
        // });
        // this.app.get('/get-started/*', (req: Request, res: Response) => {
        //     res.sendFile(join(this.DIST_FOLDER, this.APP_NAME, 'get-started.html'));
        // });
        // this.app.get('/login/', (req: Request, res: Response) => {
        //     res.sendFile(join(this.DIST_FOLDER, this.APP_NAME, 'login.html'));
        // });
        // this.app.get('/login/*', (req: Request, res: Response) => {
        //     res.sendFile(join(this.DIST_FOLDER, this.APP_NAME, 'login.html'));
        // });
        // this.app.get('/about-us', (req: Request, res: Response) => {
        //     res.sendFile(join(this.DIST_FOLDER, this.APP_NAME, 'about-us.html'));
        // });
        // this.app.get('/about-us/*', (req: Request, res: Response) => {
        //     res.sendFile(join(this.DIST_FOLDER, this.APP_NAME, 'about-us.html'));
        // });
        // this.app.get('/contact-us', (req: Request, res: Response) => {
        //     res.sendFile(join(this.DIST_FOLDER, this.APP_NAME, 'contact-us.html'));
        // });
        // this.app.get('/password/*', (req: Request, res: Response) => {
        //     res.sendFile(join(this.DIST_FOLDER, this.APP_NAME, 'index.html'));
        // });
        // this.app.get('/logout', (req: Request, res: Response) => {
        //     res.sendFile(join(this.DIST_FOLDER, this.APP_NAME, 'index.html'));
        // });
        // this.app.get('/contact-us/*', (req: Request, res: Response) => {
        //     res.sendFile(join(this.DIST_FOLDER, this.APP_NAME, 'contact-us.html'));
        // });
        // this.app.get('/user/*', (req: Request, res: Response) => {
        //     res.sendFile(join(this.DIST_FOLDER, this.APP_NAME, 'index.html'));
        // });
        // this.app.get('/user/', (req: Request, res: Response) => {
        //     res.sendFile(join(this.DIST_FOLDER, this.APP_NAME, 'index.html'));
        // });
        this.app.use('/src/uploads', express.static('src/uploads'));
        this.app.use('/api/user', user_router_1.default);
        this.app.use('/api/contact', contact_us_router_1.default);
        this.app.use('/api/resume', resume_router_1.default);
        this.app.use(this.logErrors);
        this.app.use(this.errorHandle);
    };
    Server.prototype.errorHandle = function (error, req, res, next) {
        {
            res.status(error.status || 500);
            res.json({
                error: error.message
            });
        }
    };
    Server.prototype.logErrors = function (req, res, next) {
        var error;
        error = new Error('Not Found');
        error.status = 404;
        next(error);
    };
    return Server;
}());
exports.Server = Server;
exports.default = new Server().app;
//# sourceMappingURL=server.js.map