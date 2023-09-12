import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CoinExchangeRate } from './CoinExchangeRate';
import { coins } from '../../constants/index';

export const ExchangeRatesData = () => {

    const coinComponents = coins.map(coinObject => <CoinExchangeRate
        nameShort={coinObject.nameShort}
        nameLong={coinObject.nameLong}
        currentRate={coinObject.currentRate}
        percentChange={coinObject.percentChange}
        bgColor={coinObject.bgColor} 
        coinIcon={coinObject.icon} />);

    return (
        <View>
            <View style={styles.currencyRow}>
                {coinComponents[0]}
                {coinComponents[1]}
            </View>
            <View style={styles.currencyRow}>
                {coinComponents[2]}
                {coinComponents[3]}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    currencyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});