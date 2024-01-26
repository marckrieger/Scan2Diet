import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useTheme, Text, Appbar, IconButton, Dialog } from 'react-native-paper';
import PieChart from 'react-native-pie-chart'
import axios from 'axios';
import Swiper from 'react-native-swiper';
import Header from './Header';

const OverviewPage = ({ navigation }) => {

    const theme = useTheme();

    // Server returns macronutrients in grams
    const macronutrients = { 'unsaturated-fat': 19.0, 'saturated-fat': 2.0, 'complex-carbohydrates': 45.0, 'simple-carbohydrates': 12.0, 'protein': 85.0 };

    // Server returns micronutrients in milligrams
    const micronutrients = { 'vitamin-a': 900.0, 'vitamin-b': 2.0, 'vitamin-c': 90.0, 'calcium': 1000.0, 'iron': 18.0, 'magnesium': 400.0 };


    // Classification colors
    const macronutrientsColors = {
        'unsaturated-fat': 'rgba(225, 123, 93, 0.9)',
        'saturated-fat': 'rgba(225, 123, 93, 0.7)',
        'complex-carbohydrates': 'rgba(225, 211, 93, 0.9)',
        'simple-carbohydrates': 'rgba(225, 211, 93, 0.7)',
        'protein': 'rgba(93, 140, 225, 0.9)'
    };

    const micronutrientsColors = {
        'vitamin-a': 'rgba(126, 225, 93, 0.9)',
        'vitamin-b': 'rgba(126, 225, 93, 0.7)',
        'vitamin-c': 'rgba(126, 225, 93, 0.6)',
        'calcium': 'rgba(93, 225, 192, 0.9)',
        'iron': 'rgba(93, 225, 192, 0.7)',
        'magnesium': 'rgba(93, 225, 192, 0.6)'
    };

    // PieChart Series
    const macronutrientsSeries = Object.values(macronutrients);
    const micronutrientsSeries = Object.values(micronutrients);
    const widthAndHeight = '250';
    // const series = [100, 50, 321, 100, 123];
    // const sliceColor = Object.values(macronutrientsColors);

    axios.get('https://world.openfoodfacts.org/api/v1/product/3168930010265.json')
        .then((response) => {
            const data = response.data;
            const nutriments = data['product']['nutriments'];
        }, (error) => {
        });

    const NutrientItem = ({ color, name, amount, unit }) => {
        const formattedName = name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: color, marginRight: 5 }} />
                <Text>{formattedName}</Text>
                <Text style={{ marginLeft: 'auto' }}>{amount} {unit}</Text>
            </View>
        );
    };

    const [visibleNI, setVisibleNI] = React.useState(false);
    const hideDialogNI = () => setVisibleNI(false);
    const showDialogNI = () => setVisibleNI(true);

    const [visibleMa, setVisibleMa] = React.useState(false);
    const hideDialogMa = () => setVisibleMa(false);
    const showDialogMa = () => setVisibleMa(true);

    const [visibleMi, setVisibleMi] = React.useState(false);
    const hideDialogMi = () => setVisibleMi(false);
    const showDialogMi = () => setVisibleMi(true);

    return (
        <View style={{ flex: 1, }}>
            <Header title='Overview' />
            <ScrollView style={{ flex: 1, }}>
                <View style={styles.container}>
                    <View style={[styles.item, { backgroundColor: theme.colors.elevation.level1, borderColor: theme.colors.primary }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                            <Text variant='headlineMedium'>Your nutritional intake</Text>
                            <IconButton icon="information" iconColor={theme.colors.primary} size={22} onPress={showDialogNI} />
                        </View>
                        <Swiper
                            style={styles.wrapper}
                            showsButtons={true}
                            loop={false}
                            nextButton={<Text style={{ color: theme.colors.primary, fontSize: 60 }}>›</Text>}
                            prevButton={<Text style={{ color: theme.colors.primary, fontSize: 60 }}>‹</Text>}
                            activeDotColor={theme.colors.primary}
                            dotColor={theme.colors.elevation.level5}
                        >
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                    <Text variant='titleLarge'>Macronutrients</Text>
                                    <IconButton icon="information" iconColor={theme.colors.primary} size={22} onPress={showDialogMa} />
                                </View>
                                <PieChart style={styles.chart}
                                    widthAndHeight={widthAndHeight}
                                    series={macronutrientsSeries}
                                    sliceColor={Object.values(macronutrientsColors)}
                                    coverRadius={0.45}
                                />
                                <View>
                                    {Object.entries(macronutrients).map(([name, amount]) => (
                                        <NutrientItem key={name} color={macronutrientsColors[name]} name={name} amount={amount} unit='g' />
                                    ))}
                                </View>
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                    <Text variant='titleLarge'>Micronutrients</Text>
                                    <IconButton icon="information" iconColor={theme.colors.primary} size={22} onPress={showDialogMi} />
                                </View>
                                <PieChart style={styles.chart}
                                    widthAndHeight={widthAndHeight}
                                    series={micronutrientsSeries}
                                    sliceColor={Object.values(micronutrientsColors)}
                                    coverRadius={0.45}
                                />
                                <View>
                                    {Object.entries(micronutrients).map(([name, amount]) => (
                                        <NutrientItem key={name} color={micronutrientsColors[name]} name={name} amount={amount} unit='mg' />
                                    ))}
                                </View>
                            </View>
                        </Swiper>
                    </View>
                </View >
            </ScrollView>
            <Dialog visible={visibleNI} onDismiss={hideDialogNI}>
                <Dialog.Content style={{ gap: 10 }}>
                    <Text variant="bodyMedium">
                        Your <Text style={{ color: theme.colors.primary }}>nutritional intake</Text> is calculated based on the nutritional information of the products you scan.
                    </Text>
                </Dialog.Content>
            </Dialog>
            <Dialog visible={visibleMa} onDismiss={hideDialogMa}>
                <Dialog.Content style={{ gap: 10 }}>
                    <Text variant='bodyMedium'>
                        <Text style={{ color: theme.colors.primary }}>Macronutrients</Text> are nutrients that provide calories or energy.
                    </Text>
                </Dialog.Content>
            </Dialog>
            <Dialog visible={visibleMi} onDismiss={hideDialogMi}>
                <Dialog.Content style={{ gap: 10 }}>
                    <Text variant='bodyMedium'>
                        <Text style={{ color: theme.colors.primary }}>Micronutrients</Text> are nutrients that our bodies need in smaller amounts.
                    </Text>
                </Dialog.Content>
            </Dialog>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        gap: 20,
        padding: 15,
    },
    wrapper: {
        height: 550,
    },
    chart: {
        alignSelf: 'center',
        margin: 20,
    },
    item: {
        gap: 10,
        padding: 15,
        borderRadius: 20,
        borderWidth: 1,
    },
})

export default OverviewPage;