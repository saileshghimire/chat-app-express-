import { prisma } from "..";
import { Server, Socket } from 'socket.io';
import { activeUsers } from './connection';

export const handleGroupCreation = (io: Server, socket: Socket): void => {
  socket.on('accept_request', async ({ senderUsername }: { senderUsername: string }) => {
    const groupName = `${socket.data.username}_${senderUsername}`;
    const group = await prisma.groop.create({
      data: { name: groupName },
    });

    const senderSocketId = activeUsers[senderUsername];
    if (senderSocketId) {
      io.to(senderSocketId).emit('group_created', { groupId: group.id });
    }
    io.to(socket.id).emit('group_created', { groupId: group.id });

    console.log(`Group created: ${groupName}`);
  });
};

