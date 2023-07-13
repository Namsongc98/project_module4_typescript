import { v4 as uuidv4 } from "uuid";
import pool from "../Service/Connection";
import { Request, Response, query } from "express";
import multer from "multer";

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
      const urlTopic = `http://localhost:8080/imgTopic/${fileTopic}`;
      const id_topic = uuidv4();
      const newTopic = [id_topic, nameTopic, leverTopic, targetTopic, urlTopic];
      const query = `insert into modules_4.topic (id_topic,name_topic,lever_topic,target_topic,img_topic) values (?,?,?,?,?)`;
      try {
        await pool.promise().execute(query, newTopic);
        res.status(200).json({
          message: "Đẩy thành công",
        });
      } catch (error) {
        res.status(500).json({
          error: error,
        });
      }
    }
  });
};

const putTopic = (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({
        messager: "lỗi tải ảnh",
      });
    } else {
      const { nameTopic, targetTopic, leverTopic, idTopic } = req.body;
      const fileTopic = req.file?.filename;
      const urlTopic = `http://localhost:8080/imgTopic/${fileTopic}`;
      const newTopic = [nameTopic, leverTopic, targetTopic, urlTopic, idTopic];
      const query = `update modules_4.topic set  name_topic=?,lever_topic=?,target_topic=?,img_topic=? where id_topic = ?;`;
      try {
        await pool.promise().execute(query, newTopic);
        res.status(200).json({
          message: "Đẩy thành công",
        });
      } catch (error) {
        res.status(500).json({
          error: error,
        });
      }
    }
  });
};

const getBeginer = async (req: Request, res: Response) => {
  const query = `select * from modules_4.topic where lever_topic = "Sơ cấp";`;
  try {
    const [rows] = await pool.promise().execute(query);
    res.status(200).json({
      message: "Lấy dữ liệu thành công",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không Lấy được dữ liệu ",
      error: error,
    });
  }
};
const getIntermediate = async (req: Request, res: Response) => {
  const query = `select * from modules_4.topic where lever_topic = "Trung cấp";`;
  try {
    const [rows] = await pool.promise().execute(query);
    res.status(200).json({
      message: "Lấy dữ liệu thành công",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không lấy được dữ liệu",
    });
  }
};
const getIAdvances = async (req: Request, res: Response) => {
  const query = `select * from modules_4.topic where lever_topic = "Cao cấp";`;
  try {
    const [rows] = await pool.promise().execute(query);
    res.status(200).json({
      message: "Lấy dữ liệu thành công",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không lấy được dữ liệu",
    });
  }
};

const deleteTopic = async (req: Request, res: Response) => {
  const { id } = req.params;
  const query = `DELETE FROM modules_4.topic WHERE id_topic = (?)`;
  try {
    await pool.promise().execute(query, [id]);
    res.status(200).json({
      message: "Lấy dữ liệu thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lấy dữ liệu thành công",
      error: error,
    });
  }
};

const getAllTopic = async (req: Request, res: Response) => {
  try {
    const query = `select * from modules_4.topic;`;
    const [rows] = await pool.promise().execute(query);
    res.status(200).json({
      message: "Lấy dữ liệu thành công",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export {
  postTopic,
  getBeginer,
  deleteTopic,
  getIntermediate,
  getIAdvances,
  getAllTopic,
  putTopic,
};
