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
  const [groupId, setGroupId] = useState<string>("1"); // Example groupId

  useEffect(() => {
    const socket = getSocket();

    if (socket) {
      // Listen for new messages
      socket.on("receive_message", (message: string) => {
        const parsedMessage = JSON.parse(message);
        setMessages((prevMessages) => [...prevMessages, parsedMessage]);
      });

      return () => {
        socket.off("receive_message");
      };
    }
  }, []);

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
