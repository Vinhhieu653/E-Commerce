import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CSS/Login.css';;

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const changeHandle = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            login();
        }
    };

    const login = async () => {
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
            window.location.reload();
        } else {
            alert(responseData.errors);
        }
    };

    return (
        <div className='login-container'>
            <h1>Login</h1>
            <div className='login-fields'>
                <input name='email' value={formData.email}
                    onChange={changeHandle} type='email' placeholder='Enter Your Email' />
                <input name='password' value={formData.password}
                    onChange={changeHandle} type='password' placeholder='Enter Your Password'
                    onKeyDown={handleKeyPress} />
            </div>
            <button onClick={login}>Login</button>
            <p className='text-for-register'>Do not have an account?
                <Link to='/register' style={{ textDecoration: 'none' }}> Create it now!</Link>
            </p>
        </div>

    );
};

export default Login;
