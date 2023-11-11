import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { CoinExchangeRate } from './CoinExchangeRate';
import { cryptoCurrencies } from '../../config/constants/operations';
import { endpoint24hrData } from "../../services/binance";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AppContext } from "../../config/context/AppContext";
import { CustomIcon } from "../general/components/CustomIcon";
import { Tron } from "../general/icons/Tron";
import {useIsFocused} from "@react-navigation/native";
import {Tether} from "../general/icons/Tether";

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

    const { theme } = useContext(AppContext);
    const [apiData, setApiData] = useState(cryptoCurrencies);
    const [coinComponents, setCoinComponents] = useState(generateExchangeRates(apiData));

    function generateExchangeRates(data){
        return data.map(coinObject => ({
            key: coinObject.nameShort,
            nameShort: coinObject.nameShort,
            nameLong: coinObject.nameLong,
            lastPrice:
                coinObject.lastPrice === '---' ?
                    coinObject.lastPrice :
                    `${parseFloat(coinObject.lastPrice).toFixed((coinObject.nameShort === 'ETH') || (coinObject.nameShort === 'BTC') ? 0 : 3)} TL`,
            priceChangePercent:
                coinObject.priceChangePercent === '---' ?
                    coinObject.priceChangePercent :
                    `${parseFloat(coinObject.priceChangePercent) >= 0 ? '+' : ''}${parseFloat(coinObject.priceChangePercent).toFixed(2)}%`,
            coinIcon: coinObject.icon
        }));
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

                <CoinExchangeRate
                    nameShort={coinComponents[0].nameShort}
                    nameLong={coinComponents[0].nameLong}
                    lastPrice={coinComponents[0].lastPrice}
                    priceChangePercent={coinComponents[0].priceChangePercent}
                    coinIcon={
                        <CustomIcon
                            icon={coinComponents[0].coinIcon}
                            iconSize={wp('4%')}
                            boxSize={wp('7%')}
                            color={theme.exchangeIconColor}
                            bgColor={theme.exchangeIconBgColor}
                        />
                    }
                    bgColor={theme.ethBgColor}
                    primaryColor={theme.exPrimaryColor}
                    secondaryColor={theme.exSecondaryColor}
                />

                <CoinExchangeRate
                    nameShort={coinComponents[1].nameShort}
                    nameLong={coinComponents[1].nameLong}
                    lastPrice={coinComponents[1].lastPrice}
                    priceChangePercent={coinComponents[1].priceChangePercent}
                    coinIcon={
                        <CustomIcon
                        icon={coinComponents[1].coinIcon}
                        iconSize={wp('4%')}
                        boxSize={wp('7%')}
                        color={theme.exchangeIconColor}
                        bgColor={theme.exchangeIconBgColor}
                        />
                    }
                    bgColor={theme.btcBgColor}
                    primaryColor={theme.btcPrimaryColor}
                    secondaryColor={theme.btcSecondaryColor}
                />

            </View>
            <View style={styles.rowContainer}>

                <CoinExchangeRate
                    nameShort={coinComponents[2].nameShort}
                    nameLong={coinComponents[2].nameLong}
                    lastPrice={coinComponents[2].lastPrice}
                    priceChangePercent={coinComponents[2].priceChangePercent}
                    coinIcon={
                        <Tron
                            color={theme.exchangeIconColor}
                            bgColor={theme.exchangeIconBgColor}
                            size={wp('4%')}/>
                    }
                    bgColor={theme.trxBgColor}
                    primaryColor={theme.exPrimaryColor}
                    secondaryColor={theme.exSecondaryColor}
                />

                <CoinExchangeRate
                    nameShort={coinComponents[3].nameShort}
                    nameLong={coinComponents[3].nameLong}
                    lastPrice={coinComponents[3].lastPrice}
                    priceChangePercent={coinComponents[3].priceChangePercent}
                    coinIcon={
                    <Tether
                        color={theme.exchangeIconColor}
                        bgColor={theme.exchangeIconBgColor}
                        size={wp('4.5%')} />
                        // <CustomIcon
                        // icon={coinComponents[3].coinIcon}
                        // iconSize={wp('4%')}
                        // boxSize={wp('7%')}
                        // color={theme.exchangeIconColor}
                        // bgColor={theme.exchangeIconBgColor}
                        // />
                    }
                    bgColor={theme.usdBgColor}
                    primaryColor={theme.exPrimaryColor}
                    secondaryColor={theme.exSecondaryColor}
                />
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
