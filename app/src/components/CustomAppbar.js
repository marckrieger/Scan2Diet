import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { useTheme } from 'react-native-paper';

export default function CustomAppbar({ route, options, back, navigation }) {

    const title = getHeaderTitle(options, route.name);
    const theme = useTheme();

    return (
        <Appbar.Header style={{ position: 'absolute', top: 80, height:0, backgroundColor: theme.colors.elevation.level3 }}>
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
        </Appbar.Header>
    );
}