import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {ClipboardDocumentCheckIcon, ArrowsRightLeftIcon} from 'react-native-heroicons/solid';

import { QrCode } from '../../../components/transaction/qr/QrCode';
import { TransactionDetail } from '../../../components/transaction/qr/TransactionDetail';

export const QrScreen = () => {

    return (
        <View style={styles.layout}>
            <QrCode warning='Send only BTC to this deposit address. This address does not support deposit of non-fungible token, please go to NFT page to deposit NFT.' />
            
            <View style={{ width: Dimensions.get('window').width, height: 2, backgroundColor: 'lightgray' }} />
            
            <TransactionDetail
                parameter={'Wallet Address'} 
                value={'0x012f3b33633289607040x012f3b336332896070415d17bb30b0b0b896070415d1a15d17bb3'}
                icon={<ClipboardDocumentCheckIcon color='#293462' />} />

            <TransactionDetail
                parameter={'Network'} 
                value={'Tron (TRC20)'} 
                icon={<ArrowsRightLeftIcon color='#293462'/>} />
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    qr: {
        width: 300,
        height: 300,
        borderColor: '#293462',
        borderWidth: 3,
        borderRadius: 20,
        margin: 20,
        alignSelf: 'center'
    },
    qrButton: {
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    qrButtonContainer: {
        backgroundColor: '#293462',
        borderRadius: 10,
        flex: 1,
        margin: 10,
        paddingVertical: 20,
        paddingHorizontal: 30
    }
});