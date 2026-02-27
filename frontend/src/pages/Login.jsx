import React, {useContext, useEffect, useState} from 'react'
import {assets} from '../assets/assets'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import { AuthContext } from '../context/AuthContext'

const Login = () => {

  const navigate = useNavigate()

  const { backendURL, setIsLoggedin, getUserData, isLoggedin, userData } = useContext(AuthContext)

  const [state, setState] = useState('Login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true // To send cookies

      if(state === 'Sign Up') {
        const response = await axios.post(backendURL+'/api/user/register', {name, email, password})                
        if(response.data.success){
          setIsLoggedin(true)
          getUserData()
          setIsLoggedin(true)
          navigate('/')        
        }
      }
      
      else {
        const response = await axios.post(backendURL+'/api/user/login', {email, password}) 
             
        if(response.data.success){
          setIsLoggedin(true)
          getUserData()
          setIsLoggedin(true)
          navigate('/')
        }
      }

    } catch (error) {
      console.log(error)
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong. Please try again.'
      toast.error(message)
    }
  }

  useEffect(()=>{
    isLoggedin && userData && navigate('/')
  },[isLoggedin, userData])


  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-blue-200 to-purple-400'>  
      <img onClick={()=>navigate('/')} className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' src={assets.logo} alt="" />
      <div className='bg-slate-800 w-full shadow-lg rounded-lg sm:w-96 p-10 text-sm text-indigo-300'>
        <h2 className='text-3xl font-semibold mb-3 text-white text-center'>{state === 'Sign Up'? 'Create Account' : 'Login'}</h2>
        <p className='text-center text-sm mb-6'>{state === 'Sign Up'? 'Create your account' : 'Login to your account!'}</p>
        <form onSubmit={onSubmitHandler}>
          {
            state === 'Sign Up' && 
              <div className='flex w-full items-center gap-3 px-5 py-2 rounded-full mb-4 bg-[#333A5C]'>
              <img src={assets.person_icon} alt="" />
              <input onChange={(e)=>setName(e.target.value)} value={name}
               className='bg-transparent outline-none' type="text" placeholder='Full name' required />
            </div>
          }
          <div className='flex w-full items-center gap-3 px-5 py-2 rounded-full mb-4 bg-[#333A5C]'>
            <img src={assets.mail_icon} alt="" />
            <input onChange={(e)=>setEmail(e.target.value)} value={email}
            className='bg-transparent outline-none' type="email" placeholder='Email' required />
          </div>
          <div className='flex w-full items-center gap-3 px-5 py-2 rounded-full mb-4 bg-[#333A5C]'>
            <img src={assets.lock_icon} alt="" />
            <input onChange={(e)=>setPassword(e.target.value)} value={password}
            className='bg-transparent outline-none' type="password" placeholder='Password' required />
          </div>
          <p onClick={()=>navigate('/reset-password')} className='mb-4 text-gray-400 cursor-pointer'>Forget password</p>
          <button type='submit' className='w-full py-2.5 font-medium text-white bg-linear-to-br from-indigo-500 to-blue-400 rounded-full mb-4 cursor-pointer'>{state}</button>
        </form>
        {
          state === 'Sign Up'? 
          <p className='text-gray-400 text-center text-xs'>Already have an account? {' '}
            <span onClick={()=>setState('Login')} className='text-blue-400 underline cursor-pointer'>Login here</span>
          </p>
          :
          <p className='text-gray-400 text-center text-xs mt-1'>Don't have an account? {' '}
            <span onClick={()=>setState('Sign Up')} className='text-blue-400 underline cursor-pointer'>Sign Up</span>
          </p>
        }
      </div>
    </div>
  )
}

export default Login