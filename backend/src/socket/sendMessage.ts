import { prisma } from "..";
import { Server, Socket } from 'socket.io';

export const sendMessage = (io: Server, socket: Socket): void => {
  socket.on('send_message', async ({ groupId, message }: { groupId: string; message: string }) => {
    await prisma.messages.create({
      data: {
        sender_username: socket.data.username,
        receiver_username: 'group',
        context: message,
      },
    });

    io.emit(`group_message_${groupId}`, {
      sender: socket.data.username,
      message,
    });
  });
};
