"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenAndAuthorization = exports.verifyToken = void 0;
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err)
                return res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        });
    }
    else {
        return res.status(401).json("You are not authenticated!");
    }
};
exports.verifyToken = verifyToken;
const verifyTokenAndAuthorization = (req, res, next) => {
    (0, exports.verifyToken)(req, res, () => {
        if (req.user.userId === req.params.id) {
            next();
        }
        else {
            res.status(403).json("You are not allowed to do that!");
        }
    });
};
exports.verifyTokenAndAuthorization = verifyTokenAndAuthorization;
// module.exports = {
//   verifyToken,
//   verifyTokenAndAuthorization,
// };
// VKJKv
