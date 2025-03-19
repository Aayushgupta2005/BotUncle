import { useEffect, useState } from "react";
import service from "../appwrite/config";
import authService from "../appwrite/auth";
import { FiEdit2, FiTrash2, FiPlusCircle, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion } from "framer-motion";

const FAQManager = () => {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const account = await authService.getCurrentUser();
      setUserId(account.$id);
    };
    getData();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchFAQs();
    }
  }, [userId]);

  const fetchFAQs = async () => {
    const res = await service.getFAQs(userId);
    if (res && res.documents) {
      setFaqs(res.documents);
    }
  };

  const addFAQ = async () => {
    if (!question || !answer) return;
    await service.createFAQ({ question, answer, userId });
    setQuestion("");
    setAnswer("");
    fetchFAQs();
  };

  const updateFAQ = async (faqId) => {
    if (!question || !answer) return;
    await service.updateFAQ(faqId, { question, answer });
    setQuestion("");
    setAnswer("");
    setEditMode(null);
    fetchFAQs();
  };

  const deleteFAQ = async (faqId) => {
    await service.deletePost(faqId);
    fetchFAQs();
  };

  const toggleFAQ = (faqId) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  return (
    <div className="mx-auto my-5 rounded-xl min-h-screen w-4/5 bg-[#0A192F] py-16 px-6 flex flex-col items-center">
      
      {/* Header Section */}
      <motion.h2 
        className="text-4xl font-extrabold text-white mb-8 text-center"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        📚 Manage Your FAQs
      </motion.h2>

      {/* FAQ Input Form */}
      <motion.div 
        className="w-full max-w-3xl bg-[#1E293B] text-white rounded-2xl shadow-xl p-8 border-t-4 border-[#00AEEF]"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <h3 className="text-2xl font-semibold text-[#00AEEF] mb-4">Add a New FAQ</h3>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter FAQ question"
          className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-[#27374D] text-white focus:ring-2 focus:ring-[#00AEEF] outline-none"
        />
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter FAQ answer"
          className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-[#27374D] text-white focus:ring-2 focus:ring-[#00AEEF] outline-none"
        ></textarea>

        {editMode ? (
          <button
            onClick={() => updateFAQ(editMode)}
            className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-5 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            <FiEdit2 className="text-lg" /> Update FAQ
          </button>
        ) : (
          <button
            onClick={addFAQ}
            className="w-full flex items-center justify-center gap-2 bg-[#00AEEF] text-white px-5 py-3 rounded-lg shadow-md hover:bg-[#008CC1] transition duration-300"
          >
            <FiPlusCircle className="text-lg" /> Add FAQ
          </button>
        )}
      </motion.div>

      {/* FAQ List */}
      <div className="w-full max-w-3xl mt-10">
        <h3 className="text-2xl font-semibold text-[#00AEEF] mb-4">Your FAQs</h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={faq.$id} 
              className="bg-[#1E293B] text-white rounded-lg shadow-md p-4 border-l-4 border-[#00AEEF] hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 * index, duration: 0.8 }}
            >
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFAQ(faq.$id)}>
                <strong className="text-lg text-white">{faq.question}</strong>
                {expandedFAQ === faq.$id ? (
                  <FiChevronUp className="text-[#00AEEF]" />
                ) : (
                  <FiChevronDown className="text-[#00AEEF]" />
                )}
              </div>
              {expandedFAQ === faq.$id && (
                <p className="mt-2 text-gray-300">{faq.answer}</p>
              )}
              <div className="flex justify-end gap-3 mt-3">
                <button
                  onClick={() => {
                    setQuestion(faq.question);
                    setAnswer(faq.answer);
                    setEditMode(faq.$id);
                  }}
                  className="text-yellow-400 hover:text-yellow-500 transition duration-200"
                >
                  <FiEdit2 size={20} />
                </button>
                <button
                  onClick={() => deleteFAQ(faq.$id)}
                  className="text-red-500 hover:text-red-600 transition duration-200"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default FAQManager;
