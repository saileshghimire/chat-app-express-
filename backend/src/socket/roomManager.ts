import { Socket } from "socket.io";
import { dequeueMessage, enqueueMessage } from "../queue/messageQueue";

const activeRooms: Record<string, Set<string>> = {};

export const joinRoom = async(socket:Socket, roomId:string, username:string)=>{
    try {
        socket.join(roomId);
    if(!activeRooms[roomId]){
        activeRooms[roomId] = new Set();
    }
    // activeRooms[roomId].add(socket.id);
    activeRooms[roomId].add(username);
    console.log(`User joined room ${roomId}`);
    const channel = `room_${roomId}`;
    const message = await dequeueMessage(channel);
    if (message && message.length >0){
        message.forEach(async (msg:any)=>{
            if (JSON.parse(msg).receiver === username){
                if (activeRooms[roomId].has(username)){
                    socket.broadcast.emit(`${channel}`, JSON.parse(msg));
                } else{
                    await enqueueMessage(channel, msg);
                }
            }
        })
    }
    } catch (error) {
       console.log(`Error joining room: ${error}`); 
       socket.emit("error",{message:"Error joining room"});
    }
};

export const leaveRoom = (socket:Socket, roomId:string, username:string) =>{
    const rooms = socket.rooms;
    rooms.forEach((roomId)=>{
        if(activeRooms[roomId].has(username)){
            activeRooms[roomId].delete(username);
            console.log(`User:${username} left room ${roomId}`);
            if(activeRooms[roomId].size === 0){
                delete activeRooms[roomId];
                console.log(`Room ${roomId} is empty. Deleting room...`);
            }
        }
    });
};