import { Link } from "react-router-dom";
import { FiUsers, FiMessageSquare, FiActivity, FiGlobe } from "react-icons/fi";

const Dashboard = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      
      {/* Welcome Section */}
      <div className="relative bg-gradient-to-r from-[#1A1F37] to-[#2B3350] text-white p-10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/abstract-pattern.svg')] opacity-10"></div>
        <h1 className="text-4xl font-extrabold relative z-10">🚀 Welcome to BotUncle Dashboard</h1>
        <p className="mt-2 text-lg opacity-90 relative z-10">Manage, track, and optimize your AI chatbot with ease.</p>
      </div>

      {/* Main Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        
        {/* Manage FAQs */}
        <Link 
          to="/faq-manager" 
          className="relative p-6 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 group"
        >
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
          <h2 className="text-2xl font-semibold relative z-10">📖 Manage FAQs</h2>
          <p className="text-sm opacity-90 relative z-10">Set chatbot responses for smarter interactions.</p>
        </Link>

        {/* Chatbot Demo */}
        <Link 
          to="/chatbot-demo" 
          className="relative p-6 bg-gradient-to-br from-teal-600 to-green-500 text-white rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300"
        >
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
          <h2 className="text-2xl font-semibold relative z-10">💬 Chatbot Demo</h2>
          <p className="text-sm opacity-90 relative z-10">Test and interact with your chatbot in real-time.</p>
        </Link>

        {/* Embed Code */}
        <Link 
          to="/embed-chatbot" 
          className="relative p-6 bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300"
        >
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
          <h2 className="text-2xl font-semibold relative z-10">🔗 Embed Chatbot</h2>
          <p className="text-sm opacity-90 relative z-10">Get the code to add BotUncle to your site.</p>
        </Link>

      </div>

      {/* Chatbot Performance Overview */}
      <div className="mt-12 bg-gradient-to-r from-[#0E1629] to-[#1E253E] text-white p-10 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold">📊 Chatbot Performance</h2>
        <p className="opacity-80">Live insights into your chatbot’s performance.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
          
          {/* Users Engaged */}
          <div className="p-6 bg-[#162039] rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 flex items-center gap-4">
            <FiUsers className="text-blue-400 text-5xl" />
            <div>
              <h3 className="text-xl font-semibold">Users Engaged</h3>
              <p className="opacity-80 text-lg">1,245+</p>
            </div>
          </div>

          {/* Conversations */}
          <div className="p-6 bg-[#162039] rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 flex items-center gap-4">
            <FiMessageSquare className="text-green-400 text-5xl" />
            <div>
              <h3 className="text-xl font-semibold">Total Chats</h3>
              <p className="opacity-80 text-lg">3,872+</p>
            </div>
          </div>

          {/* AI Accuracy */}
          <div className="p-6 bg-[#162039] rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 flex items-center gap-4">
            <FiActivity className="text-red-400 text-5xl" />
            <div>
              <h3 className="text-xl font-semibold">AI Accuracy</h3>
              <p className="opacity-80 text-lg">92.5%</p>
            </div>
          </div>

          {/* Global Reach */}
          <div className="p-6 bg-[#162039] rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 flex items-center gap-4">
            <FiGlobe className="text-purple-400 text-5xl" />
            <div>
              <h3 className="text-xl font-semibold">Global Reach</h3>
              <p className="opacity-80 text-lg">Active in 15+ countries</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;
