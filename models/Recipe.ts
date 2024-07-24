import mongoose, { model, Schema } from "mongoose";
import { IRecipe } from "../types/recipe";

const RecipeSchema: Schema = new Schema({
  title: { type: String, required: true },
  ingredients: [
    {
      item: { type: String, required: true },
      quantity: { type: String, required: true },
    },
  ],
  instructions: { type: String, required: true },
  preparationTime: { type: Number, required: true },
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

export default model<IRecipe>("Recipe", RecipeSchema);
