import express from "express";
const routerUser = express.Router();
import {checkEmail} from "../../Midleware/checkForm"
import { validatorRegister,validateResult,validateLogin } from "../../Midleware/validateForm";
import { getUser, postUser } from "../../Contronler/user.contronler";
import { postLogin } from "../../Contronler/authorization.contonler";
import { authentization } from "../../Midleware/authentization";


routerUser.get("/",authentization,getUser)
routerUser.post("/register",validatorRegister,validateResult,checkEmail, postUser);
routerUser.post("/login",validateLogin,validateResult,postLogin)

export default routerUser;
