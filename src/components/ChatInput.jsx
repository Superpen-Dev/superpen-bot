import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./GlobalStyle.css";

const ChatInput = ({ sendMessage }) => {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [speechRecognizer, setSpeechRecognizer] = useState(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => setListening(true);
      recognition.onend = () => setListening(false);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setText(transcript);
        sendMessage(transcript);
      };

      setSpeechRecognizer(recognition);
    } else {
      alert("Speech Recognition is not supported in your browser.");
    }
  }, [sendMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      sendMessage(text);
      setText("");
    }
  };

  const startListening = () => {
    if (speechRecognizer) {
      speechRecognizer.start();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input container-fluid">
      <div className="row">
        <div className="col-12 col-md-8 mb-2 mb-md-0">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="form-control"
            placeholder="Type your message..."
          />
        </div>
        <div className="col-12 col-md-4 d-flex gap-2">
          <button type="submit" className="btn btn-primary w-50">Send</button>
          <button type="button" onClick={startListening} className="btn btn-secondary w-50">
            {listening ? "🎙️ Listening..." : "Speak"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
