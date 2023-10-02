import React, { useState } from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions, Text, TextInput, Keyboard, Alert} from 'react-native';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';
import {Line} from "./Line";
import {CustomIcon} from "../general/CustomIcon";
import {baseCurrencies, cryptoCurrencies} from "../../constants/index";
import {CustomDropdown} from "../general/CustomDropdown";
import { endpointPriceData } from "../../services/binanceApiCalls";
import {i18n} from "../../localization/i18n";

export const Calculator = () => {

    // State for the chosen currency and amount, ready to send the request and setReceiveCurrency as a result (editable={false})
    const [spendAmount, setSpendAmount] = useState('');
    const [spendCurrency, setSpendCurrency] = useState(baseCurrencies[0]);
    const [receiveAmount, setReceiveAmount] = useState('');
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

                <CustomDropdown
                    borderWidth={1}
                    data={baseCurrencies}
                    value={spendCurrency}
                    onChangeHandler={item => {
                        setSpendCurrency(item);
                    }}/>

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
                        <CustomIcon icon={faRightLeft}/>
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

                <CustomDropdown
                    borderWidth={1}
                    data={cryptoCurrencies}
                    value={receiveCurrency}
                    onChangeHandler={ item => {
                        setReceiveCurrency(item);
                        // setIsFocus(false);
                    }}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginBottom: 30
    },
    separator: {
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 40
    },
    separatorIcon: {
        backgroundColor: '#293462',
        borderRadius: 5,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickerLayout: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // borderWidth: 1,
        columnGap: 50
    },
    operationContainer: {
        width: '25%',
        borderWidth: 1,
        paddingHorizontal: '2%',
        // borderRadius: 10
    },
    operation: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'gray'
    },
    operationAmount: {
        width: 160,
        height: 30,
        fontSize: 17,
        color: '#293462',
        fontWeight: 'bold'
    },
    dropdownContainer: {
        height: 35,
        borderColor: 'black',
        paddingHorizontal: '2%',
        width: '23%'
    },
    selectedTextStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#293462'
    }
});
