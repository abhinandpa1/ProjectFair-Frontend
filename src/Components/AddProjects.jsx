import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { IoMdAdd } from "react-icons/io";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { addProjectAPI } from '../Services/allAPIs';
import { addProjectContextResponse } from '../ContextAPI/ContextShare';


function AddProjects() {

    const{addProjectContext,setAddProjectContext} =useContext(addProjectContextResponse)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [projectDetails, setProjectDetails] = useState({
        title: "",
        language: "",
        github: "",
        website: "",
        overview: "",
        projectImg: ""
    })

    const [preview, setPreview] = useState("")

    const handleAddProject = async () => {
        console.log(projectDetails);
        const { title, language, github, website, overview, projectImg } = projectDetails
        if (!title || !language || !github || !website || !overview || !projectImg) {
            alert("Please fill the form")
        }
        else {
            //API CALL

            const reqBody = new FormData()
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
                    const response = await addProjectAPI(reqBody, reqheader)
                    console.log(response);
                    setAddProjectContext(response.data)
                    if(response.status==200){
                        alert("Project Added Successfully")
                        handleClose()
                        setProjectDetails({
                            title: "",
                            language: "",
                            github: "",
                            website: "",
                            overview: "",
                            projectImg: ""
                        })
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

    }
    // image file to URL convertion
    useEffect(() => {
        if (projectDetails.projectImg) {
            setPreview(URL.createObjectURL(projectDetails.projectImg))
        }
    }, [projectDetails.projectImg])

    return (
        <div>
            <Button type="button" class="btn btn-outline-info" onClick={handleShow}>
                Add <IoMdAdd className='fs-3' />
            </Button>

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
                                <img width={400} height={350} src={preview ? preview : "https://cdn.dribbble.com/users/2105902/screenshots/10857439/animated-icon_1.gif"} alt="" />
                            </label>

                            <p className='text-danger fw bolder'>* Only allows following file type formats .png , .jpg</p>
                        </div>
                        <div className="col-6">

                            <FloatingLabel controlId="floatingInput" label="Title" className="mb-3">
                                <Form.Control onChange={e => setProjectDetails({ ...projectDetails, title: e.target.value })} type="text" placeholder="Title" />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingPassword" label="Language" className="mb-3">
                                <Form.Control onChange={e => setProjectDetails({ ...projectDetails, language: e.target.value })} type="text" placeholder="Language" />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingPassword" label="GitHub" className="mb-3">
                                <Form.Control onChange={e => setProjectDetails({ ...projectDetails, github: e.target.value })} type="text" placeholder="itHub" />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingPassword" label="Website" className="mb-3">
                                <Form.Control onChange={e => setProjectDetails({ ...projectDetails, website: e.target.value })} type="text" placeholder="Website" />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingTextarea2" label="Overview" className="mb-3">
                                <Form.Control onChange={e => setProjectDetails({ ...projectDetails, overview: e.target.value })} as="textarea" placeholder="Overview of your project" style={{ height: '100px' }} />
                            </FloatingLabel>


                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleAddProject}>Upload <MdOutlineDriveFolderUpload className='fs-3' /></Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddProjects