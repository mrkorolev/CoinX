import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronDownIcon } from 'react-native-heroicons/solid'; 

export const CurrencyPicker = ({ currency }) => {
    return (
        <TouchableOpacity style={styles.layout}>
            <ChevronDownIcon color='#293462'/>
            <Text style={styles.currency}>{currency}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    layout: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    }, 
    currency: {
        color: '#293462',
        fontWeight: 'bold',
        fontSize: 15
    }
});