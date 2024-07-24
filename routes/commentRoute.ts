import express from "express";
import {
  addComment,
  deleteComment,
  getCommentsByRecipe,
  updateComment,
} from "../controller/comment";
import {
  verifyToken,
  verifyTokenAndAuthorization,
} from "../middleware/verifyToken";

const router = express.Router();

router.post("/comments", verifyToken as any, addComment);
router.get("/comments/:recipeId", getCommentsByRecipe);
router.put("/comments/:id", verifyTokenAndAuthorization as any, updateComment);
router.delete(
  "/comments/:id",
  verifyTokenAndAuthorization as any,
  deleteComment
);

export default router;
