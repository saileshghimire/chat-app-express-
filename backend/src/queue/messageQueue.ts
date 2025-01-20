import { redisClient } from "../server/redis";

export const enqueueMessage = async (queueName:string, message:string)=>{
    await redisClient.rPush(queueName, message);
};

export const dequeueMessage = async (queueName:string)=>{
    return await redisClient.lPop(queueName);
};

export const getQueueLength = async (queueName:string)=>{
    return await redisClient.lLen(queueName);
};