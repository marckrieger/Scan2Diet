import React, { useState } from 'react';
import { useColorScheme, Image, View, StyleSheet } from 'react-native';
import { Icon, BottomNavigation, useTheme, Text, TextInput, Button, Dialog } from 'react-native-paper';
import OverviewPage from './OverviewPage';
import ScanPage from './ScanPage';
import HistoryPage from './HistoryPage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

const Tab = createMaterialBottomTabNavigator();

const AppPage = ({ navigation }) => {

    const theme = useTheme();

    // get default page from user settings
    const defaultPage = 'overview';

    const colorScheme = useColorScheme();
    const logoSource =
        colorScheme === 'dark'
            ? 'https://api.scan2diet.com/static/img/logo_dark.png'
            : 'https://api.scan2diet.com/static/img/logo_light.png';

    return (
        <Tab.Navigator initialRouteName={defaultPage}>
            <Tab.Screen
                name="overview"
                component={OverviewPage}
                title="Overview"
                options={{
                    tabBarLabel: 'Overview',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={23} />
                    ),
                }}
            />
            <Tab.Screen
                name="scan"
                navigation={navigation}
                component={ScanPage}
                title="Scan"
                options={{
                    tabBarLabel: 'Scan',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="barcode-scan" color={color} size={23} />
                    ),
                }}
            />
            <Tab.Screen
                name="history"
                component={HistoryPage}
                title="History"
                options={{
                    tabBarLabel: 'History',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="history" color={color} size={23} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default AppPage;