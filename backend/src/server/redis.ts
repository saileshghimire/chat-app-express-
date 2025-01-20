import { createClient } from "redis";

export const redisClient = createClient({
    url:'chat_redis:6379'
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

export const connectRedis = async()=>{
if(!redisClient.isOpen){
    await redisClient.connect();
    console.log('Redis Client Connected');
}
};