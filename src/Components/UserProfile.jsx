import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { MdOutlineRateReview } from "react-icons/md";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
function UserProfile() {
    const [open, setOpen] = useState(false);
  return (
    <div>
        <Button
        class="btn btn-outline-info"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        style={
        {float:'right'}
        }
      >
        VIEW DETAILS <MdOutlineRateReview className='fs-3' /> 
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text ">
          <div className='text-center'>
          <br />
         <img width={200} height={200} src="https://i.pinimg.com/originals/1e/b4/51/1eb4519054004be36177179c88c1f320.gif" alt="" />
         <input type="text" placeholder='Username' className='form-control mb-3 mt-3' />
         <input type="text" placeholder='GitHub' className='form-control mb-3' />
         <input type="text" placeholder='LinkedIn' className='form-control mb-3' />
         <button type="button" class="btn btn-outline-success">Upload <MdOutlineDriveFolderUpload className='fs-3' /></button>
          </div>
        </div>
      </Collapse>
    </div>
  )
}

export default UserProfile