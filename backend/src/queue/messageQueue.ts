import { redisClient } from "../server/redis";

export const enqueueMessage = async (queueName:string, message:string)=>{
    console.log("Enqueueing message", message);
    await redisClient.rPush(queueName, message);
};

export const dequeueMessage = async (queueName:string)=>{
    console.log("Dequeueing message", queueName);
    return await redisClient.lPop(queueName);
};

export const getQueueLength = async (queueName:string)=>{
    console.log("Getting queue length", queueName);
    return await redisClient.lLen(queueName);
};