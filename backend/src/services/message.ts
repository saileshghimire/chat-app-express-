import { prisma } from "..";
import { ENVIRONMENT } from "../secret";


export const CreateMessage = async(data:any,sender_username:string,receiver_username:string) :Promise<any> =>{
    try {
        const message = await prisma.messages.create({
            data:{
                sender_username:sender_username,
                receiver_username: receiver_username,
                context: data.message
            }
        });
        return { message }
    } catch (error) {
        if(ENVIRONMENT==="DEVELOPMENT"){
            console.log(error);   
        }
        return { error:'Unable to send message'}
    }
}