import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import Loader from "./Loader";
import useChatAPI from "../hooks/useChatAPI";
import "./ChatWindow.css";
import "./GlobalStyle.css";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const sendMessage = useChatAPI(setMessages, setLoading);
  const chatRef = useRef(null);

  // Auto-scroll to the bottom when messages update
  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`chat-container ${darkMode ? "dark" : ""}`}>
      {/* Chat Header */}
      <div className="chat-header">
        <img src="/src/assets/bot.jpg" alt="Bot Avatar" className="bot-avatar" />
        <h2>Superpen Chatbot</h2>
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      {/* Chat Messages */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {loading && <Loader />}
        <div ref={chatRef} />
      </div>

      {/* Chat Input */}
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
};

export default ChatWindow;
