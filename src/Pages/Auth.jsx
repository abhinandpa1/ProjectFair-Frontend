import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI, registerAPI } from '../Services/allAPIs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Auth({ register }) {

    const navigate = useNavigate()
    // hold username, email, etc.
    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleRegister = async (e) => {
        e.preventDefault(); 
        console.log(userDetails);

        const { username, email, password } = userDetails;
        if (!username || !email || !password) {
            toast.warn('Please fill the form!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            try {
                // API fetch
                const response = await registerAPI(userDetails);
                console.log(response);
                if (response.status === 200) {
                    toast.info(response.data, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setTimeout(()=>{
                     navigate('/login')
                    },6000)
                    

                } else {
                    toast.error(response.response.data.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            } catch (error) {
                toast.error("API Error " + error, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault(); 
        console.log(userDetails);

        const { email, password } = userDetails;
        if (!email || !password) {
            toast.warn('Please fill the form!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        } else {
            try {
                // API fetch
                const response = await loginAPI(userDetails);
                console.log(response);

                if (response.status === 200) {
                    toast.info("Login Successful", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setTimeout(()=>{
                        navigate('/')
                       },6000)
                       sessionStorage.setItem("username",response.data.currentUser.username)
                       sessionStorage.setItem("token",response.data.token)
                    
                } else {
                    toast.error(response.response.data, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            } catch (error) {
                const errorMessage = error.response ? error.response.data : error.message;
                toast.error("API Error: " + errorMessage, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row align-items-center">
                <div className="col-md-6 text-center">
                    {register ? (
                        <img
                            src="https://media1.giphy.com/media/l4APzWgd7D1CQkPdKB/giphy.gif"
                            alt="Authentication Illustration"
                            width="100%"
                            height="auto"
                        />
                    ) : (
                        <img
                            src="https://cdn.dribbble.com/users/1525393/screenshots/15722735/media/fdb36d13151cbc4030699f668faa4226.gif"
                            alt="Authentication Illustration"
                            width="100%"
                            height="auto"
                        />
                    )}
                </div>

                <div className="col-md-6">
                    <h3 className="text-info text-center mb-4">Project Fair</h3>
                    <h6 className="text-center mb-4">{register ? "Sign Up" : "Sign In"}</h6>

                    <form onSubmit={register ? handleRegister : handleLogin}>
                        {register && (
                            <input
                                onChange={e => setUserDetails({ ...userDetails, username: e.target.value })}
                                type="text"
                                placeholder="Username"
                                className="form-control mb-3"
                            />
                        )}
                        <input
                            onChange={e => setUserDetails({ ...userDetails, email: e.target.value })}
                            type="email"
                            placeholder="Email"
                            className="form-control mb-3"
                        />
                        <input
                            onChange={e => setUserDetails({ ...userDetails, password: e.target.value })}
                            type="password"
                            placeholder="Password"
                            className="form-control mb-3"
                        />

                        <div className="text-center">
                            {register ? (
                                <div>
                                    <button
                                        type="submit"
                                        className="btn btn-info btn-sm w-100 mb-3"
                                    >
                                        Sign Up
                                    </button>
                                    <p>
                                        Already Registered?{" "}
                                        <Link to="/login" className="text-info">Login Now</Link>
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <button
                                        type="submit"
                                        className="btn btn-info btn-sm w-100 mb-3"
                                    >
                                        Sign In
                                    </button>
                                    <p>
                                        New to here?{" "}
                                        <Link to="/register" className="text-info">Register Now</Link>
                                    </p>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
}

export default Auth;


