import mysql from "mysql2"
require("dotenv/config")

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password:process.env.PASSWORD
})

// const promisePool = pool.promise();

export default pool;