import React, { useContext, useState } from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions, Alert, Platform} from 'react-native';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { Line } from "./Line";
import { CustomIcon } from "../general/components/CustomIcon";
import { baseCurrencies, cryptoCurrencies, cryptoCurrenciesCalculate } from "../../config/constants/operations";
import { endpointPriceData } from "../../services/binance";
import { i18n } from "../../config/localization/i18n";
import { TransactionCurrencyPicker } from "../general/components/TransactionCurrencyPicker";
import { OutlinedTextField } from "rn-material-ui-textfield";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppContext } from "../../config/context/AppContext";
import { Tron } from "../general/icons/Tron";
import { commissionDataRequest } from "../../services/payone";
import {Tether} from "../general/icons/Tether";

export const Calculator = ({ modifyScrollAction, onFocusScroll }) => {

    const { theme, accessToken } = useContext(AppContext);
    const screen = 'screens.home';

    const [spendAmount, setSpendAmount] = useState(undefined);
    const [spendCurrency, setSpendCurrency] = useState(baseCurrencies[0]);

    const [receiveAmount, setReceiveAmount] = useState(undefined);
    // const [receiveCurrency, setReceiveCurrency] = useState(cryptoCurrencies[0]);
    const [receiveCurrency, setReceiveCurrency] = useState(cryptoCurrenciesCalculate[0]);
    const [hasResponse, setHasResponse] = useState(true);

    const disableButtonsHandler = () => !(hasResponse);

    const calculateCryptoHandler = async (coin) => {
        if(!spendAmount){
            Alert.alert(i18n.t(`${screen}.error_title`),i18n.t(`${screen}.error_message`));
        }else{
            const pricePerUnit = await endpointPriceData(spendCurrency.nameShort, coin.nameShort);
            const commissionRate = parseFloat(await commissionDataRequest(accessToken));
            const providedAmount = parseFloat(`${spendAmount.replaceAll(',', '')}`);
            const amountToReceive = (providedAmount * (1 + commissionRate/100) / pricePerUnit).toFixed(4);
            setReceiveAmount(amountToReceive);
        }
    }

    const iconDecision = () => {
        switch(receiveCurrency.nameShort){
            case 'TRX':
                return <Tron
                    color={theme.calcCurrencyIconColor}
                    bgColor={theme.calcCurrencyIconBgColor}
                    size={wp('4%')}
                />
            case 'USDT':
                return <Tether
                    color={theme.calcCurrencyIconColor}
                    bgColor={theme.calcCurrencyIconBgColor}
                    size={wp('4.5%')}
                />
            default:
                return <CustomIcon
                    icon={receiveCurrency.icon}
                    iconSize={wp('4%')}
                    boxSize={wp('7%')}
                    color={theme.calcCurrencyIconColor}
                    bgColor={theme.calcCurrencyIconBgColor}
                />
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.pickerLayout}>
                    <OutlinedTextField
                        inputContainerStyle={styles.operationContainer}
                        label={i18n.t(`${screen}.calculator_from`)}
                        fontSize={wp('3.5%')}
                        activeLineWidth={1}
                        textColor={theme.primaryContentColor}
                        tintColor={theme.primaryContentColor}
                        baseColor={theme.primaryContentColor}
                        returnKeyType='done'
                        onBlur={() => modifyScrollAction(false)}
                        onFocus={async () => {
                            await setReceiveAmount(null);
                            await modifyScrollAction(true);
                            onFocusScroll();
                        }}
                        onChangeText={(text) => {
                            let inputValue = text === '0' ? '' : text;
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
                    disabled={disableButtonsHandler()}
                    onPress={async () => {
                        setHasResponse(false);
                        await calculateCryptoHandler(receiveCurrency);
                        setHasResponse(true);
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
                    fontSize={wp('3.5%')}
                    textColor={theme.primaryContentColor}
                    label={i18n.t(`${screen}.calculator_to`)}
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
                    disabled={disableButtonsHandler()}
                    currencyIcon={iconDecision()}

                    // hasBorder
                    onPressHandler={async () => {
                        setHasResponse(false);
                        // setReceiveCurrency(cryptoCurrencies[(cryptoCurrencies.indexOf(receiveCurrency) + 1) % cryptoCurrencies.length]);
                        setReceiveCurrency(cryptoCurrenciesCalculate[(cryptoCurrenciesCalculate.indexOf(receiveCurrency) + 1) % cryptoCurrenciesCalculate.length]);
                        setReceiveAmount(null);
                        const toBeChosenNext = cryptoCurrenciesCalculate[(cryptoCurrenciesCalculate.indexOf(receiveCurrency) + 1) % cryptoCurrenciesCalculate.length];
                        await calculateCryptoHandler(toBeChosenNext);
                        setHasResponse(true);
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
        height: Platform.OS === 'ios' ? hp('6%') : hp('7%'),
        width: wp('27%'),
        borderRadius: 5
    }
});
