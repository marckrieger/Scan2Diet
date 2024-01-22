import React, { useState } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

const LoginPage = () => {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <View>
            <Image
                style={styles.logo}
                source={{ uri: 'http://192.168.178.21:8000/static/img/logo.png' }}
            />
            <Text>Welcome back.</Text>
            <TextInput
                mode='outlined'
                placeholder='Email'
                value={email}
                onChangeText={email => setEmail(email)}
            />
            <TextInput
                mode='outlined'
                placeholder='Password'
                value={password}
                onChangeText={password => setPassword(password)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 200,
    }
})

export default LoginPage;