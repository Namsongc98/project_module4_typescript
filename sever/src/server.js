const express = require("express");
const server = express();
const hostName = "localhost";
const mysql = require("./Service/Connection")
require("dotenv").config()
const port = process.env.PORT || 8080;
const cors = require("cors");
const bodyParser = require("body-parser");
server.use(express.static("public"));
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.get("/",(req,res)=>{
    res.send("hello word")
})
server.listen(port,()=>{
    console.log(`Server running at http://${hostName}:${port}`)
})