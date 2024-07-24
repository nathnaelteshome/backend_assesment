import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoute from "./routes/authRoute";
import commentRoute from "./routes/commentRoute";
import recipeRoute from "./routes/recipeRoute";
import userRoute from "./routes/userRoute";

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.i0a9qcb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
console.log(process.env.MONGO_USER);

mongoose
  .connect(uri)
  .then(() =>
    app.listen(
      PORT,
      () => (
        console.log(`Server running on http://localhost:${PORT}`),
        console.log("connected to DB")
      )
    )
  )
  .catch((error) => {
    console.log("error", error);
  });

app.use("/api/users", userRoute);
app.use("/api/reciepe", recipeRoute);

app.use("/api/comment", commentRoute);
app.use("/api/auth", authRoute);
