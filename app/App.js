import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View } from 'react-native';
import { configureFonts, PaperProvider, Text, TextInput, DefaultTheme, Button } from 'react-native-paper';
import LoginPage from './src/components/LoginPage'
import LandingPage from './src/components/LandingPage'
import { useFonts } from "expo-font";

const App = () => {

  const [fontsLoaded, fontError] = useFonts({
    'Outfit-Bold': require('./assets/fonts/Outfit-Bold.ttf'),
    'Outfit-Regular': require('./assets/fonts/Outfit-Regular.ttf'),
    'Outfit-Light': require('./assets/fonts/Outfit-Light.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View>Loading...</View>
    );
  };

  const fontConfig = {
    "default": {
      "fontFamily": "Outfit-Regular",
    },
  };

  const theme = {
    ...DefaultTheme,
    version: 3,
    mode: 'adaptive',
    colors: {
      ...DefaultTheme.colors,
      primary: '#4E7A6A'
    },
    fonts: configureFonts({config: fontConfig }),
  };

  return (
    <PaperProvider theme={theme}>
      <LandingPage />
      <StatusBar style="auto" />
    </PaperProvider>
  );
};

export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
