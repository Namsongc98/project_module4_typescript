import express from "express";
import { postTopic,getBeginer, deleteTopic, getIntermediate, getIAdvances, getAllTopic, putTopic } from "../../Contronler/Topic.controller";
const routerTopic = express.Router();

routerTopic.post("/posttopic",postTopic)
routerTopic.put("/puttopic/",putTopic)
routerTopic.delete("/beginner/:id",deleteTopic)
routerTopic.get("/getbeginner",getBeginer)
routerTopic.get("/getintermediate",getIntermediate)
routerTopic.get("/getadvances",getIAdvances)
routerTopic.get("/getalltopic",getAllTopic)

export default routerTopic