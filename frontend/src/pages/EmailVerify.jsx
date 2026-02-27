import React, { useContext, useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'


const EmailVerify = () => {
  
  axios.defaults.withCredentials = true;

  const { backendURL, isLoggedin, userData, getUserData } = useContext(AuthContext)
  
  const navigate = useNavigate()
  const inputRefs = useRef([])

  const handleInput = (e, index) => {
    if(e.target.value.length > 0 && index < inputRefs.current.length -1){
      inputRefs.current[index + 1].focus()
    } 
  }

  const handleKeyDown = (e, index) => {
    if(e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('')
    pasteArray.forEach((char, index) => {
      if(inputRefs.current[index]) {
        inputRefs.current[index].value = char
      }
    })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const otpArray = inputRefs.current.map(e => e.value)
    const otp = otpArray.join('')

    try {
      const {data} = await axios.post(backendURL+'/api/user/verify-email', {otp})
      if(data.success) {
        toast.success(data.message)
        getUserData()
        navigate('/')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong. Please try again.'
      toast.error(message)
    }
  }

  useEffect(()=>{
    isLoggedin && userData && userData.isAccountVerified && navigate('/')
  },[isLoggedin, userData])

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-blue-200 to-purple-400'>
      <img onClick={()=>navigate('/')} className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' src={assets.logo} alt="" />
      <form onSubmit={onSubmitHandler} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code send to your email id</p>
        <div onPaste={handlePaste} className='flex justify-between mb-8'>
          {
            Array(6).fill(0).map((_, idx) => (
              <input className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md' type="text" maxLength='1' key={idx} required
              ref={e => inputRefs.current[idx] = e}
              onInput={(e) => handleInput(e, idx)}
              onKeyDown={(e)=> handleKeyDown(e, idx)}
              />
            )
          )}
        </div>
        <button className='w-full py-3 bg-linear-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>Verify email</button>
      </form>
    </div>
  )
}

export default EmailVerify