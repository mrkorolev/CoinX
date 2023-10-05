import React, { useState } from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions, Text, TextInput, Keyboard, Alert} from 'react-native';
import {faRightLeft, faTurkishLiraSign} from '@fortawesome/free-solid-svg-icons';
import {Line} from "./Line";
import {CustomIcon} from "../general/CustomIcon";
import {baseCurrencies, cryptoCurrencies} from "../../constants/index";
import { endpointPriceData } from "../../services/binanceApiCalls";
import { i18n } from "../../localization/i18n";
import {TransactionCurrencyPicker} from "../general/TransactionCurrencyPicker";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const Calculator = () => {

    // State for the chosen currency and amount, ready to send the request and setReceiveCurrency as a result (editable={false})
    const [spendAmount, setSpendAmount] = useState('');
    const [spendCurrency, setSpendCurrency] = useState(baseCurrencies[0]);
    const [receiveAmount, setReceiveAmount] = useState('---');
    const [receiveCurrency, setReceiveCurrency] = useState(cryptoCurrencies[0]);
    const screen = 'screens.home';

    return (
        <View style={styles.container}>
            <View style={styles.pickerLayout}>
                <View style={styles.operationContainer}>
                    <TextInput style={styles.operationAmount}
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
                               selectTextOnFocus
                    />
                </View>

                <TransactionCurrencyPicker
                    currencyName={spendCurrency.nameShort}
                    currencyIcon={spendCurrency.icon}
                    // onPressHandler={() => {
                    //     setSpendCurrency(baseCurrencies[(baseCurrencies.indexOf(spendCurrency) + 1) % baseCurrencies.length]);
                    //     setReceiveAmount('---');
                    // }}
                />

            </View>

            <View style={styles.separator}>
                <Line backgroundColor='lightgray' />
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
                    <View style={styles.separatorIcon}>
                        <CustomIcon icon={faRightLeft} iconSize={wp('5%')} boxSize={wp('10%')} />
                    </View>
                </TouchableOpacity>
                <Line backgroundColor='lightgray' />
            </View>

            <View style={styles.pickerLayout}>
                <View style={styles.operationContainer}>
                    <TextInput style={styles.operationAmount}
                               maxLength={10}
                               keyboardType='decimal-pad'
                               keyboardKeyType='done'
                               editable={false}
                               value={receiveAmount} />
                </View>

                <TransactionCurrencyPicker
                    currencyName={receiveCurrency.nameShort}
                    currencyIcon={receiveCurrency.icon}
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
        gap: hp('2%'),
    },
    separator: {
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('13%')
    },
    separatorIcon: {
        backgroundColor: '#293462',
        borderRadius: 5,
        width: wp('5%'),
        height: wp('5%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickerLayout: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    operationContainer: {
        justifyContent: 'center',
        paddingHorizontal: '2%',
        height: hp('7%'),
        width: wp('25%'),
        borderWidth: 1,
        borderRadius: 5
    },
    operationAmount: {
        fontSize: wp('3%'),
        color: '#293462',
        fontWeight: 'bold'
    }
});
