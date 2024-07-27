import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../../../assets/trackr.jpg';

const Header = ({ btnText, func }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Track', path: '/track' },
    { name: 'Ship', path: '/ship' },
    // { name: 'Enterprise Logistics Services', path: '/enterprise' },
    { name: 'Customer Service', path: '/customer-service' },
  ];

  return (
    <header className="relative flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-10 py-3">
      <div className="flex items-center gap-4 text-[#111418]">
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 cursor-pointer flex-shrink-0" onClick={() => navigate('/')}>
          <img 
            src={logo} 
            alt="Morning Star Express Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <h2 
          className="text-[#111418] text-sm sm:text-lg font-bold leading-tight tracking-[-0.015em] cursor-pointer"
          onClick={() => navigate('/')}
        >
          Morning Star Logistics
        </h2>
      </div>
      <div className="flex items-center gap-4">
        {btnText && (
          <button 
            className="px-4 py-2 rounded bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer"
            onClick={func}
          >
            <span className="truncate">{btnText}</span>
          </button>
        )}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="absolute top-full right-0 w-50 bg-white shadow-lg z-50 md:hidden rounded-bl-2xl">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-black hover:bg-slate-300 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;