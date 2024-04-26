import React from "react";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../assets/Logo.svg";
import { useSelector } from "react-redux";

function Header() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <header className="bg-gradient-to-r from-violet-600 to-indigo-600 w-full">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <NavLink to="/" className="flex items-center">
          <img className="w-40" src={logo} alt="Logo" />
        </NavLink>

        <div className="flex-grow flex items-center justify-center">
          <form className="bg-slate-100 p-2 rounded-lg flex items-center shadow-md w-full max-w-sm">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none flex-grow"
            />
            <button>
              <FaSearch className="text-slate text-2xl p-1 rounded-md hover:bg-custom-0" />
            </button>
          </form>
        </div>

        <ul className="flex gap-2">
          <NavLink to="/" className="text-white hover:bg-gray-500 rounded-md p-4 sm:inline">
            Home
          </NavLink>

          <NavLink to="/about" className="text-white hover:bg-gray-500 rounded-md p-4 sm:inline">
            About
          </NavLink>

          {currentUser ? (
  <NavLink to="/profile">
    {currentUser.user.avatar ? (
      <img
        className="rounded-full h-8 w-8 object-cover mt-3"
        src={currentUser.user.avatar}
        alt="profile"
      />
    ) : (
      <li className="text-white hover:bg-gray-500 rounded-md p-4 sm:inline">Profile</li>
    )}
  </NavLink>
) : ( 
  <NavLink to="/sign-in" className="text-white hover:bg-gray-500 rounded-md p-4 sm:inline">
    SignIn
  </NavLink>
)}

        </ul>
      </div>
    </header>
  );
}

export default Header;
