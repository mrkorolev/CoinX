import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { OperationAmount } from './OperationAmount';
import { CurrencyPicker } from './CurrencyPicker';

export const OperationAmountPicker = ({ operation, amount, currency }) => {
    return (
        <View style={styles.layout}>
            <OperationAmount operation={operation} amount={amount} />
            <CurrencyPicker currency={currency}/>
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        width: Dimensions.get('window').width, 
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        alignItems: 'flex-end'
    }
});