import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme, Text, IconButton, Icon } from 'react-native-paper';
import Header from './Header';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const HistoryPage = ({ navigation }) => {

    const theme = useTheme();

    const [items, setItems] = useState([]);

    function getItems() {
        const token = SecureStore.getItem('token');
        axios.get('https://api.scan2diet.com/get_items?attributes=scan_name,match_name,match_certainty', {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function deleteItem(id) {
        const token = SecureStore.getItem('token');
        axios.post('https://api.scan2diet.com/delete_item/',
            {
                id: id,
            },
            {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(() => {
                getItems();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useFocusEffect(
        React.useCallback(() => {
            getItems();
            return () => { }; // This is the cleanup function, it's optional and can be omitted if you don't need to do any cleanup.
        }, [])
    );

    return (
        <View style={{ flex: 1, }}>
            <Header title='Your scans' navigation={navigation} />
            <ScrollView style={styles.container}>
                {items.length > 0 ? items.reverse().map((item, index) => (
                    <View style={[styles.scan_item, { borderColor: theme.colors.primary, borderWidth: 1, backgroundColor: theme.colors.elevation.level1 }]} key={index}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <Text style={{ fontSize: 18, fontFamily: 'Outfit-Bold', }}>{item['scan_name'].charAt(0).toUpperCase() + item['scan_name'].slice(1)}</Text>
                            <View style={{ flexDirection: 'row', margin: -5, marginBottom: 10, gap: 10, }}>
                                {/* <IconButton mode='contained-tonal' icon='pencil' size={20} onPress={() => { }} style={{padding:0, margin:0}} /> */}
                                <IconButton mode='contained-tonal' icon='delete' size={20} onPress={() => { deleteItem(item['item_id']) }} style={{ padding: 0, margin: 0 }} />
                            </View>
                        </View>
                        {/* <Text style={[styles.attribute_name, {color: theme.colors.primary}]}>Scan name: </Text> */}
                        <Text><Text style={[styles.attribute_name, { color: theme.colors.primary }]}>Match name: </Text>{item['match_name']}</Text>
                        <Text><Text style={[styles.attribute_name, { color: theme.colors.primary }]}>Match certainty: </Text>{item['match_certainty'].toFixed(2)}%</Text>
                    </View>
                )) : <Text variant='bodyLarge'>No scans yet.</Text>}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    scan_item: {
        marginBottom: 15,
        borderRadius: 20,
        padding: 15,
    },
})

export default HistoryPage;