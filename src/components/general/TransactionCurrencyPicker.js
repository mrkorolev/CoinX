import React, {useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronDownIcon } from 'react-native-heroicons/solid';
import { CustomIcon } from './CustomIcon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {AppContext} from "../../global/AppContext";

export const TransactionCurrencyPicker = ({ currencyName, currencyIcon, customWidth, hasBorder, onPressHandler }) => {

    const { theme } = useContext(AppContext);

    return (
        <TouchableOpacity
            style={[styles.layout, { width: customWidth, borderColor: theme.convertInputBorderColor, borderWidth: hasBorder ? 1 : undefined }]}
            onPress={onPressHandler}
            disabled={!onPressHandler}>
                <View style={styles.iconContainer}>
                    <CustomIcon
                        icon={currencyIcon}
                        iconSize={wp('5%')}
                        boxSize={wp('7%')}
                        color={theme.calcCurrencyIconColor}
                        bgColor={theme.calcCurrencyIconBgColor}
                    />
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
        borderRadius: 5,
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
