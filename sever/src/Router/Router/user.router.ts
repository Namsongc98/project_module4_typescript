import express from "express";
const routerUser = express.Router();
import {checkEmail} from "../../Midleware/checkForm"
import { validatorRegister,validateResult,validateLogin } from "../../Midleware/validateForm";
import {  getUser, getuserSearch, patchProfile, postUser } from "../../Contronler/user.contronller";
import { postLogin } from "../../Contronler/authorization.contonller";
import { authentization } from "../../Midleware/authentization";


routerUser.get("/",authentization,getUser)
routerUser.post("/register",validatorRegister,validateResult,checkEmail, postUser);
routerUser.post("/login",validateLogin,validateResult,postLogin)
routerUser.patch("/profile",patchProfile) 
routerUser.get("/search",getuserSearch) 


export default routerUser;
    