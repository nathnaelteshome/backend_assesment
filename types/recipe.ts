import mongoose from "mongoose";
import { Document } from "mongoose";

export interface IRecipe extends Document {
  title: string;
  ingredients: { item: string; quantity: string }[];
  instructions: string;
  preparationTime: number;
  user: mongoose.Types.ObjectId;
}
