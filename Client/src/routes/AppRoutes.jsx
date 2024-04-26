import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'
import Profile from '../pages/Profile'
import PrivateRoute from '../components/PrivateRoute';
import Header from '../components/Header'
import Footer from '../components/Footer'
import AddProperty from '../pages/AddProperty'
import Listing from '../pages/Listing'
import Properties from '../pages/Properties'


function AppRoutes() {
  return (
    <>
    
       <Header/>
       <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/properties' element={<Properties/>} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/add-property' element={<AddProperty />} />
          <Route path='/listing/:id' element={<Listing />} /> 
        </Route>
      </Routes>
     <Footer />
    </>
  )
}

export default AppRoutes
