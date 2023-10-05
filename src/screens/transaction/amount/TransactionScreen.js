import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { ExchangeAmountInput } from '../../../components/transaction/amount/ExchangeAmountInput';
import { ExchangeRate } from '../../../components/transaction/amount/ExchangeRate';
import { CustomButton } from '../../../components/general/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { accessToken, baseCurrencies, cryptoCurrencies } from "../../../constants/index";
import { endpointPriceData } from "../../../services/binanceApiCalls";
import { commissionDataRequest, walletDataRequest } from "../../../services/authentication";
import { i18n } from "../../../localization/i18n";

// Responsiveness:
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const TransactionScreen = () => {

    const nav = useNavigation();
    const [spendAmount, setSpendAmount] = useState('');
    const [spendCurrency, setSpendCurrency] = useState(baseCurrencies[0]);
    const [receiveAmount, setReceiveAmount] = useState('');
    const [receiveCurrency, setReceiveCurrency] = useState(cryptoCurrencies[0]);
    const [rate, setRate] = useState(null);
    const [commission, setCommission] = useState('');
    const [readyToProceed, setReadyToProceed] = useState(false);
    const screen = 'screens.transaction';

    useEffect(() => {
        console.log(spendCurrency.nameShort);
        return () => setReadyToProceed(false);
    }, []);

    const transactionDebug = (spendingAmount, spendingCurrency, receivingAmount, receivingCurrency, rate, commission) => {
        console.log('DEBUG');
        console.log(`\n
            Spending (with commission ${commission} %): ${spendingAmount} ${spendingCurrency}
            Receiving crypto currency: ${receivingAmount} ${receivingCurrency}
            Rate: 1 ${receivingCurrency} === ${rate} ${spendingCurrency}
        `);
        console.log('============');
    }

    return (
        <View style={styles.layout}>
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
                textColor='gray'
                isEditable={true} />

            <ExchangeAmountInput
                operation={i18n.t(`${screen}.receive`)}
                chosenCurrencyName={receiveCurrency.nameShort}
                chosenCurrencyIcon={receiveCurrency.icon}
                onPressHandler={() => {
                    setReceiveCurrency(cryptoCurrencies[(cryptoCurrencies.indexOf(receiveCurrency) + 1) % cryptoCurrencies.length]);
                    setReceiveAmount(null);
                    setReadyToProceed(false);
                }}
                value={receiveAmount}
                textColor='#293462'
                isEditable={false} />

            { rate ?
                <ExchangeRate style={styles.exchangeRateText} from={spendCurrency.nameShort} to={receiveCurrency.nameShort} rate={readyToProceed ? parseFloat(rate).toFixed(2) : '...'} /> :
                <Text style={styles.exchangeRateText}>{' '}</Text>}

            <CustomButton
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
                                    transactionDebug(finalSpendAmount * (1 + commission/100), spendCurrency.nameShort, receiveAmount, receiveCurrency.nameShort, rate, commission);
                                    const walletData = await walletDataRequest(accessToken, `${finalSpendAmount * (1 + parseFloat(commission)/100)}`, spendCurrency.nameShort, receiveAmount, receiveCurrency.nameShort, rate, commission);

                                    // DEBUG:
                                    nav.navigate(i18n.t('screens.qr_code.screen_name'), {
                                        walletData: 'qwejqiwejbnoiybgpqweurhqpwriugfboqifyubqwoiuerhqowiuhfboqieurfhoqiuwehfoiuqwhrefoiquwehfo',
                                        networkData: 'Tron (TRC20)'
                                    });

                                    // if(walletData){
                                    //     nav.navigate(i18n.t('screens.qr_code.screen_name'), {
                                    //         // walletData: walletData.data.address,
                                    //         walletData: 'qwejqiwejbnoiybgpqweurhqpwriugfboqifyubqwoiuerhqowiuhfboqieurfhoqiuwehfoiuqwhrefoiquwehfoqwehf',
                                    //         networkData: 'Tron (TRC20)'
                                    //     });
                                    // }
                                }
                            }]);
                    } else {
                        const pricePerUnit = parseFloat(await endpointPriceData(spendCurrency.nameShort, receiveCurrency.nameShort)).toFixed(4);
                        const commissionRate = parseFloat(await commissionDataRequest(accessToken));
                        const providedAmount = parseFloat(`${spendAmount.replaceAll(',', '')}`);
                        const amountToReceive = (providedAmount * (1 + commissionRate/100) / pricePerUnit).toFixed(4);

                        setCommission(`${commissionRate}`);
                        setReceiveAmount(amountToReceive);
                        setRate(pricePerUnit);
                        setReadyToProceed(true);

                        // DEBUG:
                        // nav.navigate(i18n.t('screens.qr_code.screen_name'), {
                        //     walletData: 'qwejqiwejbnoiybgpqweurhqpwriugfboqifyubqwoiuerhqowiuhfboqieurfhoqiuwehfoiuqwhrefoiquwehfo',
                        //     networkData: 'Tron (TRC20)'
                        // });
                    }
                }} />
            <View style={{ flex: 0.25 }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: wp('2%'),
        gap: hp('2%')
    },
    exchangeRateText: {
        fontSize: wp('3.5%'),
        color: 'gray',
        paddingTop: hp('0.5%'),
        paddingBottom: hp('4%')
    }
});
