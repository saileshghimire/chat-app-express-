import { Router } from "express";
import { login, register } from "./controllers/authController";
import { getAllUser } from "./controllers/getAllUserController";
import { GetAllMessage } from "./services/message";



const rootRouter:Router =Router()

rootRouter.post('/user/register',register);
rootRouter.get('/user',getAllUser);
rootRouter.post('/user/login',login);
rootRouter.get('/message',GetAllMessage);

export default rootRouter;