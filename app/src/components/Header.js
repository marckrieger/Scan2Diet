import { Avatar } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

export default function Header({ title, navigation }) {

    const theme = useTheme();

    return (
        <View style={[styles.header, {backgroundColor: theme.colors.elevation.level3}]}>
            <Text variant='headlineSmall'>{title}</Text>
            <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('settings')}>
                <Avatar.Text size={40} label="MK" />
            </TouchableOpacity>
        </View>
    );
}

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