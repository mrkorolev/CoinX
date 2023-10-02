import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const TransactionDetail = ({ parameter, value, icon, disabled, onPressHandler }) => {
    return (
        <View style={styles.detailsContainer}>
            <View style={styles.detailsLayout}>
                <Text style={styles.detailsTitle}>{parameter}</Text>
                <Text style={styles.detailsData}>{value}</Text>
            </View>
            <View style={{ flex: 0.2 }} />
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
        padding:  20
    },
    detailsLayout: {
        flex: 1,
        justifyContent: 'center',
        gap: 2
    },
    detailsTitle: {
        color: '#293462',
        fontWeight: 'bold',
        fontSize: 16
    },
    detailsData: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 12
    }
});
