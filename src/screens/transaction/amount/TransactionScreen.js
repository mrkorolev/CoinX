import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { ExchangeAmountInput } from '../../../components/transaction/amount/ExchangeAmountInput';
import { ExchangeRate } from '../../../components/transaction/amount/ExchangeRate';
import { CustomButton } from '../../../components/general/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { faBitcoinSign } from '@fortawesome/free-solid-svg-icons';
import { faTurkishLiraSign } from '@fortawesome/free-solid-svg-icons';
import {accessToken, baseCurrencies, cryptoCurrencies} from "../../../constants/index";
import { endpointPriceData } from "../../../services/binanceApiCalls";
import {commissionDataRequest, walletDataRequest} from "../../../services/authentication";

export const TransactionScreen = () => {

    const nav = useNavigation();
    const [spendAmount, setSpendAmount] = useState(null);
    const [spendCurrency, setSpendCurrency] = useState(baseCurrencies[0]);
    const [receiveAmount, setReceiveAmount] = useState(null);
    const [receiveCurrency, setReceiveCurrency] = useState(cryptoCurrencies[0]);
    const [rate, setRate] = useState('');
    const [commission, setCommission] = useState('');
    const [readyToProceed, setReadyToProceed] = useState(false);

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
                operation='You Pay'
                options={baseCurrencies}
                chosenValue={spendCurrency}
                handler={item => {
                    setSpendCurrency(item);
                    setReceiveAmount('');
                    setReadyToProceed(false);
                }}
                value={spendAmount}
                placeholder={'Enter the amount you wish to spend'}
                onChangeAmount={(amount) => {
                    setSpendAmount(amount);
                    setReceiveAmount('');
                    setReadyToProceed(false);
                }}
                textColor='gray'
                isEditable={true} />

            <ExchangeAmountInput
                operation='You Receive'
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
                text={readyToProceed ? 'Generate QR Code' : 'Calculate'}
                onPress={ async () => {

                    if(!spendAmount){
                        alert('Incorrect Input! Try again!');
                        return;
                    }

                    if(readyToProceed){
                        Alert.alert('QR Approval', 'Do you wish to proceed to QR Generation?', [
                            {
                                text: 'Cancel',
                                style: 'destructive',
                                onPress: () => {
                                    console.log('Transaction Cancelled!');
                                }
                            },
                            {
                                text: 'Approve',
                                style: 'default',
                                onPress: async () => {
                                    transactionDebug(spendAmount * (1 + commission/100), spendCurrency.nameShort, receiveAmount, receiveCurrency.nameShort, rate, commission);
                                    const walletData = await walletDataRequest(accessToken, spendAmount * (1 + parseFloat(commission)/100), spendCurrency.nameShort, receiveAmount, receiveCurrency.nameShort, rate, commission);

                                    if(walletData){
                                        nav.navigate('QR CODE', {
                                            walletData: walletData.data.address,
                                            networkData: 'Tron (TRC20)'
                                        });
                                    }else{
                                        alert('Something wrong with the request!');
                                    }
                                }
                            }]);
                    } else {
                        const pricePerUnit = parseFloat(await endpointPriceData(spendCurrency.nameShort, receiveCurrency.nameShort)).toFixed(4);
                        const commissionRate = parseFloat(await commissionDataRequest(accessToken));
                        const providedAmount = parseFloat(`${spendAmount}`).toFixed(4);
                        const amountToReceive = (providedAmount * (1 + commissionRate/100) / pricePerUnit).toFixed(4);

                        setCommission(`${commissionRate}`);
                        setReceiveAmount(amountToReceive);
                        setRate(pricePerUnit);
                        setReadyToProceed(true);
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