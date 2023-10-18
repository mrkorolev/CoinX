import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { ExchangeAmountInput } from '../../../components/transaction/amount/ExchangeAmountInput';
import { ExchangeRate } from '../../../components/transaction/amount/ExchangeRate';
import { CustomButton } from '../../../components/general/CustomButton';
import { availableNetworks, baseCurrencies, cryptoCurrencies} from "../../../constants/index";
import { endpointPriceData } from "../../../services/binanceApiCalls";
import { commissionDataRequest, walletDataRequest } from "../../../services/authentication";
import { i18n } from "../../../localization/i18n";

// Responsiveness:
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {AppContext} from "../../../global/AppContext";

export const TransactionScreen = ({ navigation }) => {

    const { theme, accessToken } = useContext(AppContext);
    const screen = 'screens.transaction';

    const [spendAmount, setSpendAmount] = useState('');
    const [spendCurrency, setSpendCurrency] = useState(baseCurrencies[0]);
    const [receiveAmount, setReceiveAmount] = useState('');
    const [receiveCurrency, setReceiveCurrency] = useState(cryptoCurrencies[1]);
    const [rate, setRate] = useState(null);
    const [commission, setCommission] = useState('');
    const [readyToProceed, setReadyToProceed] = useState(false);
    const [network, setNetwork] = useState(availableNetworks[0]);
    const [networkDisabled, setNetworkDisabled] = useState(true);

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

    return (
        <View style={[styles.layout, { backgroundColor: theme.screenBgColor }]}>

            <ExchangeAmountInput
                operation={i18n.t(`${screen}.network`)}
                chosenCurrencyName={network.networkCode}
                chosenCurrencyIcon={network.icon}
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
                isEditable={false}
                value={network.networkName}
                textColor={theme.primaryContentColor} />

            <ExchangeAmountInput
                operation={i18n.t(`${screen}.pay`)}
                chosenCurrencyName={spendCurrency.nameShort}
                chosenCurrencyIcon={spendCurrency.icon}
                // onPressHandler={() => {
                //     setSpendCurrency(baseCurrencies[(baseCurrencies.indexOf(spendCurrency) + 1) % baseCurrencies.length]);
                //     setReceiveAmount(null);
                //     setReadyToProceed(false);
                // }}
                value={spendAmount}
                placeholder={i18n.t(`${screen}.placeholder`)}
                onChangeAmount={(amount) => {
                    let inputValue = amount;
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
                operation={i18n.t(`${screen}.receive`)}
                chosenCurrencyName={receiveCurrency.nameShort}
                chosenCurrencyIcon={receiveCurrency.icon}
                onPressHandler={() => {
                    setReceiveAmount(undefined);
                    setReadyToProceed(false);
                    const toBeChosenNext = cryptoCurrencies[(cryptoCurrencies.indexOf(receiveCurrency) + 1) % cryptoCurrencies.length];

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
                            setNetworkDisabled(false);
                            break;
                    }
                    setReceiveCurrency(toBeChosenNext);
                }}
                value={receiveAmount}
                textColor={theme.primaryContentColor}
                isEditable={false} />

            { rate ?
                <ExchangeRate style={[styles.exchangeRateText, { color: theme.secondaryContentColor }]} from={spendCurrency.nameShort} to={receiveCurrency.nameShort} rate={readyToProceed ? parseFloat(rate).toFixed(2) : '...'} /> :
                <Text style={styles.exchangeRateText}>{' '}</Text>}

            <CustomButton
                textColor={theme.mainBtnTextColor}
                bgColor={theme.mainBtnBgColor}
                borderColor={theme.mainBtnBorderColor}
                text={readyToProceed ? i18n.t(`${screen}.generate_qr_text`) : i18n.t(`${screen}.calculate_text`)}
                onPress={ async () => {

                    if(!spendAmount){
                        Alert.alert(i18n.t(`${screen}.error_title`), i18n.t(`${screen}.error_message`));
                        return;
                    }

                    if(readyToProceed){
                        Alert.alert(i18n.t(`${screen}.qr_approval_title`), i18n.t(`${screen}.qr_approval_message`), [
                            {
                                text: i18n.t(`${screen}.qr_approval_cancel`),
                                style: 'destructive',
                                onPress: () => {
                                    console.log('Transaction Cancelled!');
                                }
                            },
                            {
                                text: i18n.t(`${screen}.qr_approval_proceed`),
                                style: 'default',
                                onPress: async () => {
                                    const finalSpendAmount = parseFloat(spendAmount.replaceAll(',', ''));
                                    transactionDebug(network, finalSpendAmount * (1 + commission/100), spendCurrency.nameShort, receiveAmount, receiveCurrency.nameShort, rate, commission);

                                    // DEBUG
                                    // navigation.navigate('QR', {
                                    //     walletData: '123123123123123123',
                                    //     networkData: `TRC20`,
                                    //     depositStatus: 0
                                    // });

                                    const walletData = await walletDataRequest(accessToken, spendAmount.replaceAll(',', ''), spendCurrency.nameShort, receiveAmount, receiveCurrency.nameShort, rate, commission, network.networkCode);
                                    navigation.navigate('QR', {
                                        walletData: walletData.address,
                                        networkData: `${network.networkCode}`,
                                        depositStatus: 'Pending'
                                    });
                                }
                            }]);
                    } else {

                        // DEBUG
                        // navigation.navigate('QR', {
                        //     walletData: 'qwejqiwejbnoiybgpqweurhqpwriugfboqifyubqwoiuerhqowiuhfboqieurfhoqiuwehfoiuqwhrefoiquwehfo',
                        //     networkData: 'Tron (TRC20)'
                        // });

                        const pricePerUnit = parseFloat(await endpointPriceData(spendCurrency.nameShort, receiveCurrency.nameShort)).toFixed(4);
                        const commissionRate = parseFloat(await commissionDataRequest(accessToken));
                        const providedAmount = parseFloat(`${spendAmount.replaceAll(',', '')}`);
                        const amountToReceive = (providedAmount * (1 + commissionRate/100) / pricePerUnit).toFixed(4);
                        setCommission(`${commissionRate}`);
                        setReceiveAmount(amountToReceive);
                        setRate(pricePerUnit);
                        setReadyToProceed(true);
                        console.log(network.networkCode);
                    }
                }} />
            <View style={{ flex: 0.25 }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        padding: wp('2%'),
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('5%'),
        gap: hp('2%')
    },
    exchangeRateText: {
        fontSize: wp('3.5%'),
        paddingTop: hp('0.5%'),
        paddingBottom: hp('4%')
    }
});
