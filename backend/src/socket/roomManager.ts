import { Socket } from "socket.io";

const activeRooms: Record<string, Set<string>> = {};

export const joinRoom = (socket:Socket, roomId:string)=>{
    try {
        socket.join(roomId);
    if(!activeRooms[roomId]){
        activeRooms[roomId] = new Set();
    }
    activeRooms[roomId].add(socket.id);
    console.log(`User joined room ${roomId}`);
    } catch (error) {
       console.log(`Error joining room: ${error}`); 
       socket.emit("error",{message:"Error joining room"});
    }
};

export const leaveRoom = (socket:Socket) =>{
    const rooms = socket.rooms;
    rooms.forEach((roomId)=>{
        if(activeRooms[roomId].has(socket.id)){
            activeRooms[roomId].delete(socket.id);
            if(activeRooms[roomId].size === 0){
                delete activeRooms[roomId];
            }
        }
    });
};