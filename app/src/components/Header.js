import { Avatar } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

export default function Header({ title, navigation }) {

    const theme = useTheme();

    async function logout() {
        const token = SecureStore.getItem('token');
        axios.post('http://192.168.178.21:8000/api/user_logout/', {}, {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
            .then((response) => {
                SecureStore.deleteItemAsync('token');
                navigation.reset({ index: 0, routes: [{ name: 'LandingPage' }], });
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const userInitials = 'MK';
    return (
        <View style={[styles.header, { backgroundColor: theme.colors.elevation.level3 }]}>
            <Text variant='headlineSmall'>{title}</Text>
            <TouchableOpacity activeOpacity={0.5} onPress={logout}>
                <Avatar.Text size={40} label={userInitials} />
            </TouchableOpacity>
        </View>
    );
}

// () => navigation.navigate('settings')

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    }
})