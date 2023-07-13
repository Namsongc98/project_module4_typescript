import express from "express";
import { deleteQuestion, getAllQuestion, getQuestion, postQuestion, putQuestion } from "../../Contronler/Question.controller";

const routerquester = express.Router()

routerquester.post("/postquestion",postQuestion)
routerquester.get("/getquestion/:id",getQuestion)
routerquester.get("/getallquestion",getAllQuestion)
routerquester.delete("/deletequestion/:id",deleteQuestion)
routerquester.put("/updatequestion/",putQuestion)


export default routerquester