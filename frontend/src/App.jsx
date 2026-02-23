import React from 'react'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import ResetPassword from './pages/ResetPassword'
import EmailVerify from './pages/EmailVerify'
import { ToastContainer } from 'react-toastify'

const App = () => {

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/home' element={ <Home /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/reset-password' element={ <ResetPassword /> } />
        <Route path='/verify' element={ <EmailVerify /> } />
      </Routes>
    </div>
  )
}

export default App