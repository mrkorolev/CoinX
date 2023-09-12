import React from "react";
import { View, Text, StyleSheet } from 'react-native';

export const SuccessScreen = ({ icon, mainText, otherText }) => {

    return (
        <View style={styles.container}>
            {icon}
            <View style={styles.layout}>
                <Text style={styles.mainText}>{mainText}</Text>
                <Text style={styles.otherText}>{otherText}</Text>
            </View>
            <View style={{ flex: 0.3 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    layout: {
        gap: 20, 
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainText: {
        fontSize: 28,
        color: '#293462',
        fontWeight: 'bold'
    },
    otherText: {
        fontSize: 18,
        color: 'gray',
        fontWeight: 'bold',
        textAlign: 'center', 
        paddingHorizontal: 20, 
        lineHeight: 25  
    }

});
