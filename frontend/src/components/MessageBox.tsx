import React, { useState, useEffect } from "react";
import { getSocket } from "../helper/socket";


interface Message {
  sender: string;
  message: string;
}

interface MessageBoxProps {
  username: string;
}

const MessageBox: React.FC<MessageBoxProps> = ({ username }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [groupId, setGroupId] = useState<string>(""); // Example groupId

  useEffect(() => {
    setGroupId(username);
  }, [username]);

  useEffect(() => {
    const socket = getSocket();

    if (socket) {
      // Listen for new messages
      socket.on("receive_message", (data: { sender: string; message: string }) => {
        if (data.sender === groupId) {
          const newMessage = {
            sender: username,
            message: data.message,
          };
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      });

      return () => {
        socket.off("receive_message");
      };
    }
  }, [groupId, username]);

  const handleSendMessage = () => {
    const socket = getSocket();
    if (socket) {
      socket.emit("send_message", { groupId, message: newMessage });
      setNewMessage(""); // Clear input after sending the message
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <strong>{message.sender}</strong>: {message.message}
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default MessageBox;
