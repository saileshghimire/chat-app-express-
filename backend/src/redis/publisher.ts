import { redisClient } from "../server/redis";

export const publishMessage = async(channel:string, message:string)=>{
    await redisClient.publish(channel, message);
}