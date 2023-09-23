import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from "react-native-qrcode-svg";

export const QrCode = ({ warning, wallet }) => {
    return (
        <View>
            <View style={styles.qr}>
                <QRCode wallet={wallet} size={250} />
            </View>
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
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    warningStyle: {
        color: 'gray', 
        textAlign: 'center', 
        padding: 30
    }, 
});