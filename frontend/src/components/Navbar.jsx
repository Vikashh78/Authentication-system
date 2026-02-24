import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {

  const navigate = useNavigate();
  const { userData, isLoggedin } = useContext(AuthContext)
  
  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
        <img className='w-28 sm:w-32' src={assets.logo} alt="" />
        {
          userData ? 
          <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white cursor-pointer '>
            {userData?.name?.[0]?.toUpperCase()}
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