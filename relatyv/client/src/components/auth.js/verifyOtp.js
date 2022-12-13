import React from 'react';
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyOtp =() => {

    const [OTP, setOTP] = useState('')
    const navigate = useNavigate();

    const HandleRegisterVerify = async(e) => {
        try {
            e.preventDefault();
            const secret = localStorage.getItem('secret')
            const response = await axios.post('/api/auth/verify/otp', {
                otp: OTP,
                secret: secret
            });
            if(response.status) {
                localStorage.setItem('token', response.data.token)
                localStorage.removeItem('secret');
                navigate("/dashboard")
            }
        }
        catch ( error ) {
            toast.error('Something Went Wrong Please try again later!', {
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
                <li class="nav-item" role="presentation"> <button class="nav-link active" id="login-tab" data-bs-toggle="pill" data-bs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="true">Enter OTP</button> </li>
            </ul>

            <div class="tab-content">
                <div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab" tabindex="0">
                    <form onSubmit= {HandleRegisterVerify}>

                        <div class="form-outline mb-3"> <label class="form-label"></label> <input onChange={e => setOTP(e.target.value)} type="text" class="form-control" required /> </div>
                        <div class="row mb-3 justify-content-between">
                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn btn-primary btn-block">Verify</button> 
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}

export default VerifyOtp