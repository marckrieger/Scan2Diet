import React, { useState } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { useTheme, Text, Button } from 'react-native-paper';

const LandingPage = () => {

    const theme = useTheme();

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={{ uri: 'http://192.168.178.21:8000/static/img/logo.png' }}
            />
            <Text style={[styles.header, { color: theme.colors.primary }]}>Receipt2Health</Text>
            <Text style={styles.subheader}>Track your nutritional values by scanning your grocery receipts.</Text>
            <Button style={styles.button} mode="contained" onPress={() => console.log('Pressed')}>
                Login
            </Button>
            <Button style={[styles.button, {variant: 'labelLarge'}]} mode="outlined" onPress={() => console.log('Pressed')}>
                Sign up
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        // backgroundColor: 'rgb(240, 255, 240)',
        gap: 25,
        padding: 30,
    },
    header: {
        textAlign: 'center',
    },
    subheader: {
        textAlign: 'center',
    },
    logo: {
        width: 100,
        height: 100,
    },
    button: {
        width: '100%',
    },
})

export default LandingPage;