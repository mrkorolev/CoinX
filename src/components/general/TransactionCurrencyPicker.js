import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronDownIcon } from 'react-native-heroicons/solid';
import { CustomIcon } from './CustomIcon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const TransactionCurrencyPicker = ({ currencyName, currencyIcon, onPressHandler }) => {
    return (
        <TouchableOpacity style={styles.layout} onPress={onPressHandler}>
                <View style={styles.iconContainer}>
                    <CustomIcon icon={currencyIcon} iconSize={20} boxSize={30} />
                    <Text style={styles.currency}>{currencyName}</Text>
                </View>
                <ChevronDownIcon color='#293462' />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    layout: {
        height: hp('7%'),
        width: wp('25%'),
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3
    },
    currency: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 12
    }
});
