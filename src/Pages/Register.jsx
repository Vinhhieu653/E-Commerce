import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CSS/Register.css';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
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
            register();
        }
    };

    const register = async () => {
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
        <div className='register-container'>
            <h1>Register</h1>
            <div className='register-fields'>
                <input name='username' value={formData.username}
                    onChange={changeHandle} type='text' placeholder='Enter Your Name' />
                <input name='email' value={formData.email}
                    onChange={changeHandle} type='email' placeholder='Enter Your Email' />
                <input name='password' value={formData.password}
                    onChange={changeHandle} type='password' placeholder='Enter Your Password'
                    onKeyDown={handleKeyPress} />
            </div>
            <button onClick={register}>Register</button>
            <p className='text-for-login'>Already have an account?
                <Link to='/login' style={{ textDecoration: 'none' }}> Login here!</Link>
            </p>
        </div>
    );
};

export default Register;
