import { Server, Socket } from "socket.io";
import { suscribeToChannel } from "../redis/subscriber";
import { dequeueMessage, getQueueLength } from "../queue/messageQueue";

export let activeUserSockets: Record<string, string[]> = {};

export const handleConnection = (io: Server, socket: Socket): void => {
  const username = socket.data.username;
  console.log(`User connected: ${username}`);

  if (!activeUserSockets[username]) {
    activeUserSockets[username] = [];
  }
  activeUserSockets[username].push(socket.id);

  const channel = `group_message_${username}`;
  suscribeToChannel(channel, async (message: string) => {
    for (const socketId of activeUserSockets[username]) {
      io.to(socketId).emit("receive_message", JSON.parse(message));
    }
  });

  // Handle queued messages
  const handleQueuedMessages = async () => {
    const queueLength = await getQueueLength(channel);
    while (queueLength > 0) {
      const message = await dequeueMessage(channel);
      if (message) {
        for (const socketId of activeUserSockets[username]) {
          io.to(socketId).emit("receive_message", JSON.parse(message));
        }
      }
    }
  };

  handleQueuedMessages();

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${username}`);
    activeUserSockets[username] = activeUserSockets[username].filter(
      (id) => id !== socket.id
    );
    if (activeUserSockets[username].length === 0) {
      delete activeUserSockets[username];
    }
  });
};
