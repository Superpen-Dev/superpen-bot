import React, { useEffect, useState } from "react";
import ChatWindow from "../components/ChatWindow";
import "./ChatPage.css"; // Scoped styles only for ChatPage

const ChatPage = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [chatStarted, setChatStarted] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowWelcome(false), 3000); // Hide welcome message after 3 sec
  }, []);

  return (
    <div className="chatpage-wrapper">
      <div className="chatpage-container">
        {showWelcome ? (
          <div className="welcome">
            <h1 className="fade-in">🚀 Welcome to Superpen AI!</h1>
            <p className="fade-in-delayed">Your AI assistant is here to help.</p>
          </div>
        ) : (
          <>
            {!chatStarted && (
              <div className="cta-container">
                <button className="cta-button" onClick={() => setChatStarted(true)}>
                  🤖 Have a Question? Ask Superpen AI!
                </button>
              </div>
            )}
            {chatStarted && <ChatWindow />}
          </>
        )}

        {!chatStarted && (
          <button className="floating-chat-btn" onClick={() => setChatStarted(true)}>
            💡 Chat Now
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
