import express from "express";
const router = express.Router();
import routerUser from "./Router/user.router";
import routerEvaluate from "./Router/evaluate.router";
import routerTopic from "./Router/topic.router";
import routerquester from "./Router/question.router";


router.use("/users",routerUser)
router.use("/evaluate", routerEvaluate)
router.use("/topic",routerTopic )
router.use("/question",routerquester )


export default router