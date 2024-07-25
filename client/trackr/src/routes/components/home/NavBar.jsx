import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navItems = [
    { name: 'Track', path: '/track' },
    { name: 'Ship', path: '/' },
    // { name: 'Enterprise Logistics Services', path: '/enterprise' },
    { name: 'Customer Service', path: '/' },
  ];

  return (
    <nav className="py-2 px-4 sm:px-6 lg:px-8 hidden md:block">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-baseline space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-black hover:bg-slate-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;