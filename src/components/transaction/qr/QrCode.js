import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const QrCode = ({ warning }) => {
    return (
        <View>
            <View style={styles.qr} />
            <Text style={styles.warningStyle}>
                {warning}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    qr: {
        width: 300,
        height: 300,
        borderColor: '#293462',
        borderWidth: 3,
        borderRadius: 20,
        margin: 20,
        alignSelf: 'center'
    }, 
    warningStyle: {
        color: 'gray', 
        textAlign: 'center', 
        padding: 30
    }, 
});