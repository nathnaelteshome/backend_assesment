import { model, Schema } from "mongoose";
import { IUser } from "../types/user";

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default model<IUser>("User", UserSchema);
