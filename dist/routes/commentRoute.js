"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_1 = require("../controller/comment");
const verifyToken_1 = require("../middleware/verifyToken");
const router = express_1.default.Router();
router.post("/comments", verifyToken_1.verifyToken, comment_1.addComment);
router.get("/comments/:recipeId", comment_1.getCommentsByRecipe);
router.put("/comments/:id", verifyToken_1.verifyTokenAndAuthorization, comment_1.updateComment);
router.delete("/comments/:id", verifyToken_1.verifyTokenAndAuthorization, comment_1.deleteComment);
exports.default = router;
