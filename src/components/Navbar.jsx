import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">Brand</Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        <div className={`w-full md:flex md:items-center md:w-auto ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="text-white md:flex md:justify-between">
            <li className="md:ml-4">
              <Link to="/" className="block mt-4 md:inline-block md:mt-0 hover:text-gray-400">Home</Link>
            </li>
            <li className="md:ml-4">
              <Link to="/about" className="block mt-4 md:inline-block md:mt-0 hover:text-gray-400">About</Link>
            </li>
            <li className="md:ml-4">
              <Link to="/services" className="block mt-4 md:inline-block md:mt-0 hover:text-gray-400">Services</Link>
            </li>
            <li className="md:ml-4">
              <Link to="/contact" className="block mt-4 md:inline-block md:mt-0 hover:text-gray-400">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
