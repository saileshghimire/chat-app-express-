
import { prisma } from "..";

import { ENVIRONMENT } from "../secret";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from "uuid";
import { UserCreationData } from "../validation/user";


export const UserCreation = async(data:UserCreationData):Promise<any> =>{
    try {       
        const existinguser = await prisma.user.findFirst({
            where:{
                email:data.email
            }
        });
        if(existinguser){
            return { error: 'Email already exist'}
        }
        const username = `${data.firstName}-${uuidv4()}`;
        const hashedpassword = await bcrypt.hash(data.password, 10);
        const user = await prisma.user.create({
            data:{
                email: data.email,
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                username: username,
                password: hashedpassword
            }
        });
        if(!user){
            return { error:'Unable to create User'}
        }
        return { user }
    } catch (error) {
        if(ENVIRONMENT==="DEVELOPMENT"){
            console.log(`Error at UserCreation: ${error}`);   
        }
        return {error:'Internal Server Error'}
    }
}