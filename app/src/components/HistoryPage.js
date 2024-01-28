import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import Header from './Header';

const HistoryPage = ({ navigation }) => {

    const theme = useTheme();

    return (
        <View style={{ flex: 1, }}>
            <Header title='Your scans' navigation={navigation} />
            <ScrollView style={styles.container}>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 20,
        padding: 20,
    },
})

export default HistoryPage;