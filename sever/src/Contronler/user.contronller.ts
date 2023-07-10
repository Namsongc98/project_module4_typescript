import pool from "../Service/Connection";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import multer from "multer";

// get All User
const getUser = async (req: Request, res: Response) => {
  try {
    const query =
      "SELECT * FROM modules_4.user join modules_4.evaluate on user.id_user = evaluate.id_user where not role = 1";
    const [rows] = await pool.promise().execute(query);
    res.status(200).json({
      message: "Lấy dữ liệu người dùng thành công",
      data: rows,
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

//config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../../public/imageProfile`);
  },
  filename: (req, file, cb) => {
    let ext = file.originalname.split(".")[1];
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + `.${ext}`;
    cb(null, file?.fieldname + "-" + uniqueSuffix);
  },
});
let upload = multer({ storage: storage }).single("avatar");

// patch Profile
const patchProfile = async (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({
        messager: "lỗi tải ảnh",
      });
    } else {
      const { firstName, lastName, age, phone, id_user } = req.body;
      const avatarUser = req.file?.filename;
      const UrlAvatar = `http://localhost:8080/imageProfile/${avatarUser}`;
      try {
        const updateUser = [
          firstName,
          lastName,
          phone,
          age,
          UrlAvatar,
          id_user,
        ];

        const query =
          "UPDATE  modules_4.user SET fistname_user = ?, lastname_user = ?, phone_user =? ,age =?,  img_user = ? WHERE id_user = ?";
        await pool.promise().execute(query, updateUser);
        const queryGetUser = "SELECT * FROM modules_4.user where id_user = ?";
        const [rows] = await pool.promise().execute(queryGetUser, [id_user]);
        if (Array.isArray(rows)) {
          res.status(200).json({
            messager: "Update thành công",
            data: rows[0],
          });
        }
      } catch (error: any) {
        res.status(500).json({
          message: error,
        });
      }
    }
  });
};

// const getCurrenUser = async(req:Request, res:Response)=>{
//   const {id_user} = req.params

// if(id_user)

//   try {
//     const query = "SELECT * FROM modules_4.user where id_user = ?";
//     const [rows] = await pool.promise().execute(query,[id_user.id])
//     console.log(rows)
//     res.status(200).json({
//       message: " Lấy dữ liệu thành công",
//       data: rows
//     })
//   } catch (error) {
//     console.log(error)
//     res.status(400).json({
//       message: "không có user này"
//     })
//   }
// }
export { postUser, getUser, patchProfile };
