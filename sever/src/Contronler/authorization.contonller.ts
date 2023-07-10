import pool from "../Service/Connection";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

interface IResult  {
  id_user: string;
  email_user: string;
  password_user: string;
  fistname_user: string | null;
  lastname_user: string | null;
  phone_user: number | null;
  age: number | null;
  role: number;
  img_user: string | null;
  id_topic: string | null;
}
const postLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const query = "select * from modules_4.user where email_user = ? ";
    const [rows]:any = await pool.promise().execute(query, [email]);
    if (Array.isArray(rows) && rows.length > 0) {
      const result: IResult = rows[0];
      const isPassword = result;
      bcrypt.compare(password, isPassword.password_user, (err, decode) => {
        if (err) {
          return res.status(500).json({ message: "Mật khẩu không đúng" });
        }
        if (decode) {
          const token = jwt.sign(
            { id: result.id_user, role: result.role },
            process.env.SECRET!,
            { expiresIn: "7d" }
          );
          return res.status(200).json({
            message: "Đăng nhập thành công",
            data: result,
            token: token,
          });
        } else {
          return res.status(400).json({ message: "Mật khẩu không đúng" });
        }
      });
    } else {
      return res.status(400).json({ message: "Email không dúng" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export { postLogin };
