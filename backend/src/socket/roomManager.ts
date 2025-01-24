import { Socket } from "socket.io";
import { dequeueMessage, enqueueMessage } from "../queue/messageQueue";

export let activeRooms: Record<string, Set<string>> = {};

export const joinRoom = async(socket:Socket, roomId:string, username:string)=>{
    try {
        socket.join(roomId);
    if(!activeRooms[roomId]){
        activeRooms[roomId] = new Set();
    }
    console.log(`User:${username} joined room ${roomId}`);
    activeRooms[roomId].add(username);
    console.log(`User joined room ${roomId}`);
    const channel = `room_${roomId}`;

    while (true) {
        const message = await dequeueMessage(channel);
        if (!message) {
          // No more messages in the queue
          break;
        }
        if (JSON.parse(message).receiver == username){
            if (activeRooms[roomId].has(username)){
                console.log(channel);
                socket.emit(`${channel}`, JSON.parse(message));
            } else{
                await enqueueMessage(channel, message);
            }
        }
    } 
}catch (error) {
       console.log(`Error joining room: ${error}`); 
       socket.emit("error",{message:"Error joining room"});
    }
};

export const leaveRoom = (socket:Socket, roomId:string, username:string) =>{
    const rooms = activeRooms[roomId];
    if(rooms){
        if(rooms.has(username)){
            rooms.delete(username);
            console.log(`User:${username} left room ${roomId}`);
            if(rooms.size === 0){
                delete activeRooms[roomId];
                console.log(`Room ${roomId} is empty. Deleting room...`);
            }
        }
    }
};