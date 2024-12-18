import React, { useContext, useEffect, useState } from 'react'
import UserProfile from '../Components/UserProfile'
import AddProjects from '../Components/AddProjects'
import ViewProjects from '../Components/ViewProjects'
import { AuthContextResponse } from '../ContextAPI/AuthContext'
function Dashboard() {
    const [username,setUsername] = useState("")
    const {isAuthorized, setAuthorized} = useContext(AuthContextResponse)

    useEffect(()=>{

            if (sessionStorage.getItem("token")) {
                setAuthorized(true)
            }
            else {
                setAuthorized(false)
            } 
            setUsername(sessionStorage.getItem("username"))
        
    },[isAuthorized])
    console.log(isAuthorized);
    
  return (
    <div>
        <div className="row p-5">
            <h1>Welcome {username}</h1>
        </div>
        <div className="row p-5">
            <div className="col-8">
                <div className="row">
                    <div className="col-6">
                        <h3>My Projects</h3>
                    </div>
                    <div className="col-6">
                        <AddProjects/>
                    </div>
                </div>
                <div className="row">
                    <ViewProjects/>
                </div>
            </div>
            <div className="col-4">
                <UserProfile/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard