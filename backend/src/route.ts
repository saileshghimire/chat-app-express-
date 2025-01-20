import { Router } from "express";
import { register } from "./controllers/authController";
// import { checking } from "./controllers/chatController";


const rootRouter:Router =Router()

rootRouter.post('/user/register',register);
// rootRouter.get('/test/version',checking);

export default rootRouter;