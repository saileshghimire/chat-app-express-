import { redisClient } from "../server/redis";

export const suscribeToChannel = async (channel:string, callback:(message:string)=>void)=>{
    const subscriber = redisClient.duplicate();
    await subscriber.connect();
    await subscriber.subscribe(channel, (message)=>{
        console.log(`Received message on channel ${channel}:`, message);
        callback(message);
    });
};