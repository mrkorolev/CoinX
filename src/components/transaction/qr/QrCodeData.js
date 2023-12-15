import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from "react-native-qrcode-svg";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppContext } from "../../../config/context/AppContext";

export const QrCodeData = ({ warning, wallet }) => {

    const { theme } = useContext(AppContext);

    return (
        <View style={{ paddingTop: hp('2%') }}>
            <View style={[styles.qr, { borderColor: theme.primaryContentColor }]}>
                <QRCode value={wallet} color={theme.qrInformationColor} backgroundColor={theme.screenBgColor} size={hp('25%')} />
            </View>

            {/*<Text style={[styles.warningStyle, { color: theme.qrInformationColor }]}>*/}
            {/*    {warning}*/}
            {/*</Text>*/}

            <Text style={[styles.warningStyle, { color: theme.primaryContentColor }]}>
                {warning}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    qr: {
        width: hp('32%'),
        height: hp('32%'),
        borderWidth: 5,
        borderRadius: 10,
        // marginVertical: hp('1%'),
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    warningStyle: {
        textAlign: 'center',
        paddingVertical: hp('3%'),
        paddingHorizontal: wp('5%'),
        fontSize: wp('3.5%'),
        fontWeight: 'bold'
    },
});
