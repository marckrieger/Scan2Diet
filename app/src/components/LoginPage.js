import React, { useState } from 'react';
import { useColorScheme, Image, View, StyleSheet } from 'react-native';
import { useTheme, Text, TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const LoginPage = ({ navigation }) => {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    async function authenticate(username, password) {

        try {
            const loginResponse = await axios.post('http://192.168.178.21:8000/api/user_login/', {
                username,
                password,
            });

            console.log('Response: ' + loginResponse.data);

            const tokenResponse = await axios.post('http://192.168.178.21:8000/api/obtain_token/', {
                username,
                password,
            });

            await SecureStore.setItemAsync('token', tokenResponse.data.token);

            navigation.reset({ index: 0, routes: [{ name: 'AppPage' }], });
        } catch (error) {
                console.log(error.message);
        }
    }

    const theme = useTheme();

    const colorScheme = useColorScheme();
    const logoSource =
        colorScheme === 'dark'
            ? 'http://192.168.178.21:8000/static/img/logo_dark.png'
            : 'http://192.168.178.21:8000/static/img/logo_light.png';

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.elevation.level3 }]}>
            <Image
                style={styles.logo}
                source={{ uri: logoSource }}
            />
            <Text variant='headlineMedium'>Welcome back.</Text>
            <TextInput
                style={styles.input}
                outlineStyle={{ borderRadius: 20 }}
                mode='outlined'
                placeholder='Username'
                value={username}
                onChangeText={username => setUsername(username)}
                autoCapitalize='none'
            />
            <TextInput
                style={styles.input}
                outlineStyle={{ borderRadius: 20 }}
                mode='outlined'
                placeholder='Password'
                value={password}
                onChangeText={password => setPassword(password)}
                secureTextEntry={true}
                autoCapitalize='none'
            />
            <Text style={{ textAlign: 'right', width: '100%' }}>
                Forgot your password?
            </Text>
            <Button uppercase='true' labelStyle={styles.buttonLabel} style={styles.button} mode="contained" onPress={()=>authenticate(username, password)}>
                Login
            </Button>
            <Text>
                Don't have an account? <Text style={{ color: theme.colors.primary }} onPress={() => navigation.navigate('SignupPage')}>Sign up</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        gap: 20,
        padding: 20,
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
    },
    input: {
        width: '100%',
    },
    button: {
        width: '100%',
        borderRadius: 20,
        marginTop: 20,
        height: 60,
        justifyContent: 'center',
    },
    buttonLabel: {
        fontSize: 16,
    },
})

export default LoginPage;