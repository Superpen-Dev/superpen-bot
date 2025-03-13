import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import Loader from "./Loader";
import useChatAPI from "../hooks/useChatAPI";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GlobalStyle.css";
import "./ChatWindow.css";
import botLogo from "../assets/bot.jpg"; // Import bot logo

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const sendMessage = useChatAPI(setMessages, setLoading);
  const chatRef = useRef(null);

  // Apply dark mode globally
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`chat-container ${darkMode ? "dark" : ""}`}>
      {/* Header Section */}
      <header className="chat-header">
        <div className="chat-logo">
          <img src={botLogo} alt="Superpen Chatbot" className="bot-avatar" />
          <h2>Superpen Chatbot</h2>
        </div>

        {/* Dark Mode Toggle */}
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider round"></span>
        </label>
      </header>

      {/* Chat Messages */}
      <div className="chat-messages" ref={chatRef}>
        {messages.length === 0 && !loading && (
          <p className="text-muted">Start a conversation...</p>
        )}
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {loading && <Loader />}
      </div>

      {/* Chat Input */}
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
};

export default ChatWindow;
