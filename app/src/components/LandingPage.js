import React, { useState } from 'react';
import { useColorScheme, Image, View, StyleSheet } from 'react-native';
import { useTheme, Text, Button } from 'react-native-paper';

const LandingPage = ({ navigation }) => {

    const theme = useTheme();

    const colorScheme = useColorScheme();
    const logoSource =
        colorScheme === 'dark'
            ? require('../../assets/img/logo_dark.png')
            : require('../../assets/img/logo_light.png');

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.elevation.level3 }]}>
            <Image
                style={styles.logo}
                source={logoSource}
            />
            <Text variant='headlineLarge' style={[styles.header, { color: theme.colors.primary }]}>Scan2Diet</Text>
            <Text variant='titleMedium' style={styles.subheader}>Track your nutritional values by scanning your grocery receipts.</Text>
            <Button uppercase='true' labelStyle={styles.buttonLabel} style={styles.button} mode="contained" onPress={() => navigation.navigate('LoginPage')}>
                Login
            </Button>
            <Button uppercase='true' labelStyle={styles.buttonLabel} style={[styles.button, { backgroundColor: theme.colors.background }]} mode="outlined" onPress={() => navigation.navigate('SignupPage')}>
                Sign up
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        gap: 20,
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
        borderRadius: 20,
        justifyItems: 'center',
    },
    buttonLabel: {
        fontSize: 16,
        height: 30,
        marginTop: 19,
    },
})

export default LandingPage;