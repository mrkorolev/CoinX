import React, { useState } from 'react';
import { View, Text, TextInput, Dimensions, StyleSheet } from 'react-native';
import { TransactionCurrencyPicker } from './TransactionCurrencyPicker';
import { Dropdown } from 'react-native-element-dropdown';
import {CustomDropdown} from "../../general/CustomDropdown";

export const ExchangeAmountInput = ({operation, icon, options, chosenValue, handler, onChangeAmount, placeholder, isEditable, value, textColor }) => {

    return (
        <View style={styles.layout}>
            <Text style={styles.headerText}>{operation}</Text>
            <View style={styles.groupContainer}>
                {/* <TransactionCurrencyPicker currency={currency} icon={icon} iconSize={15} boxSize={33} /> */}
                <CustomDropdown
                    data={options}
                    value={chosenValue}
                    onChangeHandler={handler}
                    borderWidth={1}/>

                <View style={{ flex: 0.1 }} />

                <TextInput
                    style={[styles.inputField, {color: textColor}]}
                    placeholder={placeholder ? placeholder : ''}
                    keyboardType='decimal-pad'
                    returnKeyType='done'
                    onChangeText={onChangeAmount}
                    value={value}
                    editable={isEditable}
                    maxLength={7}
                    selectTextOnFocus

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
        flex: 3,
        textAlign: 'right',
        fontWeight: 'bold',
        backgroundColor: '#fff',
        borderColor: 'black',
        borderWidth: 1,
        height: 55,
        paddingRight: 15,
        borderRadius: 10
    }
});