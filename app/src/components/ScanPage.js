import React, { useState } from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { useTheme, Text, SegmentedButtons, Button, IconButton, TouchableRipple } from 'react-native-paper';
import { Camera, CameraType } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import Header from './Header';

const ScanPage = ({ navigation }) => {

    const isFocused = useIsFocused();

    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    const defaultScanMode = 'receipt';
    const [value, setValue] = React.useState(defaultScanMode);

    function takePicture() {
        console.log('takePicture');
    }

    const theme = useTheme();

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={{ flex: 1 }}>
                <Header title='Scan' />
                <View style={{ flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center', }}>
                    <Text variant='bodyLarge'>We need permission to access your camera.</Text>
                    <Button style={{ marginTop: 20, }} mode='contained' onPress={requestPermission}>Grant Permission</Button>
                </View>
            </View>
        );
    }

    const headerTitle = 'Scan your ' + value;

    return (
        <View style={{ flex: 1 }}>
            <Header title={headerTitle} />
            <View style={styles.container}>
                {isFocused && (
                    <View style={{ borderRadius: 20, overflow: 'hidden', }}>
                        <Camera zoom={0.25} style={[styles.camera,]} type={type}>
                        </Camera>
                    </View>

                )}
                <View style={{ gap: 20, }}>
                    <SegmentedButtons
                        value={value}
                        onValueChange={setValue}
                        buttons={[
                            {
                                value: 'receipt',
                                label: 'Receipt ᴮᴱᵀᴬ',
                            },
                            {
                                value: 'product',
                                label: 'Product',
                            },
                            {
                                value: 'dish',
                                label: 'Dish ᴮᴱᵀᴬ',
                            }
                        ]}
                    />
                    <View style={{ alignSelf: 'center', backgroundColor: 'transparent', borderColor: theme.colors.secondary, borderWidth: 5, width: 85, height: 85, borderRadius: 100, padding: 6, }}>
                        <TouchableHighlight activeOpacity={0.9} underlayColor='transparent' onPress={takePicture} style={{ backgroundColor: theme.colors.secondary, flex: 1, borderRadius: 100, overflow: 'hidden', }}>
                            <View></View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        gap: 15,
        padding: 20,
        alignItems: 'start',
    },
    camera: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        aspectRatio: 3 / 4,
    },
    button: {
        marginBottom: 50,
    },
})

export default ScanPage;