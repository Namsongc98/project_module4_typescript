import  express  from "express";
import { getEvaluate, getEvaluateLimit, postEvaluate } from "../../Contronler/evaluate.contronller";
const routerEvaluate = express.Router()

routerEvaluate.post("/postevaluate",postEvaluate)
routerEvaluate.get("/getevaluate",getEvaluate)
routerEvaluate.get("/getevaluatelimit",getEvaluateLimit)

export default routerEvaluate