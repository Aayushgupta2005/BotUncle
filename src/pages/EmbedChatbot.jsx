import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { FiClipboard, FiCheck, FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";

const EmbedChatbot = () => {
  const [userId, setUserId] = useState(null);
  const [embedLink, setLink] = useState("");
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const account = await authService.getCurrentUser();
      setUserId(account.$id);
    };
    getData();
  }, []);

  useEffect(() => {
    if (userId) {
      setLink(`
<iframe src="https://botuncle.vercel.app/chatbot?userId=${userId}" 
    id="chatbot-iframe" 
    style="display:none;position:fixed;bottom:80px;right:16px;width:350px;height:500px;border:none;z-index:1000;
    opacity: 0; transform: scale(0.8); transition: opacity 0.3s ease, transform 0.3s ease;">
</iframe>
<button id="chatbot-btn" 
    style="position:fixed;bottom:10px;right:10px;width:60px;height:60px;border-radius:50%;
    background: linear-gradient(135deg, #007bff, #00d4ff);
    color: white; border: none; cursor: pointer; z-index:1001;
    display: flex; align-items: center; justify-content: center;
    font-size: 24px; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s ease, box-shadow 0.3s ease;">💬</button>
<script>
document.getElementById("chatbot-btn").addEventListener("click", function() {
  var iframe = document.getElementById("chatbot-iframe");
  var button = document.getElementById("chatbot-btn");
  if (iframe.style.display === "none" || iframe.style.opacity === "0") {
    iframe.style.display = "block";
    button.style.transform = "scale(1.1)"; // Slight pop-out effect
    setTimeout(() => {
      iframe.style.opacity = "1";
      iframe.style.transform = "scale(1)";
    }, 10);
  } else {
    iframe.style.opacity = "0";
    iframe.style.transform = "scale(0.8)";
    button.style.transform = "scale(1)";
    setTimeout(() => {
      iframe.style.display = "none";
    }, 300);
  }
});
document.getElementById("chatbot-btn").addEventListener("mouseover", function() {
  this.style.boxShadow = "0px 6px 15px rgba(0, 0, 0, 0.4)";
});
document.getElementById("chatbot-btn").addEventListener("mouseout", function() {
  this.style.boxShadow = "0px 4px 12px rgba(0, 0, 0, 0.3)";
});
</script>
`);
    }
  }, [userId]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0A192F] px-4">
      <motion.div
        className="w-full max-w-4xl bg-[#1E293B] text-white p-6 rounded-lg shadow-xl flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <h2 className="text-3xl font-bold text-center mb-4">🔗 Embed Chatbot</h2>
        <p className="text-gray-300 text-center mb-6">
          Copy the embed code below to integrate the chatbot on your website.
        </p>

        {/* Code Block with Scroll Support */}
        <div className="relative bg-gray-900 text-sm font-mono rounded-lg p-4 border border-gray-700 max-h-60 overflow-y-auto">
          <pre className="whitespace-pre-wrap break-words">{embedLink}</pre>
          <button
            onClick={copyToClipboard}
            className="absolute top-2 right-2 bg-[#00AEEF] hover:bg-[#008CC1] text-white p-2 rounded-md transition"
            title="Copy Code"
          >
            {copied ? <FiCheck size={20} /> : <FiClipboard size={20} />}
          </button>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            onClick={copyToClipboard}
            className="bg-[#00AEEF] hover:bg-[#008CC1] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 w-full sm:w-auto"
          >
            <FiClipboard size={18} /> {copied ? "Copied!" : "Copy Code"}
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 w-full sm:w-auto"
          >
            <FiArrowLeft size={18} /> Back to Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EmbedChatbot;