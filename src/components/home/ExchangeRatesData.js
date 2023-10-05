import React, { useState, useEffect } from 'react';
import {StyleSheet, View} from 'react-native';
import { CoinExchangeRate } from './CoinExchangeRate';
import { cryptoCurrencies } from '../../constants/index';
import { endpoint24hrData } from "../../services/binanceApiCalls";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

function modifyCurrentState(arr1, arr2){
    for(let key in arr1){
        for(let dataKey in arr2){
            let symbol = arr1[key].nameShort
            if(symbol.substring(0, 3) === arr2[dataKey].symbol.substring(0, 3)){
                arr1[key].lastPrice = arr2[dataKey].lastPrice;
                arr1[key].priceChangePercent = arr2[dataKey].priceChangePercent;
                break;
            }
        }
    }
}

const apiCallInterval = 2000;

export const ExchangeRatesData = () => {

    const [apiData, setApiData] = useState(cryptoCurrencies);
    const [coinComponents, setCoinComponents] = useState(generateExchangeRates(apiData));

    function generateExchangeRates(data){
        return data.map(coinObject => <CoinExchangeRate
            key={coinObject.nameShort}
            nameShort={coinObject.nameShort}
            nameLong={coinObject.nameLong}
            lastPrice={coinObject.lastPrice === '---' ?
                coinObject.lastPrice :
                `${parseFloat(coinObject.lastPrice).toFixed(2)}`}
            priceChangePercent={coinObject.priceChangePercent === '---' ?
                coinObject.priceChangePercent :
                `${parseFloat(coinObject.priceChangePercent) >= 0 ? '+' : ''}${parseFloat(coinObject.priceChangePercent).toFixed(2)}`}
            bgColor={coinObject.bgColor}
            coinIcon={coinObject.icon} />);
    }

    // Modification of the observed object and it's conversion to Exchange Rates
    useEffect(() => {
        console.log("Rerender initiated...");
        const interval = setInterval(async () => {
            const jsonResponse = await endpoint24hrData(cryptoCurrencies);
            modifyCurrentState(cryptoCurrencies, jsonResponse);
            setApiData(cryptoCurrencies);
            setCoinComponents(generateExchangeRates(apiData));
        }, apiCallInterval);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <View>
            <View style={styles.rowContainer}>
                {coinComponents[0]}
                {coinComponents[1]}
            </View>
            <View style={styles.rowContainer}>
                {coinComponents[2]}
                {coinComponents[3]}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1
    },
    rowContainer: {
        flexDirection: 'row'
    }
});
