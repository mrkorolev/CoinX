import {View, KeyboardAvoidingView, ScrollView, StyleSheet, Platform} from 'react-native';
import { Calculator } from '../../components/home/Calculator';
import { ExchangeRatesData } from '../../components/home/ExchangeRatesData';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {useContext, useState} from "react";
import { AppContext } from "../../global/AppContext";

export const HomeScreen = () => {
    const { theme } = useContext(AppContext);

    return (
            <KeyboardAvoidingView behavior='position'>
                <View style={[styles.innerContainer , { backgroundColor: theme.screenBgColor} ]}>
                        <ExchangeRatesData />
                        <Calculator />
                </View>
            </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        height: hp('90%'),
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: hp('4%')
    }
});
