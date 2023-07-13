
import pool from "../Service/Connection";
import { NextFunction, Request, Response } from 'express';
const checkEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const query = "select email_user from modules_4.user where email_user = ? ";
    const [rows] = await pool.promise().execute(query, [email]);
    if (Array.isArray(rows) && rows.length > 0)
      return res.status(400).json({ message: " Email đã có người sử dụng" });
    next();
  } catch (error) {
    return res.status(500).json({ message: "Invalid rows data" });
  }
};

export { checkEmail };
