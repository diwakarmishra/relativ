

import React, { Component } from 'react';
import axios from 'axios';

class Sidebar extends Component {

    state = {
        registerName: '',
        registerEmail: '',
        registerPassword: '',
        loginEmail: '',
        loginPassword: ''
    };

    handleRegisterSubmit = async e => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/api/auth/register', { 
            email: this.state.registerEmail , 
            username: this.state.registerName,
            password: this.state.registerPassword
        });
        const body = response
    };

    handleLoginSubmit = async e => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/api/auth/login', { 
            email: this.state.loginEmail , 
            password: this.state.loginPassword
        });
        const body = response
        console.log(body, 'Body Is Here')
    };

    render() {
        return (
            <div class="sidebar-area d-md-flex p-2 p-md-4 flex-lg-column">
                <h1 class="mb-lg-4 pb-lg-4 text-logo mb-0">RELATYV</h1>
                <div class="menu-link mb-lg-auto">
                    <ul class="list-unstyled mb-0">
                    <li> <a href="/dashboard"><i class="fa fa-graduation-cap"></i> My Courses</a> </li>
                    <li> <a href="/calendar"><i class="fa fa-calendar"></i> Calendar</a> </li>
                    </ul>
                </div>
                <div class="profile-link mt-lg-4 pt-lg-4"> <img src="/images/user.jpg" /> Jane Doe </div>
            </div>
        )
    }

}

export default Sidebar