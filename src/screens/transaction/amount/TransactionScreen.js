import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { ExchangeAmountInput } from '../../../components/transaction/amount/ExchangeAmountInput';
import { ExchangeRate } from '../../../components/transaction/amount/ExchangeRate';
import { CustomButton } from '../../../components/general/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { faBitcoinSign } from '@fortawesome/free-solid-svg-icons';
import { faTurkishLiraSign } from '@fortawesome/free-solid-svg-icons';
import { accessToken, baseCurrencies, cryptoCurrencies } from "../../../constants/index";
import { endpointPriceData } from "../../../services/binanceApiCalls";
import { commissionDataRequest, walletDataRequest } from "../../../services/authentication";
import { i18n } from "../../../localization/i18n";

export const TransactionScreen = () => {

    const nav = useNavigation();
    const [spendAmount, setSpendAmount] = useState(null);
    const [spendCurrency, setSpendCurrency] = useState(baseCurrencies[0]);
    const [receiveAmount, setReceiveAmount] = useState(null);
    const [receiveCurrency, setReceiveCurrency] = useState(cryptoCurrencies[0]);
    const [rate, setRate] = useState('');
    const [commission, setCommission] = useState('');
    const [readyToProceed, setReadyToProceed] = useState(false);
    const screen = 'transaction';

    useEffect(() => {
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
        <View style={styles.container}>
            <ExchangeAmountInput
                operation={i18n.t(`${screen}.pay`)}
                options={baseCurrencies}
                chosenValue={spendCurrency}
                handler={item => {
                    setSpendCurrency(item);
                    setReceiveAmount('');
                    setReadyToProceed(false);
                }}
                value={spendAmount}
                placeholder={i18n.t(`${screen}.placeholder`)}
                onChangeAmount={(amount) => {
                    setSpendAmount(amount);
                    setReceiveAmount('');
                    setReadyToProceed(false);
                }}
                textColor='gray'
                isEditable={true} />

            <ExchangeAmountInput
                operation={i18n.t(`${screen}.receive`)}
                options={cryptoCurrencies}
                chosenValue={receiveCurrency}
                handler={item => {
                    setReceiveCurrency(item);
                    setReceiveAmount('');
                    setReadyToProceed(false);
                }}
                value={receiveAmount}
                textColor='#293462'
                isEditable={false} />

            { rate ?
                <ExchangeRate from={spendCurrency.nameShort} to={receiveCurrency.nameShort} rate={readyToProceed ? parseFloat(rate).toFixed(4) : '...'} /> :
                <Text style={{ fontSize: 15, paddingTop: 10, paddingBottom: 20, fontWeight: 'bold' }}>{' '}</Text>}

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
                                    // transactionDebug(spendAmount * (1 + commission/100), spendCurrency.nameShort, receiveAmount, receiveCurrency.nameShort, rate, commission);
                                    // const walletData = await walletDataRequest(accessToken, spendAmount * (1 + parseFloat(commission)/100), spendCurrency.nameShort, receiveAmount, receiveCurrency.nameShort, rate, commission);

                                    nav.navigate(i18n.t('qr_code.screen_name'), {
                                        walletData: 'wefkeroiweroweutweotuwtowet889wetu934jw4j5ikwer',
                                        networkData: 'Tron (TRC20)'
                                    });

                                    // if(walletData){
                                    //     nav.navigate(i18n.t('qr_code.screen_name'), {
                                    //         walletData: walletData.data.address,
                                    //         networkData: 'Tron (TRC20)'
                                    //     });
                                    // }else{
                                    //     Alert.alert('Something wrong with the request!');
                                    // }
                                }
                            }]);
                    } else {
                        // const pricePerUnit = parseFloat(await endpointPriceData(spendCurrency.nameShort, receiveCurrency.nameShort)).toFixed(4);
                        // const commissionRate = parseFloat(await commissionDataRequest(accessToken));
                        // const providedAmount = parseFloat(`${spendAmount}`).toFixed(4);
                        // const amountToReceive = (providedAmount * (1 + commissionRate/100) / pricePerUnit).toFixed(4);
                        //
                        // setCommission(`${commissionRate}`);
                        // setReceiveAmount(amountToReceive);
                        // setRate(pricePerUnit);
                        setReadyToProceed(true);

                        // nav.navigate(i18n.t('qr_code.screen_name'), {
                        //     walletData: 'wefkeroiweroweutweotuwtowet889wetu934jw4j5ikwer',
                        //     networkData: 'Tron (TRC20)'
                        // });
                    }
                }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    }
});
