"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../error");
//signup
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, salt);
        const newUser = new User_1.default(Object.assign(Object.assign({}, req.body), { password: hashedPassword }));
        yield newUser.save();
        console.log(newUser);
        res.status(201).json("User created successfully!");
    }
    catch (err) {
        next(err);
    }
});
exports.signup = signup;
// sigin
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).json("User not found!");
        const isCorrectPassword = yield bcryptjs_1.default.compare(req.body.password, user.password);
        if (!isCorrectPassword)
            return next((0, error_1.createError)("Invalid password!", 400));
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.SECRET_KEY);
        const _a = user._doc, { password } = _a, others = __rest(_a, ["password"]);
        res
            .cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json(others);
    }
    catch (err) {
        next(err);
    }
});
exports.signin = signin;
