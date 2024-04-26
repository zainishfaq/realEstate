import React from 'react';
import { NavLink } from 'react-router-dom';

function About() {
  return (
    <div className="flex flex-col items-center justify-center h-screen  bg-gray-200">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Welcome to <span className="text-blue-500">Estate Explorer</span>, your ultimate destination for finding your perfect property match!
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Whether you're buying, selling, or renting, we've got you covered with a diverse range of listings tailored to your needs. Explore our properties with ease, knowing that each listing provides essential details such as the number of beds, baths, and parking slots, as well as whether it's furnished.
      </p>
      <p className="text-lg text-gray-700 mb-8">
        Let us guide you on your journey to finding the home of your dreams. Start exploring today with <span className="text-blue-500">Estate Explorer</span>.
      </p>
      <NavLink to="/" className="text-lg bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300">
        Explore Now
      </NavLink>
    </div>
  );
}

export default About;
