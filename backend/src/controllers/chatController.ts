import { Request, Response } from "express";
import { failureResposne, successResponse } from "../helper/resposne";
import { stringify } from "uuid";
import { ENVIRONMENT } from "../secret";
import { CreateMessage } from "../services/message";


export const checking = async(req:Request, res:Response) =>{
    try {
        const user = {
            firstName :"John",
            lastName : "Doe",
            email:"jshuiga@mail.com",
            password:"1212121",
        }
        const resposne = {
            message:"hi",
            user:user
        }
        successResponse(res,201,resposne)
    } catch (error) {
        failureResposne(res,304,'testing-1',error)
    }
}

// export const sendMessage = async(req:Request, res:Response) =>{
//     try {
//         const sender_username = req.query.sender as string;
//         const receiver_username = req.query.receiver as string;
//         const result = await CreateMessage(req.body,sender_username,receiver_username);

//     } catch (error) {
//         if(ENVIRONMENT==="DEVELOPMENT"){
//             console.log(error);   
//         }
//         return res.status(500).json({
//             messages:"Interval Server Error"
//         });
//     }
// }