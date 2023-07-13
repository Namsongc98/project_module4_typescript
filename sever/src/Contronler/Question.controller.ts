import { Request, Response } from "express";
import pool from "../Service/Connection";
import { v4 as uuidv4 } from "uuid";

const postQuestion = async (req: Request, res: Response) => {
  const { question, optionA, optionB, optionC, optionD, answer, idTopic } =
    req.body;
  const id_question = uuidv4();
  const data = [
    id_question,
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    answer,
    idTopic,
  ];
  const query = `insert into modules_4.question (id_question,question,option_a,option_b,option_c,option_d,answer,id_topic) values ( ?,?,?,?,?,?,?,? )`;
  try {
    await pool.promise().execute(query, data);

    res.status(200).json({ message: "Đăng kí thành công" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "lỗi", err: error });
  }
};

const getQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const queryquestion = `SELECT * FROM modules_4.question where id_topic = (?);`;
    const [rows] = await pool.promise().execute(queryquestion, [id]);

    res.status(200).json({
      message: "lấy dữ liệu thành công thành công",
      data: rows,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const deleteQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const query = `DELETE FROM modules_4.question WHERE id_question = (?)`;
  try {
    await pool.promise().execute(query, [id]);
    res.status(200).json({
      message: "Lấy dữ liệu thành công",
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};
const getAllQuestion = async (req: Request, res: Response) => {
  const query = "SELECT * FROM modules_4.question;";
  try {
    const [rows] = await pool.promise().execute(query);
    res.status(200).json({
      message: "Lấy dữ liệu thành công",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

const putQuestion = async (req: Request, res: Response) => {
  const { idQuestion, question, optionA, optionB, optionC, optionD, answer } =
    req.body;
  const upDateQuestion = [
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    answer,
    idQuestion,
  ];
  const query = `update modules_4.question set question=?,option_a=?,option_b=?,option_c=?,option_d=?,answer=? where id_question = ?;`;
  try {
    await pool.promise().execute(query, upDateQuestion);
    res.status(200).json({
      message: "Đẩy thành công",
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

export {
  postQuestion,
  getQuestion,
  deleteQuestion,
  getAllQuestion,
  putQuestion,
};
