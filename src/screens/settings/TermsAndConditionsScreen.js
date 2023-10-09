import React from 'react';
import { View, Text, StyleSheet } from "react-native";

export const TermsAndConditionsScreen = () => {
    return (
        <View style={styles.layout}>
            <Text>Welcome to Terms and Conditions Screen!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: 'whitesmoke',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
