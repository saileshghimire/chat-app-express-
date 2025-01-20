import React from "react";
import MessageBox from "../components/MessageBox";

const ChatPage: React.FC = () => {
  const username = "exampleUser"; // Fetch this from your auth state or localStorage

  return (
    <div className="chat-page">
      <h2>Welcome to the Chat, {username}</h2>
      <MessageBox username={username} />
    </div>
  );
};

export default ChatPage;
