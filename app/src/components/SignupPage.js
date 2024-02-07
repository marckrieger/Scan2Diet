import React, { useState } from 'react';
import { useColorScheme, Image, View, StyleSheet, ScrollView } from 'react-native';
import { useTheme, Text, TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const SignupPage = ({ navigation }) => {

    const [first_name, setFirstName] = React.useState("");
    const [last_name, setLastName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const theme = useTheme();

    const colorScheme = useColorScheme();
    const logoSource =
        colorScheme === 'dark'
            ? require('../../assets/img/logo_dark.png')
            : require('../../assets/img/logo_light.png');


    function authenticate(username, password) {
        axios.post('https://api.scan2diet.com/user_login/', {
            username: username,
            password: password,
        })
            .then((response) => {
                console.log(response);
                axios.post('https://api.scan2diet.com/obtain_token/', {
                    username: username,
                    password: password,
                })
                    .then((response) => {
                        SecureStore.setItemAsync('token', response.data.token);
                    }, (error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function register() {
        axios.post('https://api.scan2diet.com/user_register/', {
            first_name: first_name,
            last_name: last_name,
            // email: email,
            username: username,
            password: password,
        })
            .then((response) => {
                console.log(response);
                authenticate(username, password);
                navigation.reset({ index: 0, routes: [{ name: 'AppPage' }], })
            }, (error) => {
                console.log(error);
            });
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: theme.colors.elevation.level3 }}>
            <View style={[styles.container, { backgroundColor: theme.colors.elevation.level3 }]}>
                <Image
                    style={styles.logo}
                    source={logoSource}
                />
                <Text variant='headlineMedium'>Create Account</Text>
                <TextInput
                    style={styles.input}
                    outlineStyle={{ borderRadius: 20 }}
                    mode='outlined'
                    placeholder='First name'
                    value={first_name}
                    onChangeText={first_name => setFirstName(first_name)}
                />
                <TextInput
                    style={styles.input}
                    outlineStyle={{ borderRadius: 20 }}
                    mode='outlined'
                    placeholder='Last name'
                    value={last_name}
                    onChangeText={last_name => setLastName(last_name)}
                />
                <TextInput
                    style={styles.input}
                    outlineStyle={{ borderRadius: 20 }}
                    mode='outlined'
                    placeholder='Username'
                    value={username}
                    onChangeText={username => setUsername(username)}
                    autoCapitalize='none'
                />
                {/* <TextInput
                    style={styles.input}
                    outlineStyle={{ borderRadius: 20 }}
                    mode='outlined'
                    placeholder='Email'
                    value={email}
                    onChangeText={email => setEmail(email)}
                    keyboardType='email-address'
                    autoCapitalize='none'
                /> */}
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
                <Button uppercase='true' labelStyle={styles.buttonLabel} style={styles.button} mode="contained" onPress={register}>
                    Sign up
                </Button>
                <Text>
                    Already have an account? <Text style={{ color: theme.colors.primary }} onPress={() => navigation.navigate('LoginPage')}>Login</Text>
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        gap: 25,
        padding: 20,
        marginVertical: 40,
    },
    header: {
        textAlign: 'left',
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
        justifyItems: 'center',
    },
    buttonLabel: {
        fontSize: 16,
        height: 30,
        marginTop: 19,
    },
})

export default SignupPage;