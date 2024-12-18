import { MdEdit} from 'react-icons/md';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { IoMdAdd } from "react-icons/io";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { editProjectAPI } from '../Services/allAPIs';
import { serverUrl } from '../Services/ServerUrl';
import { editProjectContextResponse } from '../ContextAPI/ContextShare';
function EditProjects({project}) {

     const{editProjectContext,setEditProjectContext} =useContext(editProjectContextResponse)

     const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
  


      const [projectDetails, setProjectDetails] = useState({
        id: project._id,
        title: project.title,
        language: project.language,
        github: project.github,
        website: project.website,
        overview: project.overview,
        projectImg: ""
      })
  
      const [preview, setPreview] = useState("")


//Edit API CALL
  const handleEdit = async () => {
        console.log(projectDetails);
        const { id , title, language, github, website, overview, projectImg } = projectDetails
      
            //API CALL
            const reqBody = new FormData()
            reqBody.append("id",id)
            reqBody.append("title", title)
            reqBody.append("language", language)
            reqBody.append("github", github)
            reqBody.append("website", website)
            reqBody.append("overview", overview)
            reqBody.append("projectImg", projectImg)

            const token = sessionStorage.getItem("token")
            console.log(token);

            if (token) {
                const reqheader = {
                    "Content-Type": "multipart/form-json",
                    "Authorization": `Bearer ${token}`
                }
                try {
                    //API CALLING
                    const response = await editProjectAPI( id,reqBody, reqheader)
                    console.log(response);
                    // setAddProjectContext(response.data)
                    if(response.status==200){
                        
                        setEditProjectContext(response.data)
                        alert("Project Updated...")
                        handleClose()
                       
                        
                        // setPreview("")
                    }
                    else{
                        alert(response.response.data)
                    }

                }
                catch (err) {
                    console.log(err);

                }
            }



        

    }
          useEffect(() => {
              if (projectDetails.projectImg) {
                  setPreview(URL.createObjectURL(projectDetails.projectImg))
              }
          }, [projectDetails.projectImg])
  return (
    <div>
      <MdEdit
      onClick={handleShow}
        style={{ fontSize: '1.5rem', color: '#6c757d', cursor: 'pointer' }}
        title="Edit Project"
        onMouseEnter={(e) => (e.currentTarget.style.color = '#007bff')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#6c757d')}
        />

<Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload Your Project here...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-6">
                            <label>
                                <input type="file" onChange={e => setProjectDetails({ ...projectDetails, projectImg: e.target.files[0] })} style={{ display: 'none' }} />
                                <img width={400} height={350} src={preview ? preview : `${serverUrl}/uploads/${project.projectImg}` } alt="" />
                            </label>

                            <p className='text-danger fw bolder'>* Only allows following file type formats .png , .jpg</p>
                        </div>
                        <div className="col-6">

                            <FloatingLabel controlId="floatingInput" label="Title" className="mb-3">
                                <Form.Control value={projectDetails.title} onChange={e => setProjectDetails({ ...projectDetails, title: e.target.value })} type="text" placeholder="Title" />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingPassword" label="Language" className="mb-3">
                                <Form.Control value={projectDetails.language} onChange={e => setProjectDetails({ ...projectDetails, language: e.target.value })} type="text" placeholder="Language" />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingPassword" label="GitHub" className="mb-3">
                                <Form.Control value={projectDetails.github} onChange={e => setProjectDetails({ ...projectDetails, github: e.target.value })} type="text" placeholder="itHub" />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingPassword" label="Website" className="mb-3">
                                <Form.Control value={projectDetails.website} onChange={e => setProjectDetails({ ...projectDetails, website: e.target.value })} type="text" placeholder="Website" />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingTextarea2" label="Overview" className="mb-3">
                                <Form.Control value={projectDetails.overview} onChange={e => setProjectDetails({ ...projectDetails, overview: e.target.value })} as="textarea" placeholder="Overview of your project" style={{ height: '100px' }} />
                            </FloatingLabel>


                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleEdit} >Upload <MdOutlineDriveFolderUpload className='fs-3' /></Button>
                </Modal.Footer>
            </Modal> 
    </div>
  )
}

export default EditProjects