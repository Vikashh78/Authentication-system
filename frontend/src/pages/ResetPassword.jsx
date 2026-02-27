import React, { useState, useRef, useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {

  const { backendURL } = useContext(AuthContext)
  axios.defaults.withCredentials = true;

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isEmailSent, setIsEmailSent] = useState('')
  const [otp, setOtp] = useState(0)
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)

  const inputRefs = useRef([])

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('')
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char
      }
    })
  }

  const onSubmitEmailHandler = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post(backendURL+'/api/user/send-reset-otp', {email})
      if(data.success) {
        setIsEmailSent(true)
        toast.success(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }

  const onSubmitOtpHandler = async (e) => {
    e.preventDefault()
    const otpArray = inputRefs.current.map(e => e.value)
    setOtp(otpArray.join(''))
    setIsOtpSubmitted(true)
  }

  const onSubmitNewPasswordHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(backendURL+'/api/user/reset-password', {email, otp, newPassword})
      if(res.data.success) {
        toast.success(res.data.message)
        navigate('/login')
      } else {
        toast.error(res.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-blue-200 to-purple-400'>
      <img onClick={() => navigate('/')} className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' src={assets.logo} alt="" />

      {/* Email id */}
      {!isEmailSent && <form onSubmit={onSubmitEmailHandler}
      className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter registered email address</p>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <img className='w-3 h-3' src={assets.mail_icon} alt="" />
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder='Email id' className='bg-transparent outline-none text-white' required />
        </div>
        <button className='w-full py-2.5 bg-linear-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3'>Submit</button>
      </form>}


      {/* Reset otp form */}
      {!isOtpSubmitted && isEmailSent && <form onSubmit={onSubmitOtpHandler}
      className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset password OTP</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code send to your email id</p>
        <div onPaste={handlePaste} className='flex justify-between mb-8'>
          {
            Array(6).fill(0).map((_, idx) => (
              <input className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md' type="text" maxLength='1' key={idx} required
                ref={e => inputRefs.current[idx] = e}
                onInput={(e) => handleInput(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
              />
            )
            )}
        </div>
        <button className='w-full py-2.5 bg-linear-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>Submit</button>
      </form>}

      {/* Enter new password */}
      {isOtpSubmitted && isEmailSent && <form onSubmit={onSubmitNewPasswordHandler}
      className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>New password</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the new password below</p>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <img className='w-3 h-3' src={assets.lock_icon} alt="" />
          <input value={newPassword} onChange={e => setNewPassword(e.target.value)} type="password" placeholder='Password' className='bg-transparent outline-none text-white' required />
        </div>
        <button className='w-full py-2.5 bg-linear-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3'>Submit</button>
      </form>}

    </div>
  )
}

export default ResetPassword