import React, { useState, useEffect } from "react";
import axios from "axios";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './components/LoginPage';
// import HomePage from './components/HomePage';

export default function App() {

  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  // axios.get('http://192.168.178.21:8000/api/get_csrf_token/')
  //   .then(response => {
  //       const csrfToken = response.data.csrfToken;
  //       axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
  //   })
  //   .catch(error => {
  //       console.error('Error fetching CSRF token: ', error);
  //   })


  return (
    <View>
      <LoginPage onLogin={() => setUserIsLoggedIn(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});