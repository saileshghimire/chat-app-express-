import { Server, Socket } from "socket.io";
import { prisma } from "..";
import { enqueueMessage } from "../queue/messageQueue";

// Mock activeUserSockets for demonstration purposes
import { publishMessage } from "../redis/publisher";
import { activeUserSockets } from "./connection";

export const sendMessage = (io: Server, socket: Socket): void => {
  socket.on("send_message", async ({ groupId, message }: { groupId: string; message: string }) => {
    const sender = socket.data.username;

    // Store the message in the database
    await prisma.messages.create({
      data: {
        sender_username: sender,
        receiver_username: "group",
        context: message,
      },
    });

    const channel = `group_message_${groupId}`;
    const receiverSocketIds = Object.values(activeUserSockets)
      .flat()
      .filter((id) => id !== socket.id);

    if (receiverSocketIds.length > 0) {
      publishMessage(channel, JSON.stringify({ sender, message }));
    } else {
      await enqueueMessage(channel, JSON.stringify({ sender, message }));
    }
  });
};
