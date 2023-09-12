import React from 'react';
import { View, Text, TextInput, Dimensions, StyleSheet } from 'react-native';
import { TransactionCurrencyPicker } from './TransactionCurrencyPicker';

export const ExchangeAmountInput = ({icon, currency, message, isEditable}) => {
    return (
        <View style={styles.layout}>
            <Text style={styles.headerText}>{message}</Text>
            <View style={styles.groupContainer}>
                <TransactionCurrencyPicker currency={currency} icon={icon} iconSize={15} boxSize={33} />
                <View style={{ flex: 0.1 }} />
                <TextInput
                    style={[styles.inputField, { flex: 3 }]}
                    placeholder="Enter your payment amount"
                    inputMode='decimal'
                    editable={isEditable}
                    maxLength={7}
                    selectTextOnFocus
                // onChangeText={(text) => setUsername(text)} 
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        padding: 10
    },
    groupContainer: {
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    
    rowContainer: {
        flex: 1,
        height: 100,
        width: 100,
        borderColor: 'black',
        borderRadius: 10
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 15,
        paddingBottom: 10,
        color: 'gray'
    },
    inputField: {
        flex: 1,
        textAlign: 'right',
        backgroundColor: '#fff',
        borderColor: 'black',
        borderWidth: 1,
        height: 55,
        paddingRight: 10,
        borderRadius: 10
    }
});