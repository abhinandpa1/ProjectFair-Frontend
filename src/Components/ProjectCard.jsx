import React, { useState } from "react";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { AiOutlineGithub } from "react-icons/ai";
import { IoIosLink } from "react-icons/io";
import { serverUrl } from "../Services/ServerUrl";

function ProjectCard({project}) {
  const [centredModal, setCentredModal] = useState(false);
  const toggleOpen = () => setCentredModal(!centredModal);

  return (
    <div>
      <MDBCard
        onClick={toggleOpen}
        className="project-card"
        style={{
          cursor: "pointer",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "scale(1.05)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "scale(1)")
        }
      >
        <MDBCardImage
          src={project?`${serverUrl}/uploads/${project.projectImg}` : "https://i.pinimg.com/originals/60/69/06/6069060ed00f7ecc749c32a5dd84b188.gif"}
          position="top"
          alt="Project Thumbnail"
          style={{
            height: "200px",
            objectFit: "cover",
          }}
        />
        <MDBCardBody
          className="text-center"
          style={{
            background: "linear-gradient(135deg, #ece9e6, #ffffff)",
          }}
        >
          <MDBCardTitle className="text-center">{project.title}</MDBCardTitle>
        </MDBCardBody>
      </MDBCard>
      <MDBModal tabIndex="-1" open={centredModal} onClose={toggleOpen}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{project.title}</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="row">
                <div className="col-6">
                  <MDBCardImage
                    src={project?`${serverUrl}/uploads/${project.projectImg}` : "https://i.pinimg.com/originals/60/69/06/6069060ed00f7ecc749c32a5dd84b188.gif"}
                    position="top"
                    alt="..."
                    style={{
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <div className="col-6">
                  <h3>Description</h3>
                  <p>
                    {project.overview}
                  </p>
                  <h3>Technologies</h3>
                  <p>{project.language}</p>
                  <h3>View On</h3>
                  <MDBBtn className="fs-1 m-2" >
                    <AiOutlineGithub href={project.github} />
                  </MDBBtn>
                  <MDBBtn className="fs-1" >
                    <IoIosLink href={project.website} />
                  </MDBBtn>
                </div>
              </div>
            </MDBModalBody>
            <MDBModalFooter></MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}

export default ProjectCard;
