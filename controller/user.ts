import { Request, Response, NextFunction } from "express";
import { createError } from "../error";
import User from "../models/User";
interface CustomRequest extends Request {
  user?: {
    id: string;
  };
}

//Update user
export const updateUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.params.id === req.user.id) {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } else {
    return next(
      createError("You are not authorized to  update this user", 403)
    );
  }
};

//Delete a user
export const deleteUser = async (
  req: CustomRequest,
  res: Response,
  next: any
) => {
  if (req.user && req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (error) {
      return next(error);
    }
  } else {
    return next(createError("You are not authorized to delete this user", 403));
  }
};

// get a user
export const getUser = async (req: CustomRequest, res: Response, next: any) => {
  if (req.user && req.params.id === req.user.id) {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  } else {
    return next(createError("You are not authorized to get this user", 403));
  }
};
