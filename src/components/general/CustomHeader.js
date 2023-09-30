import React from 'react';
import { View, Text, StyleSheet } from "react-native";

export const CustomHeader = ({ title }) => {
    return (
        <View style={styles.layout}>
            <Text style={styles.screenTitle}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    screenTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#293462'
    }
});
