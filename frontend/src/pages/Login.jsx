import React, {useState} from 'react'
import {assets} from '../assets/assets'

const Login = () => {

  const [state, setState] = useState('Sign Up')

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-blue-200 to-purple-400'>  
      <img className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' src={assets.logo} alt="" />
      <div className='bg-slate-800 w-full shadow-lg rounded-lg sm:w-96 p-10 text-sm text-indigo-300'>
        <h2 className='text-3xl font-semibold mb-3 text-white text-center'>{state === 'Sign Up'? 'Create Account' : 'Login'}</h2>
        <p className='text-center text-sm mb-6'>{state === 'Sign Up'? 'Create your account' : 'Login to your account!'}</p>
        <form>
          <div className='flex w-full items-center gap-3 px-5 py-2 rounded-full mb-4 bg-[#333A5C]'>
            <img src={assets.person_icon} alt="" />
            <input className='bg-transparent outline-none' type="text" placeholder='Full name' required />
          </div>
          <div className='flex w-full items-center gap-3 px-5 py-2 rounded-full mb-4 bg-[#333A5C]'>
            <img src={assets.mail_icon} alt="" />
            <input className='bg-transparent outline-none' type="text" placeholder='Email' required />
          </div>
          <div className='flex w-full items-center gap-3 px-5 py-2 rounded-full mb-4 bg-[#333A5C]'>
            <img src={assets.lock_icon} alt="" />
            <input className='bg-transparent outline-none' type="text" placeholder='Password' required />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login