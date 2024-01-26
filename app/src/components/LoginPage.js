import React, { useState } from 'react';
import { useColorScheme, Image, View, StyleSheet } from 'react-native';
import { useTheme, Text, TextInput, Button } from 'react-native-paper';

const LoginPage = ({ navigation }) => {

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
                source={{ uri: logoSource }}
            />
            <Text variant='headlineMedium'>Welcome back.</Text>
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
            <Text style={{ textAlign: 'right', width: '100%' }}>
                Forgot your password?
            </Text>
            <Button uppercase='true' labelStyle={styles.buttonLabel} style={styles.button} mode="contained" onPress={() => navigation.navigate('AppPage')}>
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