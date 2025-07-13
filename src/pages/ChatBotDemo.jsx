import { useState, useEffect } from "react";
import service from "../appwrite/config"; // Import Appwrite service
import authService from "../appwrite/auth";
import { GoogleGenerativeAI } from "@google/generative-ai"; // ✅ Correct Import
import { FiSend } from "react-icons/fi"; // Send button icon
import { motion } from "framer-motion"; // Animations

const ChatbotDemo = () => {
  const [messages, setMessages] = useState([{ text: "Hello! Ask me anything!", sender: "bot" }]);
  const [input, setInput] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [userId, setUserId] = useState(null);
  const [botTyping, setBotTyping] = useState(false);

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // ✅ Secure API key
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY); // ✅ Correct Initialization

  useEffect(() => {
    const getData = async () => {
      const account = await authService.getCurrentUser();
      setUserId(account.$id);
    };
    getData();
  }, []);

  useEffect(() => {
    if (userId) fetchFAQs();
  }, [userId]);

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
    setMessages([...messages, userMessage]);
    setInput("");
    setBotTyping(true); // Show typing indicator

    let faqText = "Here are some FAQs about our organization:\n";
    faqs.forEach((faq, index) => {
      faqText += `${index + 1}. Q: ${faq.question}\n   A: ${faq.answer}\n`;
    });

    const fullPrompt = `
You are a helpful and polite AI assistant representing an organization. Here are some frequently asked questions (FAQs) and their answers:

${faqText}

Now, based on the above information, respond to the following user query in a formal and polite tone:

"${input}"

Guidelines:
- If the query is a greeting (e.g., "hello", "hi", "good morning", etc.), respond warmly and professionally.
- If the query is clearly covered in the FAQs, answer it accurately and concisely.
- If the query is not addressed in the FAQs or you are unsure, respond with:
  "I'm sorry, but I'm unable to answer that at the moment. Please contact our customer support for further assistance."

Keep the response professional, helpful, and user-friendly.
`;


    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
      const result = await model.generateContent({ contents: [{ parts: [{ text: fullPrompt }] }] });

      setTimeout(() => {
        setMessages([...messages, userMessage, { text: result.response.text() || "I didn't understand that.", sender: "bot" }]);
        setBotTyping(false);
      }, 1200);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages([...messages, userMessage, { text: "Error fetching response.", sender: "bot" }]);
      setBotTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A192F] flex flex-col items-center p-6">
      
      {/* Header */}
      <motion.h2 
        className="text-4xl font-extrabold text-white mb-6 text-center"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        🤖 Chatbot Demo
      </motion.h2>

      {/* Chat Window */}
      <div className="w-full max-w-2xl bg-[#1E293B] text-white rounded-xl shadow-lg p-4 flex flex-col h-[600px]">
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-gray-500">
          {messages.map((msg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: msg.sender === "bot" ? -50 : 50 }}
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
        </div>

        {/* Input Field (Sticky) */}
        <div className="w-full flex items-center bg-[#27374D] rounded-lg p-3 mt-2">
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
      </div>

    </div>
  );
};

export default ChatbotDemo;
