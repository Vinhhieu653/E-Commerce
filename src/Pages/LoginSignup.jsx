import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { useNavigate } from 'react-router-dom';



const LoginSignup = () => {
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    });

    const navigate = useNavigate();

    const changeHandle = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            state === "Login" ? login() : register();
        }
    };

    const login = async () => {
        console.log("Login  clicked", formData);
        let responseData;
        await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then((response) => response.json())
            .then((data) => responseData = data);

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            navigate('/');

        } else {
            alert(responseData.errors);
        }
    };

    const register = async () => {
        console.log("Sign Up clicked", formData);
        let responseData;
        await fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then((response) => response.json())
            .then((data) => responseData = data);

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            navigate('/login');

        } else {
            alert(responseData.errors);
        }
    };

    return (
        <div className='login-signup'>
            <div className='login-signup-container'>
                <h1>{state}</h1>
                <div className='login-signup-fields'>
                    {state === "Sign Up" ? <input name='username' value={formData.username}
                        onChange={changeHandle} type='text' placeholder='Enter Your Name' />
                        : <></>}
                    <input name='email' value={formData.email}
                        onChange={changeHandle} type='email' placeholder='Enter Your Email' />
                    <input name='password' value={formData.password}
                        onChange={changeHandle} type='password' placeholder='Enter Your Password'
                        onKeyDown={handleKeyPress} />
                </div>
                <button onClick={() => { state === "Login" ? login() : register() }}>
                    Continue
                </button>
                {state === "Sign Up"
                    ? <p className='login-signup-login'>Already have an account?
                        <span onClick={() => { setState("Login") }}> Click here</span> </p>
                    : <p className='login-signup-login'>Create an account?
                        <span onClick={() => { setState("Sign Up") }}> Click here</span> </p>
                }
                <div className='login-signup-agree'>
                    <input type='checkbox' name='' id='' />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
