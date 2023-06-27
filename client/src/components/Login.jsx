import React, { useState } from 'react';
// import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigation = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          // Send a POST request to the backend to login the user
          let result = await fetch('http://localhost:5000/login', { 
            method: 'post',
            body: JSON.stringify({username, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        if(result.auth){
          localStorage.setItem('user', JSON.stringify(result.user));
          localStorage.setItem('token', JSON.stringify(result.auth));
          navigation("/");
        }
        //   const { token } = response.data;
    
        //   // Save the token in the browser's local storage
        //   localStorage.setItem('token', token);
        //   window.alert('User login successfully');
        //   // Redirect to a protected page
        //  navigation.push('/products');
        } catch (error) {
          setMessage('Invalid credentials');
        }
      };
    return (
        <>
            <div className='container my-5'>
                <div className='row'>
                    <div className='offset-md-3 col-md-6'>
                        <form className="bg-light p-5" onSubmit={handleLogin}>
                            <h2>Login</h2>
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
                                <button type="submit">Login</button>
                                <p>{message}</p>
                            </div>
                            <div className='mb-3 mt-3'>
                            <Link to="/register">Register</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

           
        </>
    )
}

export default Login;