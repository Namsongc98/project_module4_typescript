import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const authentization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    const isAuthorization = authorization?.split(" ")[1];
    if (!isAuthorization) {
      return res.status(401).json({
        message: "Bạn không có quyền truy cập",
      });
    } else {
      jwt.verify(isAuthorization!, process.env.SECRET!, (error) => {
        if (error) {
          return res.status(401).json({
            message: error,
          });
        } else {
          next();
        }
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export { authentization };
