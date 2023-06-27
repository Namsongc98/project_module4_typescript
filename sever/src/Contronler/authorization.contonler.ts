import pool from "../Service/Connection";
import {NextFunction,  Request, Response } from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require('dotenv').config();
const postLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const query = "select * from modules_4.user where email_user = ? ";
    const [rows] = await pool.promise().execute(query, [email]);
    if (Array.isArray(rows) && rows.length > 0) {
      const result: any = rows[0];
      const isPassword = result.password_user;
      bcrypt.compare(password, isPassword, (err, decode) => {
        if(err){
          return res.status(500).json({ message: err });
        }
        if (decode) {
          
          const token = jwt.sign({ id: result.id_user, role: result.role },process.env.SECRET!,{ expiresIn: '20s' });
          return res.status(200).json({
            message: "Đăng nhập thành công",
            data: result,
            token:token
          });
        } else {
          return res.status(401).json({ message: "Mật khẩu không đúng" });
        }
      });
    }else{
      return res.status(401).json({ message: "Email không dúng" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export { postLogin };
