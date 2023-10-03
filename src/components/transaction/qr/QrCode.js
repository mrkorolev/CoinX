import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from "react-native-qrcode-svg";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const QrCode = ({ warning, wallet }) => {
    return (
        <View>
            <View style={styles.qr}>
                <QRCode wallet={wallet} size={wp('60%')} />
            </View>
            <Text style={styles.warningStyle}>
                {warning}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    qr: {
        width: wp('75%'),
        height: wp('75%'),
        borderColor: '#293462',
        borderWidth: 5,
        borderRadius: 10,
        marginBottom: hp('1%'),
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    warningStyle: {
        color: 'gray',
        textAlign: 'center',
        padding: wp('5%')
    },
});
