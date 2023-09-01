import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ExchangeAmountInput } from '../../../components/transaction/amount/ExchangeAmountInput';
import { ExchangeRate } from '../../../components/transaction/amount/ExchangeRate';
import { CustomButton } from '../../../components/general/CustomButton';

// import { } from 'react-native-heroicons/solid';

export const TransactionScreen = () => {
    return (
        <View style={styles.container}>
            <ExchangeAmountInput message='You Pay' isEditable={true} />
            <ExchangeAmountInput message='You Receive' isEditable={false} />
            <ExchangeRate from='TL' to='BTC' rate={0.06383} />
            
            <CustomButton
                text='Continue'
                onPress={() => alert('Proceeding to the next step of the transaction!')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    }
});