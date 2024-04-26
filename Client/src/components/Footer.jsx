import React from 'react';
import { NavLink } from 'react-router-dom'; 
import logo from "../assets/Logo.svg";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-violet-600 to-indigo-600 mb-0 ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={logo} className="w-28" alt='logo' />
        </div>
        <ul className="flex flex-wrap items-center text-sm font-medium text-white">
          <li><NavLink to="/about" className="hover:underline me-4">About</NavLink></li>
          <li><NavLink to="#" className="hover:underline me-4">Privacy Policy</NavLink></li>
          <li><NavLink to="#" className="hover:underline me-4">Licensing</NavLink></li>
          <li><NavLink to="#" className="hover:underline">Contact</NavLink></li>
        </ul>
      </div>
      <hr className="my-6 border-black sm:mx-auto" />
      <span className="block text-sm text-white text-center">© 2024 Moeez Iqbal</span>
    </footer>
  );
}

export default Footer;
