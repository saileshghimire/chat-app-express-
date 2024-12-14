import { Server } from "socket.io";
import { authenticateSocket } from "./socket/authencation";
import { handleConnection } from "./socket/connection";
import { sendRequest } from "./socket/sendRequest";
import { handleGroupCreation } from "./socket/gropuMessage";
import { sendMessage } from "./socket/sendMessage";

export const setupSocketServer = (server:any) =>{
    const io = new Server(server, {
        cors:{
            origin: '*',
            methods: ['GET', 'POST']
        },
    });
    io.use(authenticateSocket);
    io.on('connection',(socket)=>{
        handleConnection(io, socket);
        sendRequest(io, socket);
        sendMessage(io, socket);
        handleGroupCreation(io, socket);
    });
    return io;
}