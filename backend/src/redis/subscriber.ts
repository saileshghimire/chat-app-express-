import { redisClient } from "../server/redis";

export const suscribeToChannel = (channel:string, callback:(message:string)=>void)=>{
    const subscriber = redisClient.duplicate();
    subscriber.connect();
    subscriber.subscribe(channel, callback);
}