import { View, SafeAreaView, StyleSheet } from 'react-native';
import { Calculator } from '../../components/home/Calculator';
import { ExchangeRatesData } from '../../components/home/ExchangeRatesData';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useContext } from "react";
import { AppContext } from "../../global/AppContext";

export const HomeScreen = () => {
    const { theme } = useContext(AppContext);

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: theme.screenBgColor }]}>
            <ExchangeRatesData />
            <Calculator />
            <View style={{ flex: 0.2 }} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: hp('5%')
    }
});
