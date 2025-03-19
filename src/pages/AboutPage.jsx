import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto text-gray-900 dark:text-gray-100">
      
      {/* Hero Section */}
      <section className="relative bg-[#0A192F] text-white p-12 rounded-xl shadow-xl text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#141E30] to-[#243B55] opacity-95"></div>
        <motion.h1 
          className="relative text-5xl font-extrabold z-10"
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          🤖 About <span className="text-blue-400">BotUncle</span>
        </motion.h1>
        <motion.p 
          className="relative mt-4 text-lg opacity-95 z-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Your trusted AI assistant that automates customer interactions with smart, instant conversations.
        </motion.p>
      </section>

      {/* What is BotUncle? */}
      <section className="mt-14">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-900 mb-6 text-center">
          What is BotUncle?
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-700 text-center max-w-3xl mx-auto">
          BotUncle is an AI-powered chatbot built to automate responses, handle queries, and provide instant support to users.  
          It seamlessly integrates with any website and ensures smooth, intelligent, and engaging conversations.
        </p>
      </section>

      {/* Features Section */}
      <section className="mt-14">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-900 mb-6 text-center">
          🌟 Why Choose BotUncle?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "⚡ Instant AI Responses", desc: "Delivers quick and relevant replies with AI-driven efficiency." },
            { title: "🎨 Chatbot Demo", desc: "Take a demo of your chatbot and experience real-time AI-powered conversations." },
            { title: "📊 Chatbot Analytics", desc: "Track conversations and improve chatbot engagement." },
            { title: "🌍 Multi-Language Support", desc: "Communicate with users globally in their preferred language." },
            { title: "🛡️ Secure & Reliable", desc: "Protects data with advanced security measures." },
            { title: "🔗 Easy Website Integration", desc: "Embed BotUncle with a single line of code." }
          ].map((feature, index) => (
            <motion.div 
              key={index} 
              className="p-6 bg-[#1E293B] dark:bg-[#27374D] text-white rounded-xl shadow-lg transform transition-all hover:scale-105"
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 * index, duration: 0.8 }}
            >
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-20 bg-[#0A192F] text-white p-12 rounded-xl shadow-lg text-center">
        <h2 className="text-4xl font-extrabold">🚀 Get Started with BotUncle!</h2>
        <p className="text-lg opacity-90 mt-2">Enhance your customer experience with AI-powered chatbot automation.</p>
        <button className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition">
          Get Started Now
        </button>
      </section>

    </div>
  );
};

export default About;
