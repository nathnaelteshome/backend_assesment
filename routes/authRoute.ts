import express from "express";
import { signin, signup } from "../controller/auth";

const router = express.Router();
//Create a user
router.post("/signup", signup);
// Sign in
router.post("/signin", signin);

export default router;
