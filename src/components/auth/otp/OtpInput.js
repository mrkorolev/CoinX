import React from "react"
import { View, Text, StyleSheet } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const OtpInput = ({ value, focused }) => {
    return (
        <View style={[styles.container, focused && {borderColor: '#22DCE0', backgroundColor: 'white'}]}>
            <Text style={styles.value}>
                {value}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#E8ECF4',
        backgroundColor: '#F7F8F9',
        minWidth: wp('12%'),
        minHeight: hp('8%'),
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        justifyContent: 'center',
    },
    value: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#293462'
    }
});