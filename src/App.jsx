import { useContext, useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AddProduct from './components/AddProduct'
import Product from './components/Product'
import SideBar from './components/SideBar'
import Login from './components/Login'
import SignUp from './components/SIgnUp'

import Banner from './components/Banner/Banner'
import ChangeProduct from './components/ChangeProduct'
import AdminProfile from './components/admin/AdminProfile'
import ProtectedRoute from './components/ProtectedRoute'
import { PanelContext } from './context/PanelContext'
import Navbar from './components/Navbar'
import NotAuthorizedPage from './components/NotAuthorizedPage'

import Categories from './components/category/categories'
import Footer from './components/category/footer'



function App() {

  const navigator = useNavigate()

  const { isAuthenticated, setIsAuthenticated, checkAuthStatus } = useContext(PanelContext)

  

  useEffect(() => {
    // to get token from the url
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token')
    console.log(token, 'token from google')
    if (token) {

      localStorage.setItem('token', token);
      // localStorage.getItem('token')
      console.log(token, 'use this token')

      setIsAuthenticated(true)
      // window.location.href = '/admin-profile'; // Redirect to home page or another route if needed
      navigator("/admin-profile")
    }
  }, [setIsAuthenticated])

  console.log(isAuthenticated, 'authenticated')
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/access-denied" element={<NotAuthorizedPage />} />
      {/* </Routes>

      <Routes> */}
        {/* private routes */}
        <Route exact path="/" element={<ProtectedRoute> <Product /> </ProtectedRoute>} />
        <Route exact path="/banner" element={<ProtectedRoute> <Banner /> </ProtectedRoute>} />
        <Route exact path="/add" element={<ProtectedRoute> <AddProduct /> </ProtectedRoute>} />
        <Route exact path="/update/:_id" element={<ProtectedRoute> <ChangeProduct /> </ProtectedRoute>} />
        <Route exact path="/admin-profile" element={<ProtectedRoute> <AdminProfile /> </ProtectedRoute>} />

        {/* chatching routes which are not defined */}
        <Route path="*" element={<NotFound />} />
        
      </Routes>

    </>
  )
}

export default App

