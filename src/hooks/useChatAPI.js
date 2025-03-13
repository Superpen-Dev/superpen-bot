import axios from "axios";

const API_KEY = "53a4e0f340msh23534a2844e5620p16cfa7jsnaf5b97b5b060";
const API_HOST = "chatgpt-42.p.rapidapi.com";

const useChatAPI = (setMessages, setLoading) => {
  return async (text) => {
    const userMessage = { text, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await axios.post(
        `https://${API_HOST}/chatgpt`,  // ✅ Updated to `/chatgpt`
        { messages: [{ role: "user", content: text }], web_access: false },
        {
          headers: {
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": API_HOST,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Full API Response:", response.data);

      const botMessage = {
        text: response.data?.choices?.[0]?.message?.content || "No response from AI",
        isUser: false,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      setMessages((prev) => [
        ...prev,
        { text: `Error: ${error.response?.data?.message || "Unable to fetch response"}`, isUser: false },
      ]);
    } finally {
      setLoading(false);
    }
  };
};

export default useChatAPI;
