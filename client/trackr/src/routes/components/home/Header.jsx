import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/trackr.jpg';

const Header = ({ btnText, func }) => {
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-10 py-3">
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
          Morning Star Express
        </h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        {btnText && <button 
         className="px-4 py-2 rounded bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer"
         onClick={func}
        >
          <span className="truncate">{ btnText }</span>
        </button>}
      </div>
    </header>
  );
};

export default Header;
