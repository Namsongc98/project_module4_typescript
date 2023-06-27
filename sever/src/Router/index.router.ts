import express from "express";
const router:any = express.Router();
import routerUser from "./Router/user.router";


router.use("/users",routerUser)


export default router