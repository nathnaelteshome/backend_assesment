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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.getCommentsByRecipe = exports.addComment = void 0;
const Recipe_1 = __importDefault(require("../models/Recipe"));
const Comment_1 = __importDefault(require("../models/Comment"));
//create comment
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, recipeId } = req.body;
    const userId = req.user.userId;
    const recipe = yield Recipe_1.default.findById(recipeId);
    if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
    }
    const newComment = new Comment_1.default({ content, author: userId, recipe: recipeId });
    yield newComment.save();
    res.status(201).json(newComment);
});
exports.addComment = addComment;
// View all comments on a recipe
const getCommentsByRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recipeId } = req.params;
    const comments = yield Comment_1.default.find({ recipe: recipeId }).populate("author", "firstName lastName");
    res.json(comments);
});
exports.getCommentsByRecipe = getCommentsByRecipe;
// Edit an existing comment
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.userId; // Assuming user ID is available in the request object
    const comment = yield Comment_1.default.findById(id);
    if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.author.toString() !== userId.toString()) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    comment.content = content;
    yield comment.save();
    res.json(comment);
});
exports.updateComment = updateComment;
// Remove a comment
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user.userId; // Assuming user ID is available in the request object
    const comment = yield Comment_1.default.findById(id);
    if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.author.toString() !== userId.toString()) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    yield Comment_1.default.findByIdAndDelete(id);
    res.json({ message: "Comment deleted" });
});
exports.deleteComment = deleteComment;
