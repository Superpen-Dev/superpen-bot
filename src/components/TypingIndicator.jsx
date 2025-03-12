import React from "react";
import "./ChatMessage.css"; // Same CSS file for animations

const TypingIndicator = () => {
  return (
    <div className="chat-message bot typing-indicator">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default TypingIndicator;
