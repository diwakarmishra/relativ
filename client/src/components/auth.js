import React from 'react';
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth =() => {

    const [registerName, setRegisterName] = useState('')
    const [registerEmail, setregisterEmail] = useState('')
    const [registerPassword, setregisterPassword] = useState('')
    const [loginEmail, setloginEmail] = useState('')
    const [loginPassword, setloginPassword] = useState('')
    const navigate = useNavigate();

    const HandleRegisterSubmit = async(e) => {
        try {
            e.preventDefault();
            const response = await axios.post('/api/auth/register', {
                email: registerEmail , 
                username: registerName,
                password: registerPassword
            });
            if(response.status) {
                localStorage.setItem('token', response.data.token)
                navigate("/dashboard")
            }
        }
        catch ( error ) {
            toast.error('Something Went Wrong Please try again later!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };
    
    const HandleLoginSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('/api/auth/login', { 
                email: loginEmail , 
                password: loginPassword
            });
    
            if(response?.data.auth) {
                localStorage.setItem('token', response.data.token)
                navigate("/dashboard")
            }
        }
        catch ( error ) {
            toast.error('Invalid username or password!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    return (
        <div class="container">
        <ToastContainer />
        <div class="vh-100 d-flex justify-content-center align-items-center">
            <div class="col col-md-6 col-lg-5 col-xl-4 p-4 shadow-sm rounded-3 bg-white login-panel">
            <h1 class="text-center mb-3 text-logo">RELATYV</h1>

            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation"> <button class="nav-link active" id="login-tab" data-bs-toggle="pill" data-bs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="true">Login</button> </li>
                <li class="nav-item" role="presentation"> <button class="nav-link" id="register-tab" data-bs-toggle="pill" data-bs-target="#register" type="button" role="tab" aria-controls="register" aria-selected="false">Register</button> </li>
            </ul>

            <div class="tab-content">
                <div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab" tabindex="0">
                    <form onSubmit={HandleLoginSubmit}>

                        <div class="form-outline mb-3"> <label class="form-label">Email*</label> <input onChange={e => setloginEmail(e.target.value)} type="email" class="form-control" required /> </div>

                        <div class="form-outline mb-3"> <label class="form-label">Password*</label> <input type="password"  onChange={e => setloginPassword(e.target.value)} class="form-control" required /> </div>
      
                        <div class="row mb-3 justify-content-between">
                        <div class="col-6 d-flex">
                           
                            <div class="form-check mb-3 mb-md-0"> <input class="form-check-input" type="checkbox" value="" id="loginCheck" checked /> <label class="form-check-label" for="loginCheck"> Remember me </label> </div>
                        </div>
                        <div class="col-6 d-flex">
                            <a href="#!">Forgot password?</a> 
                        </div>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block">Sign in</button> 
                    </form>
                </div>
                <div class="tab-pane fade" id="register" role="tabpanel" aria-labelledby="register-tab" tabindex="0">
                    <form onSubmit={HandleRegisterSubmit}>

                        <div class="form-outline mb-3"> <label class="form-label" for="registerName">Name*</label> <input type="text" onChange={e => setRegisterName(e.target.value) } id="registerName" class="form-control" required /> </div>
                      
                        <div class="form-outline mb-3"> <label class="form-label" for="registerEmail">Email*</label> <input type="email" onChange={e => setregisterEmail(e.target.value)} id="registerEmail" class="form-control" required /> </div>
                        
                        <div class="form-outline mb-3"> <label class="form-label" for="registerPassword">Password*</label> <input type="password" onChange={e => setregisterPassword(e.target.value)}  id="registerPassword" class="form-control" required /> </div>
                         <button type="submit" class="btn btn-primary btn-block mb-3">Register</button> 
                    </form>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}

export default Auth