import React, {useContext} from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { i18n } from "../../../config/localization/i18n";

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {AppContext} from "../../../config/context/AppContext";

export const ExchangeRate = ({ style, from, to, rate }) => {

    return (
        <View style={styles.rateContainer}>
            <Text style={style}>{i18n.t('screens.transaction.exchange_rate')}</Text>
            <Text style={style}>1 {to} = {rate} {from}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    rateContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
});
