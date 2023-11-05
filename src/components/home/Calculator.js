import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { Line } from "./Line";
import { CustomIcon } from "../general/components/CustomIcon";
import { baseCurrencies, cryptoCurrencies } from "../../config/constants/operations";
import { endpointPriceData } from "../../services/binance";
import { i18n } from "../../config/localization/i18n";
import { TransactionCurrencyPicker } from "../general/components/TransactionCurrencyPicker";
import { OutlinedTextField } from "rn-material-ui-textfield";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppContext } from "../../config/context/AppContext";
import { Tron } from "../general/icons/Tron";

export const Calculator = ({ modifyScrollAction, onFocusScroll }) => {

    const { theme } = useContext(AppContext);
    const screen = 'screens.home';

    const [spendAmount, setSpendAmount] = useState(undefined);
    const [spendCurrency, setSpendCurrency] = useState(baseCurrencies[0]);

    const [receiveAmount, setReceiveAmount] = useState(undefined);
    const [receiveCurrency, setReceiveCurrency] = useState(cryptoCurrencies[0]);

    return (
        <View style={styles.container}>
            <View style={styles.pickerLayout}>
                    <OutlinedTextField
                        inputContainerStyle={styles.operationContainer}
                        label='from'
                        fontSize={wp('4%')}
                        activeLineWidth={1}
                        textColor={theme.primaryContentColor}
                        tintColor={theme.primaryContentColor}
                        baseColor={theme.primaryContentColor}
                        returnKeyType='done'
                        onBlur={() => modifyScrollAction(false)}
                        onFocus={() => {
                            setReceiveAmount(null);
                            modifyScrollAction(true);
                            onFocusScroll();
                        }}
                        onChangeText={(text) => {
                            let inputValue = text;
                            inputValue = inputValue.replace(/[,\.]/g, '');
                            inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            setSpendAmount(inputValue);
                            setReceiveAmount(undefined)
                        }}
                        value={spendAmount}
                        maxLength={10}
                        keyboardType='number-pad'
                        enterKeyHint='done'
                        selectTextOnFocus />

                    <TransactionCurrencyPicker
                        currencyName={spendCurrency.nameShort}
                        currencyIcon={
                            <CustomIcon
                            icon={ spendCurrency.icon}
                            iconSize={wp('4%')}
                            boxSize={wp('7%')}
                            color={theme.calcCurrencyIconColor}
                            bgColor={theme.calcCurrencyIconBgColor}
                            />
                        }
                        customStyle={{width: wp('25%')}}
                        // hasBorder
                        disabled={true}
                        // onPressHandler={() => {
                        //     setSpendCurrency(baseCurrencies[(baseCurrencies.indexOf(spendCurrency) + 1) % baseCurrencies.length]);
                        //     setReceiveAmount(undefined);
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
                <OutlinedTextField
                    fontSize={wp('4%')}
                    textColor={theme.primaryContentColor}
                    label='to'
                    baseColor={theme.primaryContentColor}
                    inputContainerStyle={styles.operationContainer}
                    maxLength={10}
                    keyboardType='decimal-pad'
                    keyboardKeyType='done'
                    editable={false}
                    value={receiveAmount} />

                <TransactionCurrencyPicker
                    customStyle={{width: wp('25%')}}
                    currencyName={receiveCurrency.nameShort}
                    currencyIcon={
                    receiveCurrency.nameLong === 'Tron' ?
                        <Tron
                            color={theme.calcCurrencyIconColor}
                            bgColor={theme.calcCurrencyIconBgColor}
                            size={wp('4%')}
                        /> :
                        <CustomIcon
                            icon={receiveCurrency.icon}
                            iconSize={wp('4%')}
                            boxSize={wp('7%')}
                            color={theme.calcCurrencyIconColor}
                            bgColor={theme.calcCurrencyIconBgColor}
                        />
                    }
                    // hasBorder
                    onPressHandler={() => {
                        setReceiveCurrency(cryptoCurrencies[(cryptoCurrencies.indexOf(receiveCurrency) + 1) % cryptoCurrencies.length]);
                        setReceiveAmount(null);
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
        paddingBottom: hp('10%'),
        gap: hp('2.5%')
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
        justifyContent: 'space-around',
    },
    operationContainer: {
        justifyContent: 'center',
        height: hp('6%'),
        width: wp('27%'),
        borderRadius: 5,
    }
});
