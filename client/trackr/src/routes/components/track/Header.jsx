import React, { useState, useRef } from 'react';
import logo from '../../../assets/logistics.gif';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <img src={logo} alt="Morning Star Enterprises" className="h-24" />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">Personal</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Business</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Our company</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Shop</a>
          </nav>
          
          <div className="flex items-center relative">
            {/* <button className="bg-blue-600 text-white px-4 py-2 rounded">Log In</button> */}
            
            {/* Mobile Menu Button */}
            <button
              className="ml-4 md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              ref={menuRef}
            >
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
            
            {/* Mobile Navigation */}
            {isMenuOpen && (
              <nav className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden md:hidden">
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Personal</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Business</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Our company</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Shop</a>
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;