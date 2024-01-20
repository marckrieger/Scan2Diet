import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LogoutButton(props) {

    const handleLogout = async () => {
        try {
            await axios.post('http://192.168.178.21:8000/api/user_logout/');
            props.onLogout();
        } catch (error) {
            console.error('Logout failed:', error.response.data);
            // Handle login failure, e.g., display an error message
            window.alert('Logout failed!');
        }
    };

    return (
        <div>
            <p>Welcome to Receipt2Diet!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default LogoutButton;