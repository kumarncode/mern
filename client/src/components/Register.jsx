import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigation = useNavigate();
    //    const history = useHistory();
    useEffect(()=> {
        const auth = localStorage.getItem('user');
        if(auth){
            navigation("/");
        }
    })
    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to the backend to register the user
            let result = await fetch('http://localhost:5000/register', { 
                method: 'post',
                body: JSON.stringify({username, password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            result = await result.json();
            console.log(result);
              localStorage.setItem('user', JSON.stringify(result.user));
              localStorage.setItem('token', JSON.stringify(result.auth));
              navigation("/");

            // await axios.post('http://localhost:5000/register', { username, password });
            window.alert('User registered successfully');
            setMessage('User registered successfully');
        } catch (error) {
            setMessage('Failed to register user');
        }
    };



    return (
        <div>
            <div className='container my-5'>
                <div className='row'>
                    <div className='offset-md-3 col-md-6'>
                        <form className="bg-light p-5" onSubmit={handleRegister}>
                            <h2>Register</h2>
                            <div className="mb-3 mt-3">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 mt-3">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 mt-3">
                                <button type="submit">Register</button>
                                <p>{message}</p>
                            </div>
                            <div className='mb-3 mt-3'>
                                <Link to="/login">Login</Link>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
