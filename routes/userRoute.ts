import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import { deleteUser, getUser, updateUser } from "../controller/user";

const router = express.Router();

//update user
router.put("/:id", verifyToken, updateUser);
//delete user
router.delete("/:id", verifyToken, deleteUser);
//get a user
router.get("/find/:id", verifyToken, getUser);
export default router;
