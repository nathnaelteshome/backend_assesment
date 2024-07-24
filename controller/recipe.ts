import { Request, Response } from "express";
import Recipe from "../models/Recipe";

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
  };
}

// Add a new recipe
export const addRecipe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, ingredients, instructions, preparationTime } = req.body;
    const userId = req.user.userId;
    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      preparationTime,
      user: userId,
    });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// View all recipes
export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find().populate("user", "firstName lastName");
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// View a specific recipe
export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id).populate(
      "user",
      "firstName lastName"
    );
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Remove recipe
export const deleteRecipe = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId; // Assuming user ID is available in the request object

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Recipe.findByIdAndDelete(id);
    res.json({ message: "Recipe deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Edit an existing recipe
export const updateRecipe = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { title, ingredients, instructions, preparationTime } = req.body;
    const userId = req.user.userId; // Assuming user ID is available in the request object

    const recipe = await Recipe.findById(id);
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

    await recipe.save();
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
