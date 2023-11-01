import React, {useContext, useState} from 'react';
import {View, Text, TextInput, StyleSheet, Keyboard} from 'react-native';
import { TransactionCurrencyPicker } from '../../general/components/TransactionCurrencyPicker';

// Responsiveness:
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {AppContext} from "../../../global/AppContext";
import {CustomIcon} from "../../general/components/CustomIcon";

export const ExchangeAmountInput = ({ operation, chosenCurrencyName, isNetwork, pickerDisabled, chosenCurrencyIcon, onPressHandler, onChangeAmount, placeholder, isEditable, value, textColor }) => {
    const { theme } = useContext(AppContext);
    return (
        <View>
            <Text style={[styles.headerText, { color: theme.secondaryContentColor }]}>{operation}</Text>
            <View style={styles.rowContainer}>

                <TransactionCurrencyPicker
                    disabled={pickerDisabled}
                    customStyle={{ flex: 1 }}
                    currencyName={chosenCurrencyName}
                    currencyIcon={chosenCurrencyIcon}
                    onPressHandler={onPressHandler}
                    hasBorder
                />

                { isNetwork ? null :
                    <TextInput
                        style={[styles.inputField, {color: textColor, backgroundColor: theme.screenBgColor, borderColor: theme.convertInputBorderColor}]}
                        placeholder={placeholder ? placeholder : ''}
                        placeholderTextColor={theme.placeholderTextColor}
                        fontSize={wp('3.5%')}
                        keyboardType='number-pad'
                        returnKeyType='done'
                        onChangeText={onChangeAmount}
                        value={value}
                        editable={isEditable}
                        maxLength={10}
                        selectTextOnFocus
                    />
                }

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
        fontSize: wp('3.5%'),
        paddingBottom: hp('1.5%')
    },
    inputField: {
        textAlign: 'right',
        fontWeight: 'bold',
        borderWidth: 1,
        height: hp('7%'),
        width: wp('63%'),
        paddingRight: wp('3%'),
        borderRadius: 5
    }
});
