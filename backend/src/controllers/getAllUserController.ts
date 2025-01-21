import { Request, Response } from 'express';
import { prisma } from '..';

export const getAllUser = async (req: Request, res: Response):Promise<any> =>{
    try {
        const user = prisma.user.findMany();
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}


