import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Contact = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto text-gray-900 dark:text-gray-100">
      
      {/* Hero Section */}
      <section className="relative bg-[#0A192F] text-white p-12 rounded-xl shadow-xl text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#141E30] to-[#243B55] opacity-95"></div>
        <motion.h1 
          className="relative text-5xl font-extrabold z-10"
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          📩 Contact <span className="text-blue-400">BotUncle</span>
        </motion.h1>
        <motion.p 
          className="relative mt-4 text-lg opacity-95 z-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Have questions or need support? Get in touch with us!
        </motion.p>
      </section>

      {/* Contact Form */}
      <section className="mt-14 bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          ✉️ Send Us a Message
        </h2>
        <form className="max-w-3xl mx-auto space-y-4">
          <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" required />
          <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" required />
          <textarea placeholder="Your Message" rows="5" className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" required></textarea>
          <button type="submit" className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition">
            Send Message
          </button>
        </form>
      </section>

    </div>
  );
};

export default Contact;
