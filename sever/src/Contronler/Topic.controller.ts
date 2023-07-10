import { v4 as uuidv4 } from "uuid";
import pool from "../Service/Connection";
import { Request, Response } from "express";
import multer from "multer";
import { body } from "express-validator";

//configStoge
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../../public/imgTopic`);
  },
  filename: (req, file, cb) => {
    let ext = file.originalname.split(".")[1];
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + `.${ext}`;
    cb(null, file?.fieldname + "-" + uniqueSuffix);
  },
});
let upload = multer({ storage: storage }).single("imgTopic");

const postTopic = (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({
        messager: "lỗi tải ảnh",
      });
    } else {
      const { nameTopic, targetTopic, leverTopic } = req.body;
      const fileTopic = req.file?.filename;
      const id_topic = uuidv4();
      const newTopic = [
        id_topic,
        nameTopic,
        leverTopic,
        targetTopic,
        fileTopic,
      ];
      const query = `insert into modules_4.topic (id_topic,name_topic,lever_topic,target_topic,img_topic) values (?,?,?,?,?)`;
      try {
        await pool.promise().execute(query, newTopic);
        const queryGetTopic = `select * from modules_4.topic;`;
        const [rows] = await pool.promise().execute(queryGetTopic);
        if (Array.isArray(rows)) {
          res.status(200).json({
            message: "Đẩy thành công",
            data: rows,
          });
        }
      } catch (error) {
        res.status(500).json({
          error: error,
        });
      }
    }
  });
};

export { postTopic };
