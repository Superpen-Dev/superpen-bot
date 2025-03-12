import axios from "axios";

const API_KEY = "3b1ccea967msh80ad344527936acp17d2f9jsn6eb3ecc88e9d";
const API_HOST = "chatgpt-42.p.rapidapi.com";

const useChatAPI = (setMessages, setLoading) => {
  return async (text) => {
    const userMessage = { text, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
        const response = await axios.post(
            `https://${API_HOST}/o3mini`,
            {
              messages: [{ role: "user", content: text }],
              web_access: false
            },
            {
              headers: {
                "X-RapidAPI-Key": API_KEY,
                "X-RapidAPI-Host": API_HOST,
                "Content-Type": "application/json",
                "Connection": "keep-alive"  // ✅ Keeps the connection open
              }
            }
          );
      // Extract bot response
      const botMessage = { text: response.data.result, isUser: false };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages((prev) => [...prev, { text: "Error: Unable to fetch response", isUser: false }]);
    } finally {
      setLoading(false);
    }
  };
};

export default useChatAPI;
