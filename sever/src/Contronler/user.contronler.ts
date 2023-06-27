import pool from "../Service/Connection";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

const getUser = async (req: Request, res: Response) => {
 
  try {
    const query = "SELECT * FROM modules_4.user;";
    const [rows] = await pool.promise().execute(query);
    res.status(200).json({
       message: "Lấy dữ liệu người dùng thành công" ,
       data: rows
      });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};


// register
const postUser = (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  const id_user = uuidv4();
  const query = `insert into modules_4.user (id_user,email_user,password_user,role) values ( ?,?,?,? )`;
  bcrypt.hash(password, 10, (error: any, hash: any) => {
    if (error) return res.status(500).json({ message: error });
    pool
      .promise()
      .execute(query, [id_user, email, hash, role])
      .then(() => res.status(200).json({ message: "Đăng kí thành công" }))
      .catch((err) => {
     
        return res.status(500).json({ message: "lỗi" });
      });
  });
};

export { postUser, getUser };
