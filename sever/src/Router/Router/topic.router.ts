import express from "express";
import { postTopic } from "../../Contronler/Topic.controller";
const routerTopic = express.Router();

routerTopic.post("/posttopic",postTopic)

export default routerTopic