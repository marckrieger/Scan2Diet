import React, { useState, useEffect } from "react";
import Avatar from '@mui/material/Button';
import axios from "axios";
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

function App() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  axios.get('http://192.168.178.21:8000/api/get_csrf_token/')
    .then(response => {
        const csrfToken = response.data.csrfToken;
        axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
    })
    .catch(error => {
        console.error('Error fetching CSRF token: ', error);
    })

  return (
    <div>
      {userIsLoggedIn ? <HomePage onLogout={() => setUserIsLoggedIn(false)} /> : <LoginPage onLogin={() => setUserIsLoggedIn(true)} />}
    </div>
  );
}

export default App;