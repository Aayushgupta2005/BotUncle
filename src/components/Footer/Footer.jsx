import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 py-10 mx-auto">
      <div className="w-full max-w-6xl mx-auto px-6 flex flex-col items-center justify-center">
        
        {/* Top Section - Branding & Links */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 text-center lg:text-left w-full">
          
          {/* Logo & Description */}
          <div className="flex flex-col items-center lg:items-center">
            <h2 className="text-2xl font-bold text-white">BotUncle</h2>
            <p className="mt-2 text-gray-500 max-w-sm">
              AI Chatbot as a Service. Enhance engagement & automate conversations effortlessly.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center lg:items-center">
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/signup" className="hover:text-white">Sign Up</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center lg:items-center">
            <h3 className="text-xl font-semibold text-white">Follow Us</h3>
            <div className="flex space-x-4 mt-3 justify-center lg:justify-center">
              <a href="#" className="text-gray-500 hover:text-white transition"><FaFacebookF size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-white transition"><FaTwitter size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-white transition"><FaLinkedinIn size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-white transition"><FaGithub size={20} /></a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-800 w-full" />

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} BotUncle. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
