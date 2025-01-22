import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Socket.IO client instance
const socket: Socket = io("http://192.168.1.122:3000", {
  // transports: ["websocket"],
  auth: {
    authorization: `${localStorage.getItem("token")}`, // Send the token in the "Authorization" header format
  },
});

const ChatApp = () => {
  const [roomId, setRoomId] = useState("");
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<{ sender: string; message: string }[]>(
    []
  );

  useEffect(() => {
    // Handle incoming messages
    socket.on("receive_message", ({ sender, message }) => {
      setChatLog((prev) => [...prev, { sender, message }]);
    });

    // Handle connection errors
    socket.on("connect_error", (err) => {
      toast.error(`Connection error: ${err.message}`);
    });

    return () => {
      socket.off("receive_message");
      socket.off("connect_error");
    };
  }, []);

  const joinRoom = () => {
    if (roomId.trim() === "") {
      toast.error("Room ID is required");
      return;
    }
    socket.emit("join_room", roomId);
    setCurrentRoom(roomId);
    setChatLog([]); // Clear chat log when joining a new room
    toast.success(`Joined room: ${roomId}`);
  };

  const leaveRoom = () => {
    if (currentRoom) {
      socket.emit("leave_room");
      setCurrentRoom(null);
      setChatLog([]);
      toast.info("Left the room");
    }
  };

  const sendMessage = () => {
    if (!message.trim()) {
      toast.error("Message cannot be empty");
      return;
    }
    if (!currentRoom) {
      toast.error("Join a room to send messages");
      return;
    }
    socket.emit("send_message", { roomId: currentRoom, message });
    setChatLog((prev) => [...prev, { sender: "You", message }]);
    setMessage(""); // Clear input after sending
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <ToastContainer />
      <div className="w-full max-w-md bg-white p-4 rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-4">Chat App</h1>

        {/* Room Management */}
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded mb-2"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            disabled={!!currentRoom}
          />
          <div className="flex gap-2">
            <button
              onClick={joinRoom}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              disabled={!!currentRoom}
            >
              Join Room
            </button>
            <button
              onClick={leaveRoom}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
              disabled={!currentRoom}
            >
              Leave Room
            </button>
          </div>
        </div>

        {/* Chat Log */}
        <div className="h-64 overflow-y-auto p-2 border rounded mb-4 bg-gray-50">
          {chatLog.length > 0 ? (
            chatLog.map((log, index) => (
              <div key={index} className="mb-2">
                <strong>{log.sender}:</strong> {log.message}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No messages yet</p>
          )}
        </div>

        {/* Message Input */}
        <div className="flex gap-2">
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
