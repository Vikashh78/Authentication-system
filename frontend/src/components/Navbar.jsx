import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify'
import axios from 'axios';

const Navbar = () => {

  const navigate = useNavigate();
  const { userData, setUserData, isLoggedin, setIsLoggedin, backendURL } = useContext(AuthContext)
  const [click, setClick] = useState(false)

  // API call for logout user
  const logout = async () => {
    try {
      const response = await axios.post(backendURL+'/api/user/logout', {withCredentials: true})
      if(response.data.success) {
        setUserData(false)
        setIsLoggedin(false)
        navigate('/')
        toast.success(response.data.message)
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

  //API call for verify-email
  const sendVerificationOtp = async () => {
    try {
      const {data} = await axios.post(backendURL+'/api/user/send-verify-otp')
      if(data.success) {
        navigate('/verify')
        toast.success(data.message)
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
  
  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
        <img className='w-28 sm:w-32' src={assets.logo} alt="" />
        {
          isLoggedin === true ?
          <div className='flex flex-col gap-1'> 
            <div onClick={()=>setClick(prev => !prev)} className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white cursor-pointer '>
              {userData?.name?.[0]?.toUpperCase()}
              
            </div>
            { click && <div>
                <ul className='bg-gray-100 text-sm gap-0.5 px-2 py-1 rounded-lg cursor-pointer'>
                  {!userData?.isAccountVerified && <li onClick={sendVerificationOtp} className='hover:font-semibold'>Verify Email</li>}
                  <li onClick={logout} className='hover:font-semibold'>Logout</li>
                </ul>
            </div> }
          </div>
          :
          <button onClick={()=>navigate('/login')} type='submit'
            className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer'>Login <img src={assets.arrow_icon} alt="" />
          </button>
        }
    </div>
  )
}

export default Navbar