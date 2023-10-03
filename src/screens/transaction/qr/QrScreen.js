import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ClipboardDocumentCheckIcon, ArrowsRightLeftIcon } from 'react-native-heroicons/solid';
import * as Clipboard from 'expo-clipboard';
import { QrCode } from '../../../components/transaction/qr/QrCode';
import { TransactionDetail } from '../../../components/transaction/qr/TransactionDetail';
import { i18n } from "../../../localization/i18n";

// Responsiveness:
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const QrScreen = ({ route }) => {
    const [wallet, setWallet] = useState('');
    const [network, setNetwork] = useState('');
    const { walletData, networkData } = route.params;
    const screen = 'screens.qr_code';

    useEffect(() => {
        setWallet(walletData);
        setNetwork(networkData);
    }, []);

    return (
        <View style={styles.layout}>
            <QrCode
                wallet={wallet}
                warning={i18n.t(`${screen}.warning`)} />

            <View style={styles.separator} />

            <TransactionDetail
                parameter={i18n.t(`${screen}.wallet_address`)}
                value={wallet}
                icon={<ClipboardDocumentCheckIcon color='#293462' />}
                onPressHandler={async () => {
                    await Clipboard.setStringAsync(wallet);
                    console.log('Clipboard set to: ' + wallet);
                }}
                disabled={false} />

            <TransactionDetail
                parameter={i18n.t(`${screen}.network`)}
                value={network}
                icon={<ArrowsRightLeftIcon color='#293462' />}
                disabled={true} />
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        // padding: wp('3%')
    },
    separator: {
        width: Dimensions.get('window').width,
        height: wp('0.5%'),
        backgroundColor: 'lightgray',
        alignItems: 'center',
        marginVertical: hp('2%')
    }
});
