import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  console.log('isAuthenticated:', isAuthenticated);
  console.log('user:', user);
  console.log('logout:', logout);


  return (
    <div>
      <nav className="fixed top-0 right-0 bg-gray-800 p-4">
        <div className="flex justify-between items-center">
          <div className="text-white text-2xl font-bold mx-auto">
            <Link to="/">Brand</Link>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <div className={`fixed top-0 right-0 h-full bg-gray-900 p-4 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <ul className="text-white mt-10 space-y-4">
            <li>
              <Link to="/" className="block hover:text-gray-400">Inicio</Link>
            </li>
            <li>
              <Link to="/categories" className="block hover:text-gray-400">Categorias</Link>
            </li>
            <li>
              <Link to="/filters" className="block hover:text-gray-400">Filtros</Link>
            </li>
            <li>
              <Link to="/about" className="block hover:text-gray-400">Sobre</Link>
            </li>
            <li>
              <Link to="/faq" className="block hover:text-gray-400">FAQ</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
