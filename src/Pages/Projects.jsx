import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { getAllUserProjectAPI } from '../Services/allAPIs';
import ProjectCard from '../Components/ProjectCard';
function Projects() {
    // hold token
    const [token,setToken] = useState("")

    const [allUserProject,setAllUserProject] = useState([])


    // To hold search value from the input box
    const [searchKey,setSearchKey] = useState("")
    console.log(searchKey);
    
    //2 to define function for api fetching
    const getAllUserProjects = async ()=>{
        if (token) {
            const reqheader = {
                "Content-Type": "multipart/form-json",
                "Authorization": `Bearer ${token}`
            }
            console.log(reqheader);
            /// API CALL
            const response = await getAllUserProjectAPI(reqheader,searchKey)
            console.log(response);
            setAllUserProject(response.data)
            
        }
    }
    console.log(allUserProject);
    


    useEffect(()=>{
        setToken(sessionStorage.getItem("token"))
        getAllUserProjects()
    },[token,searchKey])

    return (
        <div>
            <div className="container p-5">
                <h1 className="text-center my-5">All Projects</h1>
                <div className="d-flex justify-content-center">
                    <div className="position-relative" style={{ maxWidth: '500px', width: '100%' }}>
                        <input
                            onChange={e=>setSearchKey(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Search by technology"
                            style={{ paddingRight: '40px' }}
                        />
                        <FaSearch
                            className="position-absolute"
                            style={{
                                top: '50%',
                                right: '10px',
                                transform: 'translateY(-50%)',
                                color: '#6c757d',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                            }}
                        />
                    </div>
                </div>

                <div className="p-5 mt-5">
                    <h2 className="text-center">Explore our Projects</h2>
                    <div
                        className="d-flex flex-wrap justify-content-center"
                        style={{ gap: "20px" }}
                    >
                        {
                            allUserProject.length > 0 ? allUserProject.map((project, index) => (
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

            </div>
        </div>
    );
}

export default Projects;

