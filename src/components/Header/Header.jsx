import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiMenu, FiX } from 'react-icons/fi'; // Icons for mobile menu

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', slug: "/dashboard", active: authStatus },
    { name: 'Home', slug: "/", active: !authStatus},
    { name: "About", slug: "/about", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "Contact", slug: "/contact", active: true },
  ];

  return (
    <header className="py-4 bg-gray-950 text-gray-300 border-b border-gray-800 ">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <Logo width="70px" />
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white text-2xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>

          {/* Navigation Links (Desktop) */}
          <ul className="hidden md:flex space-x-6">
            {navItems.map((item) => item.active && (
              <li key={item.name}>
                <Link to={item.slug} className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-full transition duration-200">
                  {item.name}
                </Link>
              </li>
            ))}
            {authStatus && (
              <li>
                <Link to={"/"}>
                  <LogoutBtn className="text-gray-300 hover:text-white" />
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-gray-950 shadow-lg z-50">
            <ul className="flex flex-col items-center space-y-4 py-4">
              {navItems.map((item) => item.active && (
                <li key={item.name}>
                  <Link 
                    to={item.slug} 
                    className="block px-6 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-full transition duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {authStatus && (
                <li>
                  <Link to={"/"} onClick={() => setMenuOpen(false)}>
                    <LogoutBtn className="text-gray-300 hover:text-white hover:bg-gray-800 rounded-full transition duration-200" />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
