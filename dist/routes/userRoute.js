"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../middleware/verifyToken");
const user_1 = require("../controller/user");
const router = express_1.default.Router();
//update user
router.put("/:id", verifyToken_1.verifyToken, user_1.updateUser);
//delete user
router.delete("/:id", verifyToken_1.verifyToken, user_1.deleteUser);
//get a user
router.get("/find/:id", verifyToken_1.verifyToken, user_1.getUser);
exports.default = router;
