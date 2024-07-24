"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recipe_1 = require("../controller/recipe");
const verifyToken_1 = require("../middleware/verifyToken");
const router = express_1.default.Router();
router.post("/recipes", verifyToken_1.verifyToken, recipe_1.addRecipe);
router.get("/recipes", recipe_1.getAllRecipes);
router.get("/recipes/:id", recipe_1.getRecipeById);
router.put("/recipes/:id", verifyToken_1.verifyTokenAndAuthorization, recipe_1.updateRecipe); // Update the type of verifyTokenAndAuthorization to any
router.delete("/recipes/:id", verifyToken_1.verifyTokenAndAuthorization, recipe_1.deleteRecipe);
exports.default = router;
