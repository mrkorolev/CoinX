import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const OperationAmount = ({ operation, amount }) => {
    return (
        <View style={styles.layout}>
            <Text style={[styles.basic, { color: 'gray' }]}>{operation}</Text>
            <Text style={[styles.basic, { color: '#293462' }]}>{amount}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        alignItems: 'flex-start',
        gap: 8
    },
    basic: {
        fontSize: 17,
        fontWeight: 'bold'
    }
});