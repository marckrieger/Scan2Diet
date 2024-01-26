import React, { useState } from 'react';
import { useColorScheme, Image, View, StyleSheet } from 'react-native';
import { useTheme, Text, TextInput, Button } from 'react-native-paper';

const LoginPage = ({navigation}) => {

    const [first_name, setFirstName] = React.useState("");
    const [last_name, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
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
                source={{uri: logoSource}}
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
                placeholder='Email'
                value={email}
                onChangeText={email => setEmail(email)}
                keyboardType='email-address'
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
            <Button uppercase='true' labelStyle={styles.buttonLabel} style={styles.button} mode="contained" onPress={() => navigation.navigate('LandingPage')}>
                Sign up
            </Button>
            <Text>
                Already have an account? <Text style={{color: theme.colors.primary}} onPress={() => navigation.navigate('LoginPage')}>Login</Text>
            </Text>
        </View>
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
        marginTop: 20,
        height: 60,
        justifyContent: 'center',
    },
    buttonLabel: {
        fontSize: 16,
    },
})

export default LoginPage;