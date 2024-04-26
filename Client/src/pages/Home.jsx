import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import SignupImage from "../assets/Signup.jpg";

const Home = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="relative">
      <div
        className="absolute top-0 left-0 w-full h-60 bg-cover bg-center"
        style={{ backgroundImage: `url(${SignupImage})` }}
      />
      <div className="flex flex-col items-center justify-center h-screen pt-20 bg-gray-300">
        <h1 className="text-4xl font-bold mb-8">Welcome to Estate Explorer</h1>
        <p className="text-lg mb-8">
          Explore a wide range of properties available for sale or rent.
        </p>
        <div className="flex gap-4">
          <NavLink
            to="/properties"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Explore Properties
          </NavLink>
          {currentUser ? (
            <NavLink
              to="/add-property"
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
            >
              Add a Property
            </NavLink>
          ) : (
            <NavLink
              to="/sign-up"
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
            >
              Sign Up to Add a Property
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
