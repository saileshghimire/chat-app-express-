import { createClient } from "redis"


const redisPublisher = createClient();
const redisSuscriber = createClient();


redisPublisher.connect();
redisSuscriber.connect();


export { redisPublisher, redisSuscriber };
