import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from "react-native-qrcode-svg";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppContext } from "../../../config/context/AppContext";

export const QrCodeData = ({ warning, wallet }) => {

    const { theme } = useContext(AppContext);

    return (
        <View>
            <View style={[styles.qr, { borderColor: theme.primaryContentColor }]}>
                <QRCode value={wallet} color={theme.qrInformationColor} backgroundColor={theme.screenBgColor} size={wp('50%')} />
            </View>

            <Text style={[styles.warningStyle, { color: theme.qrInformationColor }]}>
                {warning}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    qr: {
        width: wp('65%'),
        height: wp('65%'),
        borderWidth: 5,
        borderRadius: 10,
        // marginVertical: hp('1%'),
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    warningStyle: {
        textAlign: 'center',
        padding: wp('5%'),
        fontSize: wp('3.5%'),
        fontWeight: 'bold'
    },
});
