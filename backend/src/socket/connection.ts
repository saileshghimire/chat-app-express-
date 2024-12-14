import { Server, Socket } from 'socket.io';

let activeUsers: Record<string, string> = {}; // Track active users

export const handleConnection = (io: Server, socket: Socket): void => {
  const username = socket.data.username;
  console.log(`User connected: ${username}`);
  activeUsers[username] = socket.id;

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${username}`);
    delete activeUsers[username];
  });
};

export { activeUsers };
