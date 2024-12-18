import React, { useContext } from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
} from 'mdb-react-ui-kit';
import { AuthContextResponse } from '../ContextAPI/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MdOutlineLaptop } from "react-icons/md";

function Header() {
    const navigate = useNavigate();
    const { isAuthorized, setAuthorized } = useContext(AuthContextResponse);

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
        window.location.reload();
    };

    return (
        <div>
            <MDBNavbar light bgColor='info'>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='#'>
                    <MdOutlineLaptop className='fs-1'/>
                        <span className='text-light'> PROJECT FAIR</span>
                    </MDBNavbarBrand>
                    {isAuthorized && (
                        <button className='btn btn-danger ms-auto' onClick={handleLogout}>
                            LogOut
                        </button>
                    )}
                </MDBContainer>
            </MDBNavbar>
        </div>
    );
}

export default Header;
