import { Server, Socket } from 'socket.io';
import { activeUsers } from './connection';

export const sendRequest = (io: Server, socket: Socket): void => {
  socket.on('send_request', ({ receiverUsername }: { receiverUsername: string }) => {
    const receiverSocketId = activeUsers[receiverUsername];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receive_request', { senderUsername: socket.data.username });
    } else {
      console.log(`User ${receiverUsername} is not online`);
    }
  });
};
