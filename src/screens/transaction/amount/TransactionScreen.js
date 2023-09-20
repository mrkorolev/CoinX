import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ExchangeAmountInput } from '../../../components/transaction/amount/ExchangeAmountInput';
import { ExchangeRate } from '../../../components/transaction/amount/ExchangeRate';
import { CustomButton } from '../../../components/general/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { faBitcoinSign } from '@fortawesome/free-solid-svg-icons';
import { faTurkishLiraSign } from '@fortawesome/free-solid-svg-icons';
import { baseCurrencies, cryptoCurrencies } from "../../../constants/index";
import { endpointPriceData } from "../../../services/binanceApiCalls";

export const TransactionScreen = () => {

    const nav = useNavigation();
    const [spendAmount, setSpendAmount] = useState(null);
    const [spendCurrency, setSpendCurrency] = useState(baseCurrencies[0]);
    const [receiveAmount, setReceiveAmount] = useState(null);
    const [receiveCurrency, setReceiveCurrency] = useState(cryptoCurrencies[0]);

    const [rate, setRate] = useState('');
    const [readyToProceed, setReadyToProceed] = useState(false);

    return (
        <View style={styles.container}>
            <ExchangeAmountInput
                operation='You Pay'
                // icon={faTurkishLiraSign}
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
                // icon={faBitcoinSign}
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
                text='Continue'
                onPress={ async () => {
                    if(!spendAmount){
                        alert('Incorrect Input! Try again!');
                        return;
                    }

                    if(readyToProceed){
                        nav.navigate('QR CODE');
                    } else {
                        const pricePerUnit = parseFloat(await endpointPriceData(spendCurrency.nameShort, receiveCurrency.nameShort)).toFixed(4);
                        const providedAmount = parseFloat(spendAmount).toFixed(4);
                        const amountToReceive = (providedAmount / pricePerUnit).toFixed(4);

                        setReceiveAmount(amountToReceive);
                        setRate(pricePerUnit);
                        setReadyToProceed(true);

                        // const data = `Review requested operation\n
                        // Purchase: ${receiveAmount} ${receiveCurrency.nameShort}
                        // Spending: ${spendAmount} ${spendCurrency.nameShort}
                        // Commission: ---\n
                        // Press 'Continue' again if you wish to proceed`;
                        // alert(data);
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