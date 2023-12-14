import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Platform, ScrollView, KeyboardAvoidingView } from 'react-native';
import { ExchangeAmountInput } from '../../components/transaction/amount/ExchangeAmountInput';
import { ExchangeRate } from '../../components/transaction/amount/ExchangeRate';
import { CustomButton } from '../../components/general/components/CustomButton';
import { availableNetworks, baseCurrencies, cryptoCurrenciesCalculate } from "../../config/constants/operations";
import { endpointPriceData } from "../../services/binance";
import { commissionDataRequest, walletDataRequest } from "../../services/payone";
import { i18n } from "../../config/localization/i18n";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppContext } from "../../config/context/AppContext";
import { CustomIcon } from "../../components/general/components/CustomIcon";
import { Tron } from "../../components/general/icons/Tron";
import { useIsFocused } from "@react-navigation/native";
import { Tether } from "../../components/general/icons/Tether";

export const TransactionScreen = ({ navigation }) => {
    const { theme, accessToken } = useContext(AppContext);
    const screen = 'screens.transaction';
    const [spendAmount, setSpendAmount] = useState('');
    const [spendCurrency, setSpendCurrency] = useState(baseCurrencies[0]);
    const [receiveAmount, setReceiveAmount] = useState('');
    // const [receiveCurrency, setReceiveCurrency] = useState(cryptoCurrencies[1]);
    const [receiveCurrency, setReceiveCurrency] = useState(cryptoCurrenciesCalculate[0]);
    const [rate, setRate] = useState(null);
    const [commission, setCommission] = useState('');
    const [readyToProceed, setReadyToProceed] = useState(false);
    const [network, setNetwork] = useState(availableNetworks[0]);
    const [networkDisabled, setNetworkDisabled] = useState(true);
    const [hasResponse, setHasResponse] = useState(true);
    const [calculationTimeout, setCalculationTimeout] = useState(null);
    const [requestStatus, setRequestStatus] = useState('');
    const active = useIsFocused();
    const timeout = 1000;

    const transactionDisableHandler = () => !(spendAmount && hasResponse);

    const transactionDebug = (network, spendingAmount, spendingCurrency, receivingAmount, receivingCurrency, rate, commission) => {
        console.log('DEBUG');
        console.log(`\n
            Spending (with commission ${commission} %): ${spendingAmount} ${spendingCurrency}
            Receiving crypto currency: ${receivingAmount} ${receivingCurrency}
            Rate: 1 ${receivingCurrency} === ${rate} ${spendingCurrency}
            Network: ${network.networkCode}
        `);
        console.log('============');
    }

    const iconDecision = () => {
        switch(receiveCurrency.nameShort){
            case 'TRX':
                return <Tron
                    color={theme.exchangeIconColor}
                    bgColor={theme.exchangeIconBgColor}
                    size={wp('4%')} />
            case 'USDT':
                return <Tether
                    color={theme.exchangeIconColor}
                    bgColor={theme.exchangeIconBgColor}
                    size={wp('4.5%')} />
            default:
                return <CustomIcon
                    icon={network.icon}
                    iconSize={wp('4%')}
                    boxSize={wp('7%')}
                    color={theme.exchangeIconColor}
                    bgColor={theme.exchangeIconBgColor} />
        }
    }

    useEffect(() => {
        return () => {
            setReadyToProceed(false);
            setRate(undefined);
            setSpendAmount(undefined);
            setReceiveAmount(undefined);
            setRequestStatus('');
        }
    },[active]);

    const calculateWithCommissionHandler = async (coin) => {
        setHasResponse(false);

        const pricePerUnit = parseFloat(await endpointPriceData(spendCurrency.nameShort, coin.nameShort)).toFixed(4);
        const optionalCommission = parseFloat(await commissionDataRequest(accessToken));
        const providedAmount = parseFloat(`${spendAmount.replaceAll(',', '')}`);
        const amountToReceive = (providedAmount * (1 + optionalCommission/100) / pricePerUnit).toFixed(5);
        setCommission(`${optionalCommission}`);
        setReceiveAmount(amountToReceive);
        setRate(pricePerUnit);
        setReadyToProceed(true);
        // console.log(network.networkCode);

        setHasResponse(true);
    }

    return (
        <KeyboardAvoidingView
            contentContainerStyle={{ backgroundColor: Platform.OS === 'ios' ? theme.screenBgColor : undefined }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <ScrollView
                // ref={scrollViewRef}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.layout, { backgroundColor: theme.screenBgColor }]}>

                <ExchangeAmountInput
                    operation={i18n.t(`${screen}.network`)}
                    chosenCurrencyName={network.networkCode}
                    chosenCurrencyIcon={
                        network.networkName === 'Tron' ?
                            <Tron
                                color={theme.exchangeIconColor}
                                bgColor={theme.exchangeIconBgColor}
                                size={wp('4%')}
                            /> :
                            <CustomIcon
                                icon={network.icon}
                                iconSize={wp('4%')}
                                boxSize={wp('7%')}
                                color={theme.exchangeIconColor}
                                bgColor={theme.exchangeIconBgColor}
                            />
                    }
                    onPressHandler={ () => {
                        if(receiveCurrency.nameShort === 'USDT'){
                            let nextNetwork = availableNetworks[(availableNetworks.indexOf(network) + 1) % availableNetworks.length];
                            if(nextNetwork.networkCode === 'BTC'){
                                nextNetwork = availableNetworks[availableNetworks.indexOf(nextNetwork) + 1];
                            }
                            setNetwork(nextNetwork);
                        }
                        setReceiveAmount(null);
                        setReadyToProceed(null);
                    }}
                    pickerDisabled={networkDisabled}
                    isEditable
                    isNetwork
                    value={network.networkName}
                    textColor={theme.primaryContentColor} />

                <ExchangeAmountInput
                    operation={i18n.t(`${screen}.pay`)}
                    chosenCurrencyName={spendCurrency.nameShort}
                    chosenCurrencyIcon={
                        <CustomIcon
                            icon={spendCurrency.icon}
                            iconSize={wp('4%')}
                            boxSize={wp('7%')}
                            color={theme.exchangeIconColor}
                            bgColor={theme.exchangeIconBgColor}
                        />
                    }
                    // onPressHandler={() => {
                    //     setSpendCurrency(baseCurrencies[(baseCurrencies.indexOf(spendCurrency) + 1) % baseCurrencies.length]);
                    //     setReceiveAmount(null);
                    //     setReadyToProceed(false);
                    // }}
                    value={spendAmount}
                    placeholder={i18n.t(`${screen}.placeholder`)}
                    onChangeAmount={(amount) => {
                        let inputValue = amount === '0' ? '' : amount;

                        inputValue = inputValue.replace(/[,\.]/g, '');
                        inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                        setSpendAmount(inputValue);
                        setReceiveAmount(null);
                        setReadyToProceed(false);
                    }}
                    textColor={theme.primaryContentColor}
                    isEditable={true}
                    pickerDisabled={true} />

                <ExchangeAmountInput
                    placeholder={requestStatus}
                    pickerDisabled={transactionDisableHandler()}
                    operation={i18n.t(`${screen}.receive`)}
                    chosenCurrencyName={receiveCurrency.nameShort}
                    chosenCurrencyIcon={iconDecision()}
                    onPressHandler={ async () => {
                        setRequestStatus('');
                        clearTimeout(calculationTimeout);
                        setReceiveAmount(undefined);
                        setReadyToProceed(false);

                        // setHasResponse(false);
                        // const toBeChosenNext = cryptoCurrencies[(cryptoCurrencies.indexOf(receiveCurrency) + 1) % cryptoCurrencies.length];
                        const toBeChosenNext = cryptoCurrenciesCalculate[(cryptoCurrenciesCalculate.indexOf(receiveCurrency) + 1) % cryptoCurrenciesCalculate.length];
                        switch(toBeChosenNext.nameShort){
                            case 'ETH':
                                setNetwork(availableNetworks.find((element) => element.networkCode === 'ERC20'));
                                setNetworkDisabled(true);
                                break;

                            case 'BTC':
                                setNetwork(availableNetworks.find((element) => element.networkCode === 'BTC'));
                                setNetworkDisabled(true);
                                break;

                            case 'TRX':
                                setNetwork(availableNetworks.find((element) => element.networkCode === 'TRC20'));
                                setNetworkDisabled(true);
                                break;

                            case 'USDT':
                                setNetwork(availableNetworks.find(element => element.networkCode !== 'BTC'));
                                // setNetworkDisabled(false);
                                setNetworkDisabled(true);
                                break;
                        }
                        setReceiveCurrency(toBeChosenNext);

                        setCalculationTimeout(
                            setTimeout(async () => {
                                setRequestStatus(i18n.t(`${screen}.calculation_status`))
                                await calculateWithCommissionHandler(toBeChosenNext);
                                setRequestStatus('');
                                setReadyToProceed(true);
                            }, timeout));
                    }}
                    value={receiveAmount}
                    textColor={theme.primaryContentColor}
                    isEditable={false} />

                {/*ADD THIS LATER*/}
                {/*{ (rate && requestStatus && hasResponse) ?*/}
                {/*    <ExchangeRate style={[styles.exchangeRateText, { color: theme.secondaryContentColor }]} from={spendCurrency.nameShort} to={receiveCurrency.nameShort} rate={readyToProceed ? parseFloat(rate).toFixed(2) : '...'} /> :*/}
                {/*    <Text style={styles.exchangeRateText}>{' '}</Text>}*/}

                <View style={{ paddingTop: hp('10%') }}>
                    <CustomButton
                        isDisabled={transactionDisableHandler()}
                        textColor={theme.mainBtnTextColor}
                        bgColor={theme.mainBtnBgColor}
                        borderColor={theme.mainBtnBorderColor}
                        text={readyToProceed ? i18n.t(`${screen}.generate_qr_text`) : i18n.t(`${screen}.calculate_text`)}
                        onPress={ async () => {
                            setRequestStatus(i18n.t(`${screen}.calculation_status`));
                            setHasResponse(false);
                            // if(!spendAmount){
                            //     Alert.alert(i18n.t(`${screen}.error_title`), i18n.t(`${screen}.error_message`));
                            //     return;
                            // }

                            if(!readyToProceed){

                                // DEBUG
                                // navigation.navigate('QR', {
                                //     walletData: 'qwejqiwejbnoiybgpqweurhqpwriugfboqifyubqwoiuerhqowiuhfboqieurfhoqiuwehfoiuqwhrefoiquwehfo',
                                //     networkData: 'Tron (TRC20)'
                                // });

                                await calculateWithCommissionHandler(receiveCurrency);
                            } else {
                                Alert.alert(i18n.t(`${screen}.qr_approval_title`), i18n.t(`${screen}.qr_approval_message`), [
                                    {
                                        text: i18n.t(`${screen}.qr_approval_cancel`),
                                        style: 'destructive',
                                        onPress: () => {
                                            console.log('Transaction Cancelled!');
                                            setHasResponse(true);
                                        }
                                    },
                                    {
                                        text: i18n.t(`${screen}.qr_approval_proceed`),
                                        style: 'default',
                                        onPress: async () => {
                                            const finalSpendAmount = parseFloat(spendAmount.replaceAll(',', ''));
                                            // transactionDebug(network, finalSpendAmount * (1 + commission/100), spendCurrency.nameShort, receiveAmount, receiveCurrency.nameShort, rate, commission);

                                            // DEBUG
                                            // navigation.navigate('QR_DETAILS', {
                                            //     walletData: '123123123123123123',
                                            //     networkData: `TRC20`,
                                            //     depositStatus: 'Pending'
                                            // });

                                            const walletData = await walletDataRequest(accessToken, spendAmount.replaceAll(',', ''), spendCurrency.nameShort, receiveAmount, receiveCurrency.nameShort, rate, commission, network.networkCode);
                                            const formatInput = (input) => input < 10 ? `0${input}` : input;
                                            const startDate = new Date(parseInt(walletData.start_timestamp) * 1000);
                                            // console.log(walletData.address);
                                            setHasResponse(true);
                                            navigation.navigate('QR_DETAILS', {
                                                cryptoAmount: receiveAmount,
                                                cryptoCurrency: receiveCurrency.nameShort,
                                                walletData: walletData.address,
                                                referenceNumber: walletData.transaction_id,
                                                startTime: `${formatInput(startDate.getHours())}:${formatInput(startDate.getMinutes())}  ${formatInput(startDate.getDate())}/${formatInput(startDate.getMonth())}/${formatInput(startDate.getFullYear())}`,
                                                networkData: `${network.networkCode}`,
                                                walletVisible: true
                                            });
                                        }
                                    }]);
                            }
                            setHasResponse(true);
                            // setReadyToProceed(true);
                        }} />
                </View>

                <View style={{ flex: 0.6 }}/>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    layout: {
        justifyContent: 'center',
        padding: wp('2%'),
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('5%'),
        gap: hp('2%'),
        height: hp('90%')
    },
    exchangeRateText: {
        fontSize: wp('3.5%'),
        paddingTop: hp('0.5%'),
        paddingBottom: hp('4%')
    }
});
