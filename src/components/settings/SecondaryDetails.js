import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const SecondaryDetails = ({ data }) => {
    return (
        <View style={styles.group}>
            <Text style={styles.key}>{data[0] + ":"}</Text>
            <Text style={styles.value}>{data[1]}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    group: {
        marginBottom: 20,
        backgroundColor: 'white'
    },
    key: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#293462'
    },
    value: {
        fontSize: 13,
        color: 'gray'
    }
});