import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
  };
}

export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = (authHeader as string).split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err: any, user: any) => {
      if (err) return res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

export const verifyTokenAndAuthorization = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    if (req.user.userId === req.params.id) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};
// module.exports = {
//   verifyToken,
//   verifyTokenAndAuthorization,
// };
// VKJKv
