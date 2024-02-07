import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useTheme, Text, Appbar, IconButton, Dialog, Icon } from 'react-native-paper';
import PieChart from 'react-native-pie-chart'
import axios from 'axios';
import Swiper from 'react-native-swiper';
import Header from './Header';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const OverviewPage = ({ navigation }) => {

    const theme = useTheme();

    const [macronutrients, setMacronutrients] = useState({});
    const [vitamins, setVitamins] = useState({});
    const [minerals, setMinerals] = useState({});
    const [macronutrientsSeries, setMacronutrientsSeries] = useState([1, 1, 1, 1, 1]);
    const [vitaminsSeries, setVitaminsSeries] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    const [mineralsSeries, setMineralsSeries] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);

    const getItems = async () => {
        const token = await SecureStore.getItemAsync('token');
        await axios.get('http://192.168.178.21:8000/api/get_nutritional_overview/', {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                const macronutrients = response.data['macronutrients'];
                setMacronutrients(macronutrients);
                if (Object.values(macronutrients).reduce((a, b) => a + b, 0) > 0) {
                    setMacronutrientsSeries(Object.values(macronutrients));
                }

                const vitamins = response.data['vitamins'];
                setVitamins(vitamins);
                if (Object.values(vitamins).reduce((a, b) => a + b, 0) > 0) {
                    setVitaminsSeries(Object.values(vitamins));
                }

                const minerals = response.data['minerals'];
                setMinerals(minerals);
                if (Object.values(minerals).reduce((a, b) => a + b, 0) > 0) {
                    setMineralsSeries(Object.values(minerals));
                }
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



    const NutrientItem = ({ color, name, amount, unit }) => {
        const formattedName = name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: color, marginRight: 5 }} />
                <Text>{formattedName}</Text>
                <Text style={{ marginLeft: 'auto' }}>{amount} {unit}</Text>
            </View>
        );
    };

    // PieChart Series
    const widthAndHeight = '250';

    // {'macronutrients': {'unsaturated_fat': 129, 'saturated_fat': 36, 'complex_carbohydrates': 146, 'simple_carbohydrates': 36, 'protein': 58}, 'minerals': {'sodium': 3, 'chloride': 0, 'potassium': 0, 'calcium': 0, 'phosphorus': 0, 'magnesium': 0, 'sulfur': 0, 'iron': 0, 'zinc': 0, 'iodine': 0, 'selenium': 0, 'copper': 0, 'manganese': 0, 'fluoride': 0, 'chromium': 0, 'molybdenum': 0}, 'vitamins': {'vitamin_a': 0, 'vitamin_d': 0, 'vitamin_e': 0, 'vitamin_k': 0, 'vitamin_c': 0, 'vitamin_b1': 0, 'vitamin_b2': 0, 'vitamin_b3': 0, 'vitamin_b5': 0, 'vitamin_b6': 0, 'vitamin_b7': 0, 'vitamin_b9': 0, 'vitamin_b12': 0}}

    // Classification colors
    // const macronutrientsColors = {
    //     'unsaturated_fat': 'rgba(225, 123, 93, 0.9)',
    //     'saturated_fat': 'rgba(225, 123, 93, 0.7)',
    //     'complex_carbohydrates': 'rgba(225, 211, 93, 0.9)',
    //     'simple_carbohydrates': 'rgba(225, 211, 93, 0.7)',
    //     'protein': 'rgba(93, 140, 225, 0.9)'
    // };

    const macronutrientsColors = {
        'unsaturated_fat': 'rgb(204, 76, 76)',
        'saturated_fat': 'rgb(204, 143, 76)',
        'complex_carbohydrates': 'rgb(204, 186, 76)',
        'simple_carbohydrates': 'rgb(143, 204, 76)',
        'protein': 'rgb(76, 204, 186)',
    };

    const vitaminsColors = {
        'vitamin_a': 'rgb(204, 76, 76)',
        'vitamin_d': 'rgb(204, 143, 76)',
        'vitamin_e': 'rgb(204, 186, 76)',
        'vitamin_k': 'rgb(143, 204, 76)',
        'vitamin_c': 'rgb(76, 204, 186)',
        'vitamin_b1': 'rgb(76, 122, 204)',
        'vitamin_b2': 'rgb(143, 76, 204)',
        'vitamin_b3': 'rgb(204, 76, 143)',
        'vitamin_b5': 'rgb(204, 76, 166)',
        'vitamin_b6': 'rgb(204, 135, 115)',
        'vitamin_b7': 'rgb(204, 180, 51)',
        'vitamin_b9': 'rgb(153, 204, 51)',
        'vitamin_b12': 'rgb(0, 102, 102)',
    };

    const mineralsColors = {
        'sodium': 'rgb(204, 76, 76)',
        'chloride': 'rgb(204, 143, 76)',
        'potassium': 'rgb(204, 186, 76)',
        'calcium': 'rgb(143, 204, 76)',
        'phosphorus': 'rgb(76, 204, 186)',
        'magnesium': 'rgb(76, 122, 204)',
        'sulfur': 'rgb(143, 76, 204)',
        'iron': 'rgb(204, 76, 143)',
        'zinc': 'rgb(204, 120, 166)',
        'iodine': 'rgb(204, 135, 115)',
        'selenium': 'rgb(204, 180, 51)',
        'copper': 'rgb(153, 204, 51)',
        'manganese': 'rgb(0, 102, 102)',
        'fluoride': 'rgb(86, 150, 173)',
        'chromium': 'rgb(153, 153, 168)',
        'molybdenum': 'rgb(204, 173, 143)',
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

    const [visibleEF, setVisibleEF] = React.useState(false);
    const hideDialogEF = () => setVisibleEF(false);
    const showDialogEF = () => setVisibleEF(true);

    const [visibleNS, setVisibleNS] = React.useState(false);
    const hideDialogNS = () => setVisibleNS(false);
    const showDialogNS = () => setVisibleNS(true);

    return (
        <View style={{ flex: 1, }}>
            <Header title='Overview' navigation={navigation} />
            <ScrollView style={{ flex: 1, }}>
                <View style={styles.container}>
                    <View style={[styles.item, styles.wrapper, { backgroundColor: theme.colors.elevation.level1, borderColor: theme.colors.primary }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                            <Text variant='headlineMedium'>Your nutritional intake</Text>
                            <IconButton icon="information" iconColor={theme.colors.primary} size={22} onPress={showDialogNI} />
                        </View>
                        <Swiper
                            showsButtons={true}
                            loop={false}
                            nextButton={<Text style={{ color: theme.colors.primary, fontSize: 60, transform: [{ translateY: -220 }] }}>›</Text>}
                            prevButton={<Text style={{ color: theme.colors.primary, fontSize: 60, transform: [{ translateY: -220 }] }}>‹</Text>}
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
                                    <Text variant='titleLarge'>Vitamins</Text>
                                    <IconButton icon="information" iconColor={theme.colors.primary} size={22} onPress={showDialogMa} />
                                </View>
                                <PieChart style={styles.chart}
                                    widthAndHeight={widthAndHeight}
                                    series={vitaminsSeries}
                                    sliceColor={Object.values(vitaminsColors)}
                                    coverRadius={0.45}
                                />
                                <View>
                                    {Object.entries(vitamins).map(([name, amount]) => (
                                        <NutrientItem key={name} color={vitaminsColors[name]} name={name} amount={amount} unit='mg' />
                                    ))}
                                </View>
                            </View>

                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                    <Text variant='titleLarge'>Minerals</Text>
                                    <IconButton icon="information" iconColor={theme.colors.primary} size={22} onPress={showDialogMa} />
                                </View>
                                <PieChart style={styles.chart}
                                    widthAndHeight={widthAndHeight}
                                    series={mineralsSeries}
                                    sliceColor={Object.values(mineralsColors)}
                                    coverRadius={0.45}
                                />
                                <View>
                                    {Object.entries(minerals).map(([name, amount]) => (
                                        <NutrientItem key={name} color={mineralsColors[name]} name={name} amount={amount} unit='mg' />
                                    ))}
                                </View>
                            </View>
                        </Swiper>
                    </View>
                    <View style={[styles.item, { backgroundColor: theme.colors.elevation.level1, borderColor: theme.colors.primary }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                            <Text variant='headlineMedium'>Environmental impact</Text>
                            <IconButton icon="information" iconColor={theme.colors.primary} size={22} onPress={showDialogEF} />
                        </View>
                        <Text variant='bodyMedium'>Coming soon.</Text>
                    </View>
                    <View style={[styles.item, { backgroundColor: theme.colors.elevation.level1, borderColor: theme.colors.primary }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                            <Text variant='headlineMedium'>Nova score</Text>
                            <IconButton icon="information" iconColor={theme.colors.primary} size={22} onPress={showDialogNS} />
                        </View>
                        <Text variant='bodyMedium'>Coming soon.</Text>
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
            <Dialog visible={visibleEF} onDismiss={hideDialogEF}>
                <Dialog.Content style={{ gap: 10 }}>
                    <Text variant='bodyMedium'>
                        <Text style={{ color: theme.colors.primary }}>Environmental footprint</Text> measures the environmental impact of the food you consume.
                    </Text>
                </Dialog.Content>
            </Dialog>
            <Dialog visible={visibleNS} onDismiss={hideDialogNS}>
                <Dialog.Content style={{ gap: 10 }}>
                    <Text variant='bodyMedium'>
                        The <Text style={{ color: theme.colors.primary }}>Nova score</Text> measures the level of processing of the food you consume.
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
        height: 910,
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