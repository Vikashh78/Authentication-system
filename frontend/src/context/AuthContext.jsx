import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const AuthContext = createContext()

export const AuthContextProvider = (props) => {

    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState({})


    const getUserData = async () => {
        try {
            const { data } = await axios.get(backendURL + '/api/user-data/data', { withCredentials: true })

            if (data.success) {
                setUserData(data.userData)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.post(
                    backendURL + '/api/user/is-auth',
                    {},
                    { withCredentials: true }
                )

                if (res.data.success) {
                    setIsLoggedin(true)
                    await getUserData()   
                }
            } catch (error) {
                setIsLoggedin(false)
            }
        }

        checkAuth()
    }, [])


    const value = {
        backendURL,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        getUserData,
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}
