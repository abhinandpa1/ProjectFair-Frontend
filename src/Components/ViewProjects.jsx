import React, { useContext, useEffect, useState} from 'react';
import {  MdDelete } from 'react-icons/md';
import { FaGithub, FaLink } from 'react-icons/fa6';
import { deleteProjectAPI, getAUserProjectAPI } from '../Services/allAPIs';
import { addProjectContextResponse, editProjectContextResponse } from '../ContextAPI/ContextShare';
import EditProjects from './EditProjects';


function ViewProjects() {

  const{addProjectContext,setAddProjectContext} =useContext(addProjectContextResponse)
  const{editProjectContext,setEditProjectContext} =useContext(editProjectContextResponse)

  const [token, setToken] = useState("");
  const [projectDetails, setProjectDetails] = useState([]);

  const getAUserProject = async () => {
    if (token) {
      const reqheader = {
        "Content-Type": "multipart/form-json",
        "Authorization": `Bearer ${token}`,
      };
      console.log(reqheader);
      try {
        const response = await getAUserProjectAPI(reqheader);
        console.log(response);
        setProjectDetails(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

 const handledelete=async(projectId)=>{
    if (token) {
      const reqheader = {
        "Content-Type": "multipart/form-json",
        "Authorization": `Bearer ${token}`,
      };
    try {
      const deleteProject = await deleteProjectAPI(projectId,reqheader)
      console.log(deleteProject);
      alert("Project Deleted")
      window.location.reload()
      
    } catch (err) {
      console.log(err);
      
    }
  }
}

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
    getAUserProject();
  }, [token,addProjectContext,editProjectContext]);

  return (
    <div style={{ maxWidth: '1200px', margin: 'auto' }}>
      <div style={{ padding: '16px', marginRight: '20px', marginTop: '20px' }}>
        {projectDetails.length > 0 ? (
          projectDetails.map((project, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#f0f4ff',
                border: '1px solid #ddd',
                borderRadius: '5px',
                padding: '16px',
                margin: '8px 0',
                transition: 'transform 0.3s, box-shadow 0.3s',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 10px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              <h5 style={{ fontSize: '1.2rem', fontWeight: '600', margin: '0' }}>{project.title}</h5>
              <div style={{ display: 'flex', gap: '10px' }}>
                <EditProjects project={project}/>
                <FaGithub
                  style={{ fontSize: '1.5rem', color: '#6c757d', cursor: 'pointer' }}
                  title="GitHub Link"
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#007bff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#6c757d')}
                />
                <FaLink
                  style={{ fontSize: '1.5rem', color: '#6c757d', cursor: 'pointer' }}
                  title="Project Link"
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#007bff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#6c757d')}
                />
                <MdDelete
                onClick={()=>handledelete(project._id)}
                  style={{ fontSize: '1.5rem', color: '#6c757d', cursor: 'pointer' }}
                  title="Delete Project"
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#dc3545')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#6c757d')}
                />
              </div>
            </div>
          ))
        ) : (
          <p style={{ fontSize: '1.2rem', color: '#6c757d', textAlign: 'center', marginTop: '20px' }}>
            No Projects to Show !!
          </p>
        )}
      </div>
    </div>
  );
}

export default ViewProjects;

