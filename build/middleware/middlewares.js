"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var jwt = require('jsonwebtoken');
var auth = function (req, res, next) {
    try {
        var token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
        var decoded = jwt.verify(token, 'secret', function (err, decoded) {
            if (err) {
                return res.status(401).json({
                    message: 'Authentication failed',
                    status_code: 401
                });
            }
            req.userData = decoded;
            next();
        });
    }
    catch (error) {
        next(error);
    }
};
exports.auth = auth;
//# sourceMappingURL=middlewares.js.map