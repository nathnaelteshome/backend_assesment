import mongoose, { model, Schema } from "mongoose";
import { IComment } from "../types/comment";

const CommentSchema: Schema = new Schema({
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  recipe: { type: mongoose.Types.ObjectId, ref: "Recipe", required: true },
});

export default model<IComment>("Comment", CommentSchema);
