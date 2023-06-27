import express from 'express'
const server = express();
const hostName = "localhost";
require("dotenv/config")
const port = process.env.PORT || 8080;
import cors from "cors"
import bodyParser from "body-parser";
import router from './Router/index.router.ts'
import {  Request, Response } from 'express';


server.use(express.static("public"));
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use("/",router);



server.get("/",(req:Request,res:Response)=>{
    res.send("hello word")
})
server.listen(port,()=>{
    console.log(`Server running at http://${hostName}:${port}`)
})