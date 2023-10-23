import React, {useContext, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions, Text, TextInput, Keyboard, Alert} from 'react-native';
import {faRightLeft, faTurkishLiraSign} from '@fortawesome/free-solid-svg-icons';
import {Line} from "./Line";
import {CustomIcon} from "../general/CustomIcon";
import {baseCurrencies, cryptoCurrencies} from "../../constants/index";
import { endpointPriceData } from "../../services/binanceApiCalls";
import { i18n } from "../../localization/i18n";
import {TransactionCurrencyPicker} from "../general/TransactionCurrencyPicker";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {AppContext} from "../../global/AppContext";

export const Calculator = () => {

    const { theme } = useContext(AppContext);
    const screen = 'screens.home';

    // State for the chosen currency and amount, ready to send the request and setReceiveCurrency as a result (editable={false})
    const [spendAmount, setSpendAmount] = useState('');
    const [spendCurrency, setSpendCurrency] = useState(baseCurrencies[0]);
    const [receiveAmount, setReceiveAmount] = useState('---');
    const [receiveCurrency, setReceiveCurrency] = useState(cryptoCurrencies[0]);


    return (
        <View style={styles.container}>
            <View style={styles.pickerLayout}>
                <View style={[styles.operationContainer, { borderColor: theme.calcAmountBorderColor }]}>
                    <TextInput style={[styles.operationAmount, { color: theme.primaryContentColor }]}
                               maxLength={10}
                               keyboardType='number-pad'
                               enterKeyHint='done'
                               onChangeText={(text) => {
                                   let inputValue = text;
                                   inputValue = inputValue.replace(/[,\.]/g, '');
                                   inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                   setSpendAmount(inputValue)
                               }}
                               value={spendAmount}
                               placeholder='...'
                               placeholderTextColor={theme.secondaryContentColor}
                               selectTextOnFocus
                    />
                </View>


                <TransactionCurrencyPicker
                    currencyName={spendCurrency.nameShort}
                    currencyIcon={spendCurrency.icon}
                    customWidth={wp('26%')}
                    hasBorder
                    // onPressHandler={() => {
                    //     setSpendCurrency(baseCurrencies[(baseCurrencies.indexOf(spendCurrency) + 1) % baseCurrencies.length]);
                    //     setReceiveAmount('---');
                    // }}
                />
            </View>

            <View style={styles.separator}>
                <Line backgroundColor={theme.sepLineColor} />
                <TouchableOpacity
                    onPress={async () => {
                        if(!spendAmount){
                            Alert.alert(i18n.t(`${screen}.error_title`),i18n.t(`${screen}.error_message`));
                        }else{
                            const response = await endpointPriceData(spendCurrency.nameShort, receiveCurrency.nameShort);
                            const required = parseFloat(response).toFixed(4);
                            const toSpend = parseFloat(spendAmount.replaceAll(',', ''));
                            setReceiveAmount(`${(toSpend / required).toFixed(4)}`);
                        }
                    }}>
                    <View style={[styles.separatorIcon, { backgroundColor: theme.primaryContentColor }]}>
                        <CustomIcon
                            icon={faRightLeft}
                            iconSize={wp('5%')}
                            boxSize={wp('10%')}
                            color={theme.screenBgColor}
                            bgColor={theme.primaryContentColor} />
                    </View>
                </TouchableOpacity>
                <Line backgroundColor={theme.sepLineColor} />
            </View>

            <View style={styles.pickerLayout}>
                <View style={[styles.operationContainer, { borderColor: theme.calcAmountBorderColor}]}>
                    <TextInput style={[styles.operationAmount, { color: theme.primaryContentColor }]}
                               maxLength={10}
                               keyboardType='decimal-pad'
                               keyboardKeyType='done'
                               editable={false}
                               value={receiveAmount} />
                </View>


                <TransactionCurrencyPicker
                    customWidth={wp('26%')}
                    currencyName={receiveCurrency.nameShort}
                    currencyIcon={receiveCurrency.icon}
                    hasBorder
                    onPressHandler={() => {
                        setReceiveCurrency(cryptoCurrencies[(cryptoCurrencies.indexOf(receiveCurrency) + 1) % cryptoCurrencies.length]);
                        setReceiveAmount('---');
                    }}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: hp('2%')
    },
    separator: {
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('10%')
    },
    separatorIcon: {
        borderRadius: 5,
        width: wp('5%'),
        height: wp('5%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickerLayout: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    operationContainer: {
        justifyContent: 'center',
        paddingHorizontal: wp('2%'),
        marginTop: hp('0.8%'),
        height: hp('6%'),
        width: wp('26%'),
        borderWidth: 1,
        borderRadius: 5
    },
    operationAmount: {
        fontSize: wp('3%'),
        fontWeight: 'bold',
        textAlign: 'center'
    },
    operationAmountText: {
        fontSize: wp('3%'),
        borderLeftWidth: 2,
        borderRightWidth: 2,
        paddingHorizontal: wp('0.25%')
    }
});
