"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controller/auth");
const router = express_1.default.Router();
//Create a user
router.post("/signup", auth_1.signup);
// Sign in
router.post("/signin", auth_1.signin);
exports.default = router;
