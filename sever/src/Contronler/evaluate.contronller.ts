import pool from "../Service/Connection";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";

const postEvaluate = async (req: Request, res: Response) => {
  const { evaluate, rating, email, idUser, date } = req.body;
  const id_evaluate = uuidv4();
  try {
    const query = `insert into modules_4.evaluate (id_evaluate,evaluate,star_evaluate,email_user,id_user,date_evaluate) values (?,?,?,?,?,?)`;
    await pool
      .promise()
      .execute(query, [id_evaluate, evaluate, rating, email, idUser, date]);
    res.status(200).json({
      messager: "Bài đánh giá thành công",
    });
  } catch (error) {
    res.status(500).json({
      messager: "bài post thất bại",
    });
  }
};

const getEvaluate = async (req: Request, res: Response) => {
  try {
    const query = "SELECT * FROM modules_4.evaluate";
    const [rows] = await pool.promise().execute(query);
    if (Array.isArray(rows)) {
      res.status(200).json({
        message: " Lấy dữ liệu thành công",
        data: rows,
      });
    }
  } catch (error) {
    res.status(400).json({
      messager: "Không lấy được dữ liệu",
    });
  }
};

const getEvaluateLimit = async (req: Request, res: Response) => {
  try {
    const query = `SELECT e.evaluate, e.star_evaluate,e.date_evaluate, u.img_user, u.lastname_user, e.id_evaluate 
    FROM modules_4.evaluate as e 
     join modules_4.user as u  ON e.id_user = u.id_user where star_evaluate >= 4 limit 5`;
    const [rows] = await pool.promise().execute(query);

    if (Array.isArray(rows)) {
      res.status(200).json({
        message: "lấy dữ liệu thành công",
        data: rows,
      });
    }
  } catch (error) {
    res.status(400).json({
      messager: "Không lấy được dữ liệu",
      error: error,
    });
  }
};

export { postEvaluate, getEvaluate, getEvaluateLimit };
