import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { TransactionCurrencyPicker } from '../../general/TransactionCurrencyPicker';

// Responsiveness:
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const ExchangeAmountInput = ({ operation, chosenCurrencyName, chosenCurrencyIcon, onPressHandler, onChangeAmount, placeholder, isEditable, value, textColor }) => {

    return (
        <View>
            <Text style={styles.headerText}>{operation}</Text>
            <View style={styles.rowContainer}>

                <TransactionCurrencyPicker
                    currencyName={chosenCurrencyName}
                    currencyIcon={chosenCurrencyIcon}
                    onPressHandler={onPressHandler}
                />

                <TextInput
                    style={[styles.inputField, {color: textColor}]}
                    placeholder={placeholder ? placeholder : ''}
                    fontSize={wp('3.5%')}
                    keyboardType='number-pad'
                    returnKeyType='done'
                    onChangeText={onChangeAmount}
                    value={value}
                    editable={isEditable}
                    maxLength={10}
                    selectTextOnFocus
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('2%')
    },
    headerText: {
        fontWeight: 'bold',
        color: 'gray',
        fontSize: wp('3.5%'),
        paddingBottom: hp('1.5%')
    },
    inputField: {
        textAlign: 'right',
        fontWeight: 'bold',
        backgroundColor: 'whitesmoke',
        borderColor: 'black',
        borderWidth: 1,
        height: hp('7%'),
        width: wp('63%'),
        paddingRight: wp('3%'),
        borderRadius: 5
    }
});
