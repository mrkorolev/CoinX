import React from 'react';
import { View, Text, StyleSheet } from "react-native";

export const PrivacyPolicyScreen = () => {
    return (
        <View style={styles.layout}>
            <Text>Welcome to Privacy Policy Screen!</Text>
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
