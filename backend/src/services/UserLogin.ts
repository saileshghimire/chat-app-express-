import { prisma } from "..";
import { ENVIRONMENT, JWT_SECRET } from "../secret";
import { LoginData } from "../validation/user";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const UserLogin = async(data:LoginData):Promise<any> => {
    try {
        const user = await prisma.user.findFirst({
            where:{
                email: data.email
            }
        });
        if(!user){
            return { error:'Invalid email'};
        }
        if(!bcrypt.compareSync(data.password, user.password)){
            return { error:"Incorrect Password"};
        }
        const access_token = jwt.sign({userId:user.id,username:user.username},JWT_SECRET,{expiresIn:'24h'})
        const refresh_token = jwt.sign({userId:user.id,username:user.username},JWT_SECRET,{expiresIn:'24h'})
        return { access_token, refresh_token};
    } catch (error) {
        if(ENVIRONMENT==="DEVELOPMENT"){
            console.log(`Error at UserCreation: ${error}`);   
        }
        return {error:'Internal Server Error'}
    }
}