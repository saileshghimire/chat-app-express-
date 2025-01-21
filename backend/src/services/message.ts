import { prisma } from "..";
import { ENVIRONMENT } from "../secret";
import { Request, Response } from "express";


export const GetAllMessage = async(req:Request, res:Response) :Promise<any> =>{
    try {
        const message = (await prisma.messages.findMany({orderBy:{createdAt:"desc"}}));
        return res.status(200).json({message});
    } catch (error) {
        if(ENVIRONMENT==="DEVELOPMENT"){
            console.log(error);   
        }
        return res.status(500).json({message:"Internal Server Error"});
    }
}