import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../error";

//signup
export const signup = async (req: Request, res: Response, next: any) => {
  console.log(req.body);
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();
    console.log(newUser);
    res.status(201).json("User created successfully!");
  } catch (err) {
    next(err);
  }
};

// sigin
export const signin = async (req: Request, res: Response, next: any) => {
  console.log(req.body);
  try {
    const user: any = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("User not found!");

    const isCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isCorrectPassword) return next(createError("Invalid password!", 400));

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY!);
    const { password, ...others } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};
