import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GlobalStyle.css";

const ChatMessage = ({ message }) => {
  return (
    <div className={`d-flex ${message.isUser ? "justify-content-end" : "justify-content-start"} mb-3`}>
      <div className={`card ${message.isUser ? "bg-primary text-white" : "bg-light"} p-2`}>
        <p className="mb-1">{message.text}</p>
        <small className="text-muted">
          {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </small>
      </div>
    </div>
  );
};

export default ChatMessage;
