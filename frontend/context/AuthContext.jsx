import React, { createContext } from 'react'

const AuthContext = createContext()

const AuthProvider = (props) => {

    const value = {

    }

    return (
        <AuthContext.Provider value={value}>
            {props.Children}
        </AuthContext.Provider>
    )
}

export default AuthContext