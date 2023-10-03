import React, { useState } from 'react';
import { View, Text, TextInput, Dimensions, StyleSheet } from 'react-native';
import { TransactionCurrencyPicker } from './TransactionCurrencyPicker';
import { Dropdown } from 'react-native-element-dropdown';
import {CustomDropdown} from "../../general/CustomDropdown";

// Responsiveness:
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// height: hp('7%'),
export const ExchangeAmountInput = ({operation, icon, options, chosenValue, handler, onChangeAmount, placeholder, isEditable, value, textColor }) => {

    return (
        <View style={styles.colContainer}>
            <Text style={styles.headerText}>{operation}</Text>
            <View style={styles.rowContainer}>
                <CustomDropdown
                    data={options}
                    value={chosenValue}
                    onChangeHandler={handler}
                    borderWidth={1}/>

                <TextInput
                    style={[styles.inputField, {color: textColor}]}
                    placeholder={placeholder ? placeholder : ''}
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
    colContainer: {

    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('1%')
    },
    headerText: {
        fontWeight: 'bold',
        color: 'gray',
        fontSize: 15,
        paddingBottom: hp('1.5%')
    },
    inputField: {
        textAlign: 'right',
        fontWeight: 'bold',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        height: 55,
        width: wp('72%'),
        paddingRight: 15,
        borderRadius: 5
    }
});
