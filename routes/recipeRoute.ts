import express from "express";
import {
  addRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
} from "../controller/recipe";
import {
  verifyToken,
  verifyTokenAndAuthorization,
} from "../middleware/verifyToken";

const router = express.Router();

router.post("/recipes", verifyToken as any, addRecipe as any);
router.get("/recipes", getAllRecipes);
router.get("/recipes/:id", getRecipeById);
router.put(
  "/recipes/:id",
  verifyTokenAndAuthorization as any,
  updateRecipe as any
); // Update the type of verifyTokenAndAuthorization to any
router.delete(
  "/recipes/:id",
  verifyTokenAndAuthorization as any,
  deleteRecipe as any
);

export default router;
