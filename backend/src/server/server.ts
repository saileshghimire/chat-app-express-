import { Server } from "socket.io";
import { authenticateSocket } from "../socket/authencation";
import { sendMessage } from "../socket/sendMessage";
import { joinRoom, leaveRoom } from "../socket/roomManager";

export const setupSocketServer = (server:any) =>{
    const io = new Server(server, {
        cors:{
            origin: "http://192.168.1.122:5173",
            methods: ['GET', 'POST']
        },
    });
    io.use(authenticateSocket);
    io.on('connection',(socket)=>{
        // after authentication username is attached to the socket
        const username = socket.data.username;
        console.log(`User connected: ${username}`);
        socket.on("join_room",(roomId:string)=>{
            joinRoom(socket, roomId,username);
            console.log(`${username} joined room ${roomId}`);
        });
        sendMessage(io, socket);

        socket.on("leave_room",(roomId:string, username:string)=>{
            leaveRoom(socket, roomId, username);
            console.log(`${username} left room ${roomId}, done `);
        })
        socket.on("disconnect",(roomId)=>{
            leaveRoom(socket, roomId, username);
            console.log(`User disconnected: ${username} from ${roomId}`);
        })
    });
    return io;
}