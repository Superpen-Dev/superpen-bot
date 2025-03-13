import React, { useEffect, useState } from "react";
import ChatWindow from "../components/ChatWindow";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ChatPage.css";

const ChatPage = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [chatStarted, setChatStarted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowWelcome(false);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="chatpage-wrapper d-flex align-items-center justify-content-center vh-100">
      <div className="chatbox">
        {loading ? (
          <div className="spinner-container text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 text-muted">Loading Superpen AI...</p>
          </div>
        ) : showWelcome ? (
          <div className="welcome text-center">
            <h1 className="fade-in text-primary">🚀 Welcome to Superpen AI!</h1>
            <p className="fade-in-delayed text-muted">How can I assist you today?</p>
          </div>
        ) : (
          <>
            {!chatStarted && (
              <div className="text-center">
                <button className="btn btn-primary btn-lg start-chat-btn" onClick={() => setChatStarted(true)}>
                  Start Chat 💬
                </button>
              </div>
            )}
            {chatStarted && <ChatWindow />}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
