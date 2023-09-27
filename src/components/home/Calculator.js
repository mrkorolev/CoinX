import React, { useState } from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions, Text, TextInput, Keyboard} from 'react-native';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';
import {Line} from "./Line";
import {CustomIcon} from "../general/CustomIcon";
import {baseCurrencies, cryptoCurrencies} from "../../constants/index";
import {CustomDropdown} from "../general/CustomDropdown";
import { endpointPriceData } from "../../services/binanceApiCalls";

export const Calculator = () => {

    // State for the chosen currency and amount, ready to send the request and setReceiveCurrency as a result (editable={false})
    const [spendAmount, setSpendAmount] = useState();
    const [spendCurrency, setSpendCurrency] = useState(baseCurrencies[0]);
    const [receiveAmount, setReceiveAmount] = useState('---');
    const [receiveCurrency, setReceiveCurrency] = useState(cryptoCurrencies[0]);

    return (
        <View style={styles.container}>
            <View style={styles.pickerLayout}>
                <View style={styles.operationContainer}>
                    <Text style={styles.operation}>Spend</Text>
                    <TextInput style={styles.operationAmount}
                               maxLength={7}
                               inputMode='decimal'
                               onChangeText={(text) => setSpendAmount(text)}
                               value={spendAmount}
                               placeholder={'...'} />
                </View>

                <CustomDropdown
                    data={baseCurrencies}
                    value={spendCurrency}
                    onChangeHandler={item => {
                        setSpendCurrency(item);
                        // setIsFocus(false);
                    }}/>

            </View>

            <View style={styles.separator}>
                <Line backgroundColor='lightgray' />
                <TouchableOpacity
                    onPress={ async () => {
                        if(!spendAmount){
                            alert('Incorrect Input! Try again!');
                        }else{
                            const response = await endpointPriceData(spendCurrency.nameShort, receiveCurrency.nameShort);
                            const required = parseFloat(response).toFixed(4);
                            const toSpend = parseFloat(spendAmount).toFixed(4);
                            setReceiveAmount(`${(toSpend / required).toFixed(2)}`);
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
                    <Text style={styles.operation}>Receive</Text>
                    <TextInput style={styles.operationAmount}
                               maxLength={7}
                               keyboardType='decimal-pad'
                               keyboardKeyType='done'
                               editable={false}
                               value={receiveAmount} />
                </View>

                <CustomDropdown
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
        alignItems: 'flex-start',
        gap: 8,
        height: 55,
        width: '25%',
        // borderWidth: 1,
        paddingHorizontal: '2%',
        // borderRadius: 10
    },
    operation: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'gray'
    },
    operationAmount: {
        width: 80,
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