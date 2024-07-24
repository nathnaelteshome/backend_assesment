import mongoose from "mongoose";

export interface IComment extends Document {
  content: string;
  date: Date;
  author: mongoose.Types.ObjectId;
  recipe: mongoose.Types.ObjectId;
}
