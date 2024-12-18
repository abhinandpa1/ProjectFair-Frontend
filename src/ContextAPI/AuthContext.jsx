import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
//create context
 export const AuthContextResponse = createContext()



function AuthContext({children}) {
    // create state
    const [isAuthorized, setAuthorized] = useState(false)

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setAuthorized(true)
        }
        else {
            setAuthorized(false)
        }
    },[isAuthorized])
    return (
        <div>
            <AuthContextResponse.Provider value={{ isAuthorized, setAuthorized }}>
                {children}
            </AuthContextResponse.Provider>
        </div>
    )
}

export default AuthContext