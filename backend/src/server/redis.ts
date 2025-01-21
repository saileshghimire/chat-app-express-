import { createClient } from "redis";

export const redisClient = createClient({
    url:'redis://chat_on_redis:6370'
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

export const connectRedis = async()=>{
if(!redisClient.isOpen){
    await redisClient.connect();
    console.log('Redis Client Connected');
}
};