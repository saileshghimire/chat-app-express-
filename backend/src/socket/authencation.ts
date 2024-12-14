import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secret';

export const authenticateSocket = (socket: Socket, next: (err?: Error) => void): void => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error('Authentication error: Token is required'));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { username: string };
    socket.data.username = decoded.username; // Store the username in the socket's data
    next();
  } catch (error) {
    next(new Error('Authentication error: Invalid token'));
  }
};