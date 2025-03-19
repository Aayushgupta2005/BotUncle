import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { FaUserPlus, FaCog, FaCode } from "react-icons/fa";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status); // Get auth status

  return (
    <div className="text-gray-900 dark:text-white">
      
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 
        bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 text-white overflow-hidden">
        
        {/* Animated Background Circles */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-96 h-96 bg-blue-400 opacity-20 blur-3xl rounded-full absolute -top-20 left-10"></div>
          <div className="w-96 h-96 bg-indigo-400 opacity-30 blur-3xl rounded-full absolute -bottom-20 right-10"></div>
        </div>

        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold mb-4 relative"
          initial={{ opacity: 0, y: -30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          Meet <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-red-400">BotUncle</span>
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl max-w-2xl text-gray-200 relative"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Your smart, AI-powered chatbot assistant. Automate conversations and engage customers effortlessly.
        </motion.p>
        
        <motion.button
          onClick={() => navigate(authStatus ? "/dashboard" : "/signup")}
          className="mt-8 flex items-center px-8 py-4 bg-white text-blue-600 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition transform relative"
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {authStatus ? "Go to Dashboard" : "Get Started for Free"} <FiArrowRight className="ml-2" />
        </motion.button>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-indigo-700 dark:text-indigo-400 mb-10">How BotUncle Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Sign Up", text: "Create an account and log in to access BotUncle’s chatbot settings.", icon: <FaUserPlus size={30} /> },
              { title: "Customize", text: "Set up your chatbot by adding FAQs and personalizing responses.", icon: <FaCog size={30} /> },
              { title: "Embed", text: "Copy your chatbot’s iframe code and integrate it into your website.", icon: <FaCode size={30} /> }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className="p-8 bg-white dark:bg-gray-700 rounded-xl shadow-lg flex flex-col items-center transform transition-all hover:scale-105 hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.3 * index, duration: 0.8 }}
              >
                <div className="text-indigo-600 dark:text-indigo-400 mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-24 bg-gradient-to-r from-indigo-600 to-purple-700 dark:from-indigo-800 dark:to-purple-900 text-white text-center overflow-hidden">
        
        {/* Animated Blur Effects */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-72 h-72 bg-yellow-400 opacity-20 blur-3xl rounded-full absolute -top-16 left-20"></div>
          <div className="w-72 h-72 bg-red-400 opacity-30 blur-3xl rounded-full absolute -bottom-16 right-20"></div>
        </div>

        <motion.h2 
          className="text-4xl font-bold mb-6 relative"
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          Start Using <span className="text-yellow-300">BotUncle</span> Today!
        </motion.h2>
        <motion.p 
          className="text-lg max-w-2xl mx-auto relative"
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          AI-powered customer support at your fingertips. Effortless, customizable, and ready to deploy.
        </motion.p>
        
        {/* Centering the Button Properly */}
        <div className="flex justify-center mt-8">
          <motion.button
            onClick={() => navigate(authStatus ? "/dashboard" : "/signup")}
            className="flex items-center px-8 py-4 bg-white text-indigo-600 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition transform relative"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {authStatus ? "Go to Dashboard" : "Sign Up Now"} <FiArrowRight className="ml-2" />
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
