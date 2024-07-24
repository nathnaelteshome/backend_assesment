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
exports.updateRecipe = exports.deleteRecipe = exports.getRecipeById = exports.getAllRecipes = exports.addRecipe = void 0;
const Recipe_1 = __importDefault(require("../models/Recipe"));
// Add a new recipe
const addRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, ingredients, instructions, preparationTime } = req.body;
        const userId = req.user.userId;
        const newRecipe = new Recipe_1.default({
            title,
            ingredients,
            instructions,
            preparationTime,
            user: userId,
        });
        yield newRecipe.save();
        res.status(201).json(newRecipe);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.addRecipe = addRecipe;
// View all recipes
const getAllRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield Recipe_1.default.find().populate("user", "firstName lastName");
        res.json(recipes);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllRecipes = getAllRecipes;
// View a specific recipe
const getRecipeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const recipe = yield Recipe_1.default.findById(id).populate("user", "firstName lastName");
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.json(recipe);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getRecipeById = getRecipeById;
// Remove recipe
const deleteRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.user.userId; // Assuming user ID is available in the request object
        const recipe = yield Recipe_1.default.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        if (recipe.user.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        yield Recipe_1.default.findByIdAndDelete(id);
        res.json({ message: "Recipe deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteRecipe = deleteRecipe;
// Edit an existing recipe
const updateRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, ingredients, instructions, preparationTime } = req.body;
        const userId = req.user.userId; // Assuming user ID is available in the request object
        const recipe = yield Recipe_1.default.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        if (recipe.user.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        recipe.title = title;
        recipe.ingredients = ingredients;
        recipe.instructions = instructions;
        recipe.preparationTime = preparationTime;
        yield recipe.save();
        res.json(recipe);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateRecipe = updateRecipe;
