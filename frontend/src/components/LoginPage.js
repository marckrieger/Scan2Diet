import React, { useState, useEffect } from "react";
import axios from "axios";

function LoginPage(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://192.168.178.21:8000/api/user_login/', {
                username,
                password,
            });

            console.log(response.data);
            // Handle successful login, e.g., redirect to home page
            props.onLogin();

        } catch (error) {
            console.error('Login failed:', error.response.data);
            // Handle login failure, e.g., display an error message
            window.alert('Login failed!');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default LoginPage;