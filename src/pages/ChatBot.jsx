import { useState, useEffect, useRef } from "react";
import service from "../appwrite/config"; // Import Appwrite service
import { GoogleGenerativeAI } from "@google/generative-ai"; // ✅ Correct Import
import { useSearchParams } from "react-router-dom";
import { FiSend } from "react-icons/fi"; // Send button icon
import { motion } from "framer-motion"; // Animations

const Chatbot = () => {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState([{ text: "Hello! Ask me anything!", sender: "bot" }]);
  const [input, setInput] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [userId, setUserId] = useState(null);
  const [botTyping, setBotTyping] = useState(false);
  const messagesEndRef = useRef(null); // For auto-scrolling to latest message

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // ✅ Secure API key
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY); // ✅ Correct Initialization

  useEffect(() => {
    const account = searchParams.get("userId");
    setUserId(account);
  }, [searchParams]);

  useEffect(() => {
    if (userId) fetchFAQs();
  }, [userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchFAQs = async () => {
    try {
      const res = await service.getFAQs(userId);
      if (res && res.documents) {
        setFaqs(res.documents);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setBotTyping(true); // Show typing indicator

    let faqText = "Here are some FAQs about our organization:\n";
    faqs.forEach((faq, index) => {
      faqText += `${index + 1}. Q: ${faq.question}\n   A: ${faq.answer}\n`;
    });

    const fullPrompt = `${faqText}\nNow, based on this information, answer the following user query: "${input}"`;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
      const result = await model.generateContent({ contents: [{ parts: [{ text: fullPrompt }] }] });

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: result.response.text() || "I didn't understand that.", sender: "bot" }
        ]);
        setBotTyping(false);
      }, 1200);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error fetching response.", sender: "bot" }
      ]);
      setBotTyping(false);
    }
  };

  return (
    <div className="w-full h-full min-h-[500px] flex flex-col bg-[#0A192F] text-white rounded-lg shadow-lg">

      {/* Header */}
      <motion.div 
        className="p-3 bg-[#1E293B] text-center font-bold text-lg rounded-t-lg"
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        Ask Your Queries 
      </motion.div>

      {/* Chat Messages (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-gray-500">
        {messages.map((msg, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: msg.sender === "bot" ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`p-3 my-2 rounded-lg max-w-[80%] ${
              msg.sender === "bot"
                ? "bg-[#27374D] text-white self-start"
                : "bg-[#00AEEF] text-white self-end"
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
        
        {/* Bot Typing Indicator */}
        {botTyping && (
          <motion.div 
            className="p-3 my-2 bg-[#27374D] text-white rounded-lg max-w-[80%] self-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            Bot is typing...
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Fixed Input & BotUncle Branding */}
      <div className="bg-[#1E293B] w-full p-3 flex flex-col border-t border-gray-600">
        
        {/* Input Field */}
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow bg-transparent border-none text-white p-2 focus:ring-0 outline-none placeholder-gray-400"
            placeholder="Type your message..."
          />
          <button onClick={sendMessage} className="bg-[#00AEEF] p-3 rounded-lg hover:bg-[#008CC1] transition">
            <FiSend size={22} className="text-white" />
          </button>
        </div>

        {/* Powered by BotUncle (Fixed) */}
        <div className="text-center text-xs text-gray-400 mt-2">
          Powered by{" "}
          <a href="https://botuncle.com" target="_blank" rel="noopener noreferrer" className="text-[#00AEEF] hover:underline">
            BotUncle
          </a>
        </div>
        
      </div>

    </div>
  );
};

export default Chatbot;
