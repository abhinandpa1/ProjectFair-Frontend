import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '../Components/ProjectCard'
import { LuFolderSearch } from "react-icons/lu";
import { homeProjectAPI } from '../Services/allAPIs';
import { AuthContextResponse } from '../ContextAPI/AuthContext';
function Home() {
    // HOLD TOKEN FROM SESSIONSTORAGE
    const [token, setToken] = useState("");

    const {isAuthorized, setAuthorized} = useContext(AuthContextResponse)

    //2
    const [homeProject, setHomeProject] = useState([])

    //1
    const getHomeProject = async () => {
        const response = await homeProjectAPI()
        console.log(response);
        setHomeProject(response.data)//array
    }
    console.log(homeProject);


    useEffect(() => {
        if(sessionStorage.getItem("token")){
            setAuthorized(true)
        }
        else
        {
            setAuthorized(false)
        }
        getHomeProject()

    }, [isAuthorized]);
    console.log(token);
    
    return (
        <>
            <div className="container">
                <div className="row p-5 mb-5">
                    <div className="col-6 p-5">
                        <h1>Project Fair</h1>
                        <p style={{ textAlign: 'justify' }}>Project management software connects teams, enabling everyone in the organization to prioritize the work that matters most. Software that fosters this type of high-level collaboration is essential for most companies. But at a glance, many of the tools organizations use have seemingly similar features. Use our guide to narrow down your choices and understand which tools are best for different types of companies.</p>
                        {
                            isAuthorized ?
                                <Link to={'/dashboard'}>
                                    <button type="button" class="btn btn-outline-info">VIEW DASHBOARD 🔎</button>
                                </Link>
                                :
                                <Link to={'/login'}>
                                    <button type="button" class="btn btn-outline-info">GET STARTED 🚀</button>
                                </Link>
                        }
                    </div>
                    <div className="col-6">
                        <img width={600} height={500} src="https://cdn.dribbble.com/users/2520294/screenshots/7269423/alaminxyz.gif" alt="" />
                    </div>
                </div>

                <div className="p-5 mt-5">
                    <h2 className="text-center">Explore our Projects</h2>
                    <div
                        className="d-flex flex-wrap justify-content-center"
                        style={{ gap: "20px" }}
                    >
                        {
                            homeProject.length > 0 ? homeProject.map((project, index) => (
                                <div
                                    key={index}
                                    style={{ width: "250px", textAlign: "center" }}
                                >
                                    <ProjectCard project={project} />
                                </div>
                            )) : <p>No projects found</p>
                        }
                    </div>
                </div>


                <div className="row text-center m-5">
                   {
                    isAuthorized ? 
                    <Link to={'/projects'}>
                    <button type="button" class="btn btn-outline-info ">VIEW PROJECTS <LuFolderSearch className='fs-4' /></button>
                </Link>
                :"    "
                   }
                </div>

            </div>
        </>
    )
}

export default Home