import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, TextField, Text, Button } from 'react-native-ui-lib';

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
        // <View>
        //     <Text>Login</Text>
        //     <TextInput
        //         type="text"
        //         placeholder="Username"
        //         value={username}
        //         onChangeText={(e) => setUsername(e.target.value)}
        //     />
        //     <TextInput
        //         type="password"
        //         placeholder="Password"
        //         value={password}
        //         onChangeText={(e) => setPassword(e.target.value)}
        //     />
        //     <Button onPress={handleLogin} title="Login"/>
        // </View>
        <View flex paddingH-25 paddingT-120>
            <Text blue50 text20>Welcome</Text>
            <TextField text50 placeholder="username" value={username} grey10 onChangeText={(e) => setUsername(e.target.value)} />
            <TextField text50 placeholder="password" value={password} secureTextEntry grey10 onChangeText={(e) => setPassword(e.target.value)} />
            <View marginT-100 center>
                <Button text70 white background-orange30 label="Login" />
                <Button link text70 orange30 label="Sign Up" marginT-20 />
            </View>
        </View>
    );
}

export default LoginPage;