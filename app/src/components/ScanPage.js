import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableHighlight, Animated } from 'react-native';
import { useTheme, Text, SegmentedButtons, Button, IconButton, TouchableRipple, Snackbar, ActivityIndicator } from 'react-native-paper';
import { Camera, CameraType } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import Header from './Header';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const ScanPage = ({ navigation }) => {

    const theme = useTheme();

    const isFocused = useIsFocused();

    const [permission, requestPermission] = Camera.useCameraPermissions();

    const defaultScanMode = 'receipt';
    const [value, setValue] = React.useState(defaultScanMode);

    const [shutterColor, setShutterColor] = React.useState(theme.colors.secondary);
    const [disabled, setDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState('transparent');

    const cameraRef = useRef(null);

    const [visible, setVisible] = React.useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    const [visibleProcessing, setVisibleProcessing] = React.useState(false);
    const onToggleProcessing = () => setVisibleProcessing(!visibleProcessing);
    const onDismissProcessing = () => setVisibleProcessing(false);

    const takePicture = async () => {
        setShutterColor('transparent');
        setDisabled(true);
        setLoading(theme.colors.secondary);
        onToggleProcessing();

        const token = await SecureStore.getItemAsync('token');
        if (cameraRef.current) {
            const options = { quality: 0.8 };
            const data = await cameraRef.current.takePictureAsync(options);

            let formData = new FormData();
            formData.append('image', {
                name: 'photo.jpg',
                type: 'image/jpeg',
                uri: data.uri,
            });
            formData.append('scan_mode', value);

            try {
                const response = await axios.post('https://api.scan2diet.com/upload/', formData, {
                    headers: {
                        Authorization: `Token ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });

                onDismissProcessing();
                onToggleSnackBar();
                setShutterColor(theme.colors.secondary);
                setDisabled(false);
                setLoading('transparent')
            } catch (error) {
                console.error('Error uploading file:', error);
                // Handle failure, e.g., show an error message to the user
            }
        }
    };

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
            <Header title={headerTitle} navigation={navigation} />
            <View style={styles.container}>
                {isFocused && (
                    <View style={{ borderRadius: 20, overflow: 'hidden', }}>
                        <Camera ref={cameraRef} zoom={0.25} style={[styles.camera,]}>
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
                                label: 'Receipt ᴬᴸᴾᴴᴬ',
                            },
                            {
                                value: 'product',
                                label: 'Product',
                            },
                            {
                                value: 'dish',
                                label: 'Dish ᴬᴸᴾᴴᴬ',
                            }
                        ]}
                    />
                    <View style={{ alignSelf: 'center', backgroundColor: 'transparent', borderColor: theme.colors.secondary, borderWidth: 5, width: 85, height: 85, borderRadius: 100, padding: 6, }}>
                        <TouchableHighlight activeOpacity={0.9} underlayColor='transparent' disabled={disabled} onPress={takePicture} style={{ backgroundColor: shutterColor, flex: 1, borderRadius: 100, overflow: 'hidden', }}>
                            <ActivityIndicator animating={true} color={loading} size={63} />
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'View',
                    onPress: () => {
                        navigation.navigate('history');
                    },
                }}
            >
                <Text style={{ color: theme.colors.background }}>
                    Upload successful!
                </Text>
            </Snackbar>
            <Snackbar
                visible={visibleProcessing}
                onDismiss={onDismissProcessing}
            >
                <Text style={{ color: theme.colors.background }}>
                    Processing receipt...
                </Text>
            </Snackbar>
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