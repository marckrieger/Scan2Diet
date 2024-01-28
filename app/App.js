import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, StyleSheet, Image, View } from 'react-native';
import { configureFonts, PaperProvider, Text, TextInput, MD3DarkTheme, MD3LightTheme, adaptNavigationTheme, Button } from 'react-native-paper';
import LandingPage from './src/components/LandingPage';
import LoginPage from './src/components/LoginPage';
import SignupPage from './src/components/SignupPage';
import CustomAppbar from './src/components/CustomAppbar';
import AppPage from './src/components/AppPage';
import { useFonts } from "expo-font";
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';

const Stack = createNativeStackNavigator();

const App = () => {

  const colorScheme = useColorScheme();

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
      "fontSize": 15,
    },
    "headlineSmall": {
      "fontFamily": "Outfit-Bold",
    },
    "headlineMedium": {
      "fontFamily": "Outfit-Bold",
    },
    "headlineLarge": {
      "fontFamily": "Outfit-Bold",
    },
    "titleSmall": {
      "fontFamily": "Outfit-Regular",
    },
    "titleMedium": {
      "fontFamily": "Outfit-Regular",
    },
    "titleLarge": {
      "fontFamily": "Outfit-Regular",
    },
    "labelSmall": {
      "fontFamily": "Outfit-Regular",
    },
    "labelMedium": {
      "fontFamily": "Outfit-Regular",
    },
    "labelLarge": {
      "fontFamily": "Outfit-Regular",
    },
    "bodySmall": {
      "fontFamily": "Outfit-Regular",
    },
    "bodyMedium": {
      "fontFamily": "Outfit-Regular",
    },
    "bodyLarge": {
      "fontFamily": "Outfit-Regular",
    },
  };

  const appLightScheme = {
    "colors": {
      "primary": "rgb(0, 109, 63)",
      "onPrimary": "rgb(255, 255, 255)",
      "primaryContainer": "rgb(149, 247, 185)",
      "onPrimaryContainer": "rgb(0, 33, 16)",
      "secondary": "rgb(79, 99, 84)",
      "onSecondary": "rgb(255, 255, 255)",
      "secondaryContainer": "rgb(209, 232, 213)",
      "onSecondaryContainer": "rgb(12, 31, 20)",
      "tertiary": "rgb(59, 100, 112)",
      "onTertiary": "rgb(255, 255, 255)",
      "tertiaryContainer": "rgb(190, 234, 247)",
      "onTertiaryContainer": "rgb(0, 31, 38)",
      "error": "rgb(186, 26, 26)",
      "onError": "rgb(255, 255, 255)",
      "errorContainer": "rgb(255, 218, 214)",
      "onErrorContainer": "rgb(65, 0, 2)",
      "background": "rgb(251, 253, 248)",
      "onBackground": "rgb(25, 28, 26)",
      "surface": "rgb(251, 253, 248)",
      "onSurface": "rgb(25, 28, 26)",
      "surfaceVariant": "rgb(220, 229, 219)",
      "onSurfaceVariant": "rgb(65, 73, 66)",
      "outline": "rgb(113, 121, 113)",
      "outlineVariant": "rgb(192, 201, 192)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(46, 49, 46)",
      "inverseOnSurface": "rgb(240, 241, 236)",
      "inversePrimary": "rgb(121, 218, 158)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(238, 246, 239)",
        "level2": "rgb(231, 242, 233)",
        "level3": "rgb(223, 237, 228)",
        "level4": "rgb(221, 236, 226)",
        "level5": "rgb(216, 233, 222)"
      },
      "surfaceDisabled": "rgba(25, 28, 26, 0.12)",
      "onSurfaceDisabled": "rgba(25, 28, 26, 0.38)",
      "backdrop": "rgba(42, 50, 44, 0.4)"
    }
  };

  const appDarkScheme = {
    "colors": {
      "primary": "rgb(121, 218, 158)",
      "onPrimary": "rgb(0, 57, 30)",
      "primaryContainer": "rgb(0, 82, 46)",
      "onPrimaryContainer": "rgb(149, 247, 185)",
      "secondary": "rgb(181, 204, 186)",
      "onSecondary": "rgb(33, 53, 40)",
      "secondaryContainer": "rgb(55, 75, 61)",
      "onSecondaryContainer": "rgb(209, 232, 213)",
      "tertiary": "rgb(163, 205, 219)",
      "onTertiary": "rgb(3, 54, 64)",
      "tertiaryContainer": "rgb(33, 76, 88)",
      "onTertiaryContainer": "rgb(190, 234, 247)",
      "error": "rgb(255, 180, 171)",
      "onError": "rgb(105, 0, 5)",
      "errorContainer": "rgb(147, 0, 10)",
      "onErrorContainer": "rgb(255, 180, 171)",
      "background": "rgb(25, 28, 26)",
      "onBackground": "rgb(225, 227, 222)",
      "surface": "rgb(25, 28, 26)",
      "onSurface": "rgb(225, 227, 222)",
      "surfaceVariant": "rgb(65, 73, 66)",
      "onSurfaceVariant": "rgb(192, 201, 192)",
      "outline": "rgb(138, 147, 139)",
      "outlineVariant": "rgb(65, 73, 66)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(225, 227, 222)",
      "inverseOnSurface": "rgb(46, 49, 46)",
      "inversePrimary": "rgb(0, 109, 63)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(30, 38, 33)",
        "level2": "rgb(33, 43, 37)",
        "level3": "rgb(36, 49, 41)",
        "level4": "rgb(37, 51, 42)",
        "level5": "rgb(38, 55, 45)"
      },
      "surfaceDisabled": "rgba(225, 227, 222, 0.12)",
      "onSurfaceDisabled": "rgba(225, 227, 222, 0.38)",
      "backdrop": "rgba(42, 50, 44, 0.4)"
    }
  };

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const theme =
    colorScheme === 'dark'
      ? {
        ...MD3DarkTheme,
        ...DarkTheme,
        version: 3,
        colors: {
          ...DarkTheme.colors,
          ...appDarkScheme.colors,
        },
        fonts: configureFonts({ config: fontConfig }),
      } : {
        ...LightTheme,
        ...MD3LightTheme,
        version: 3,
        colors: appLightScheme.colors,
        fonts: configureFonts({ config: fontConfig }),
      };

  function getInitialRouteName() {
    const token = SecureStore.getItem('token');
    console.log(token);
    return token===undefined ? 'LandingPage' : 'AppPage';
  }

  const initialRouteName = getInitialRouteName();

  return (
    <PaperProvider theme={theme}>
      <View style={{ flex: 1, backgroundColor: theme.colors.elevation.level3 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ header: (props) => <CustomAppbar {...props} />, }}>
            <Stack.Screen name="LandingPage" component={LandingPage} />
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="SignupPage" component={SignupPage} />
            <Stack.Screen name="AppPage" component={AppPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
      <StatusBar style="auto" />
    </PaperProvider>
  );
};

export default App;