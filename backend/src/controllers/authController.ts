import { Request, Response } from "express";
import { ENVIRONMENT } from "../secret";
import { validateDate } from "../services/validationfucntion";
import { UserCreation } from "../services/UserCreation";
import { InsertUserSchema, LoginSchema } from "../validation/user";
import { UserLogin } from "../services/UserLogin";



export const register = async(req:Request, res:Response):Promise<any> =>{
    try {
        const validateresult = validateDate(req.body, InsertUserSchema);     
        if(!validateresult.value){
            return res.status(400).json({
                message: validateresult.message
            });
        }     
        const result = await UserCreation(validateresult.value); 
          
        if(result.error){
            return res.status(402).json({
                message:result.error
            })
        }   
        return res.status(200).json({
            message:"User Created",
            data:result.user
        })

    } catch (error) {
        if(ENVIRONMENT==="DEVELOPMENT"){
            console.log(error);   
        }
        return res.status(500).json({
            messages:"Interval Server Error"
        });
    }
}


export const login = async(req:Request, res:Response):Promise<any> =>{
    try {
        const validateresult = validateDate(req.body, LoginSchema);
        if(!validateresult.value){
            return res.status(400).json({
                message: validateresult.message
            });
        }
        const result = await UserLogin(validateresult.value);
        if(result.error){
            return res.status(400).json({
                message: result.error
            })
        }
        return res.status(200).json({
            access_token: result.access_token,
            refresh_token: result.refresh_token,
            username: result.username
        })
    } catch (error) {
        if(ENVIRONMENT==="DEVELOPMENT"){
            console.log(error);   
        }
        return res.status(500).json({
            messages:"Interval Server Error"
        }); 
    }
}
