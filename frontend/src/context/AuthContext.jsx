import axios from 'axios'
import React, { createContext, useState } from 'react'
import { toast } from 'react-toastify'

export const AppContext = createContext()

export const AuthContextProvider = (props) => {
    
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState({})
    

    const getUserData = async () => {
        try {
            const res = await axios.get(backendURL+'/api/user-data/data', {withCredentials: true})
            if(res.data.success) {
                setUserData(res.data.userData)               
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    const value = {
        backendURL,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        getUserData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
