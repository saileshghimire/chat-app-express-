import { Server, Socket } from "socket.io";
import { prisma } from "..";
import { enqueueMessage } from "../queue/messageQueue";
import { publishMessage } from "../redis/publisher";
import { activeRooms } from "./roomManager";


export const sendMessage = (io: Server, socket: Socket): void => {
  socket.on("send_message", async ({ roomId, receiver, message }: { roomId:string, receiver: string; message: string }) => {
    try {
      const sender = socket.data.username as string;

    // Store the message in the database
    await prisma.messages.create({
      data: {
        sender_username: sender,
        receiver_username: receiver,
        context: message,
      },
    });

    const channel = `room_${roomId}`;
    const roomSockets = activeRooms[roomId]; 
    console.log(roomSockets.has(receiver));
    if(roomSockets.size>0 && roomSockets.has(receiver)){
      socket.broadcast.emit(`${channel}`, {
        sender,
        receiver,
        message
      });
      console.log(`sender: ${sender} , message: ${message} in room ${channel}`);
    }
    else {
      // Queue the message if no one is connected
      console.log(`No one is connected to room ${roomId}. Queueing message...`);
      await enqueueMessage(channel, JSON.stringify({ sender,receiver, message }));
      
    }
    } catch (error) {
      console.log(`Error sending message: ${error}`);
      socket.emit("error",{message:"Error sending message"});
    } 
})
};
