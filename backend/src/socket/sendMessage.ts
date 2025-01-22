import { Server, Socket } from "socket.io";
import { prisma } from "..";
import { enqueueMessage } from "../queue/messageQueue";
import { publishMessage } from "../redis/publisher";


export const sendMessage = (io: Server, socket: Socket): void => {
  socket.on("send_message", async ({ roomId, message }: { roomId: string; message: string }) => {
    try {
      const sender = socket.data.username as string;

    // Store the message in the database
    await prisma.messages.create({
      data: {
        sender_username: sender,
        receiver_username: roomId,
        context: message,
      },
    });

    const channel = `room_${roomId}`;
    const roomSockets = io.sockets.adapter.rooms.get(roomId) || new Set();

    if (roomSockets.size >0){
      roomSockets.forEach((socketId)=>{
        if(socket.id !== socketId){
          io.to(socketId).emit("receive_message", {
            sender,
            message,
          });
        }
      })
    } else {
      // Queue the message if no one is connected
      console.log(`No one is connected to room ${roomId}. Queueing message...`);
      await enqueueMessage(channel, JSON.stringify({ sender, message }));
      
    }
    } catch (error) {
      console.log(`Error sending message: ${error}`);
      socket.emit("error",{message:"Error sending message"});
    } 
})
};
