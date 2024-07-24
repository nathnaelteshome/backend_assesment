import { Request, Response } from "express";
import Recipe from "../models/Recipe";
import Comment from "../models/Comment";
interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
  };
}

//create comment
export const addComment = async (req: AuthenticatedRequest, res: Response) => {
  const { content, recipeId } = req.body;
  const userId = req.user.userId;

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  const newComment = new Comment({ content, author: userId, recipe: recipeId });
  await newComment.save();
  res.status(201).json(newComment);
};

// View all comments on a recipe
export const getCommentsByRecipe = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { recipeId } = req.params;
  const comments = await Comment.find({ recipe: recipeId }).populate(
    "author",
    "firstName lastName"
  );
  res.json(comments);
};
// Edit an existing comment
export const updateComment = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { id } = req.params;
  const { content } = req.body;
  const userId = req.user.userId; // Assuming user ID is available in the request object

  const comment = await Comment.findById(id);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (comment.author.toString() !== userId.toString()) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  comment.content = content;
  await comment.save();
  res.json(comment);
};
// Remove a comment
export const deleteComment = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { id } = req.params;
  const userId = req.user.userId; // Assuming user ID is available in the request object

  const comment = await Comment.findById(id);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (comment.author.toString() !== userId.toString()) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  await Comment.findByIdAndDelete(id);
  res.json({ message: "Comment deleted" });
};
