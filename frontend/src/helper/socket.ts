import { io, Socket } from 'socket.io-client';

let socket: Socket | undefined;

export const connectSocket = () => {
  // Initialize the socket connection with the JWT token
  const token  = localStorage.getItem("token");
  socket = io("192.168.1.122:3000", {
    auth: {
      token: token,
    },
    transports: ["websocket"], // You can specify the transport type for better performance
  });

  socket.on("connect", () => {
    console.log("Connected to the socket server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from the socket server");
  });

  return socket;
};

export const getSocket = () => socket;
