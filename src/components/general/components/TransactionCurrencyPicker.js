import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AppContext } from "../../../config/context/AppContext";

export const TransactionCurrencyPicker = ({ currencyName, currencyIcon, customStyle, hasBorder, onPressHandler, disabled }) => {

    const { theme } = useContext(AppContext);

    return (
        <TouchableOpacity
            style={[styles.layout, customStyle, { borderColor: theme.convertInputBorderColor, borderWidth: hasBorder ? 1 : undefined }]}
            onPress={onPressHandler}
            disabled={disabled}>
                <View style={styles.iconContainer}>
                    {currencyIcon}
                    <Text style={[styles.currency, { color: theme.primaryContentColor }]}>{currencyName}</Text>
                </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    layout: {
        height: hp('7%'),
        paddingHorizontal: wp('3%'),
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: wp('2%')
    },
    currency: {
        fontWeight: 'bold',
        fontSize: wp('3%')
    }
});
