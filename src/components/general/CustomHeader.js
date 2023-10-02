import React from 'react';
import { View, Text, StyleSheet } from "react-native";

export const CustomHeader = ({ title }) => {
    return (
        <View>
            <Text style={styles.screenTitle}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screenTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#293462'
    }
});
