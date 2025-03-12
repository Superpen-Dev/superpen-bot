import React from "react";
import "./ChatMessage.css"; // Import the CSS file
import "./GlobalStyle.css";

const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message-container ${message.isUser ? "user" : "bot"}`}>
      <div className={`chat-message ${message.isUser ? "user" : "bot"}`}>
        <p>{message.text}</p>
        <span className="message-time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <div className="bubble-tail"></div>
      </div>
    </div>
  );
};

export default ChatMessage;
