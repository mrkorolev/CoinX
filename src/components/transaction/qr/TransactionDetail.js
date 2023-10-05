import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const TransactionDetail = ({ parameter, value, icon, disabled, onPressHandler }) => {
    return (
        <View style={styles.detailsContainer}>
            <View style={styles.detailsLayout}>
                <Text style={styles.detailsTitle}>{parameter}</Text>
                <Text style={styles.detailsData}>{value}</Text>
            </View>
            <View style={{ flex: 0.15 }} />
            <TouchableOpacity
                onPress={onPressHandler}
                disabled={disabled}>
                {icon}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    detailsContainer: {
        flexDirection: 'row',
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('5%')
    },
    detailsLayout: {
        flex: 1,
        justifyContent: 'center',
        gap: hp('0.25%')
    },
    detailsTitle: {
        color: '#293462',
        fontWeight: 'bold',
        fontSize: wp('3.5%')
    },
    detailsData: {
        color: 'gray',
        fontSize: wp('3%')
    }
});
