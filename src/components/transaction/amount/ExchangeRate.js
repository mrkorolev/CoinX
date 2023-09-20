import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

export const ExchangeRate = ({ from, to, rate }) => {
    return (
        <View style={styles.rateContainer}>
            <Text style={[styles.headerText, { fontWeight: 'normal' }]}>Exchange rate</Text>
            <Text style={[styles.headerText, { fontWeight: 'normal' }]}>1 {to} = {rate} {from}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    rateContainer: {
        justifyContent: 'space-between', 
        flexDirection: 'row',
        padding: 10,
    }, 
    headerText: {
        fontWeight: 'bold',
        fontSize: 15,
        paddingBottom: 10,
        color: 'gray'
    }
});