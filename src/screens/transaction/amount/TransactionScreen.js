import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ExchangeAmountInput } from '../../../components/transaction/amount/ExchangeAmountInput';
import { ExchangeRate } from '../../../components/transaction/amount/ExchangeRate';
import { CustomButton } from '../../../components/general/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { faBitcoinSign } from '@fortawesome/free-solid-svg-icons';
import { faTurkishLiraSign } from '@fortawesome/free-solid-svg-icons';

export const TransactionScreen = () => {
    const nav = useNavigation();

    return (
        <View style={styles.container}>
            <ExchangeAmountInput currency='TL' icon={faTurkishLiraSign} message='You Pay' isEditable={true} />
            <ExchangeAmountInput currency='USDT' icon={faBitcoinSign} message='You Receive' isEditable={true} />
            <ExchangeRate from='TL' to='BTC' rate={0.06383} />
            
            <CustomButton
                text='Continue'
                onPress={() => {
                    nav.navigate('QR CODE');
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