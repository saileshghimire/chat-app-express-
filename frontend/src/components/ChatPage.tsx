import React, { useState } from "react";
import MessageBox from "../components/MessageBox";

const ChatPage: React.FC = () => {

  const username = localStorage.getItem("username") as string;
  const [sender, setSender] = useState<string>("");
  return (
    <div className="chat-page">
      <h2>Welcome to the Chat, {username}</h2>
    <input type="text" placeholder="Sender" value={sender} onChange={(e) => setSender(e.target.value)} />
      <MessageBox username={sender} />
    </div>
  );
};

export default ChatPage;
