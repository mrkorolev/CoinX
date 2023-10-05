import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronDownIcon } from 'react-native-heroicons/solid';
import { CustomIcon } from './CustomIcon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const TransactionCurrencyPicker = ({ currencyName, currencyIcon, onPressHandler }) => {
    return (
        <TouchableOpacity style={styles.layout} onPress={onPressHandler} disabled={!onPressHandler}>
                <View style={styles.iconContainer}>
                    <CustomIcon icon={currencyIcon} iconSize={wp('5%')} boxSize={wp('7%')} />
                    <Text style={styles.currency}>{currencyName}</Text>
                </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    layout: {
        height: hp('7%'),
        width: wp('25%'),
        paddingHorizontal: wp('3%'),
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: wp('2%')
    },
    currency: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: wp('3%')
    }
});
