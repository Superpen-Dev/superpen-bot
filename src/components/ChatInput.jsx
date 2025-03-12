import React, { useState, useEffect } from "react";
import "./ChatInput.css";
import "./GlobalStyle.css";

const ChatInput = ({ sendMessage }) => {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [speechRecognizer, setSpeechRecognizer] = useState(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.continuous = false; // Stops after one result
      recognition.interimResults = false; // Avoid partial results
      recognition.lang = "en-US"; // Set the language

      recognition.onstart = () => setListening(true);
      recognition.onend = () => setListening(false);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setText(transcript);

        // Auto-send after recognition (optional)
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
    <form onSubmit={handleSubmit} className="chat-input">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
      <button type="button" onClick={startListening}>
        {listening ? "🎙️ Listening..." : "🎤 Speak"}
      </button>
    </form>
  );
};

export default ChatInput;
