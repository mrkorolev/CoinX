import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, Dimensions, Alert} from 'react-native';
import { ClipboardDocumentCheckIcon, ArrowsRightLeftIcon } from 'react-native-heroicons/solid';
import * as Clipboard from 'expo-clipboard';
import { QrCode } from '../../../components/transaction/qr/QrCode';
import { TransactionDetail } from '../../../components/transaction/qr/TransactionDetail';
import { i18n } from "../../../localization/i18n";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {CustomButton} from "../../../components/general/CustomButton";
import {cancelTransactionRequest} from "../../../services/authentication";
import {accessToken} from "../../../constants";
import {AppContext} from "../../../global/AppContext";

export const QrScreen = ({ route, navigation }) => {

    const { theme } = useContext(AppContext);
    const screen = 'screens.qr_code';

    const [walletAddress, setWalletAddress] = useState('');
    const [network, setNetwork] = useState('');

    const { walletData, networkData } = route.params;


    useEffect(() => {
        setWalletAddress(walletData);
        setNetwork(networkData);
    }, []);

    return (
        <View style={[styles.layout, { backgroundColor: theme.screenBgColor }]}>
            <QrCode
                wallet={walletAddress}
                warning={i18n.t(`${screen}.warning`)} />

            <View style={styles.separator} />

            <TransactionDetail
                parameter={i18n.t(`${screen}.wallet_address`)}
                value={walletAddress}
                icon={<ClipboardDocumentCheckIcon color={theme.helperIconColor} />}
                onPressHandler={async () => {
                    await Clipboard.setStringAsync(walletAddress);
                    console.log('Clipboard set to: ' + walletAddress);
                }}
                disabled={false} />

            <TransactionDetail
                parameter={i18n.t(`${screen}.network`)}
                value={network}
                icon={<ArrowsRightLeftIcon color={theme.helperIconColor} />}
                disabled={true} />

            <View style={styles.cancelButtonContainer}>
                <CustomButton
                    textColor={theme.cancelBtnTextColor}
                    bgColor={theme.cancelBtnBgColor}
                    borderColor={theme.cancelBtnBorderColor}
                    text='Cancel Transaction'
                    onPress={async () => {
                    Alert.alert('Cancel Transaction', 'Are you sure you want to cancel this transaction?', [{
                        text: 'No',
                        style: 'default',
                        onPress: () => {
                            console.log('Not cancelling current transaction!');
                        }
                    },
                        {
                            text: 'Confirm',
                            style: 'destructive',
                            onPress: async () => {
                                const cancelStatus = await cancelTransactionRequest(accessToken, walletAddress);

                                if(cancelStatus){
                                    alert('Successfully cancelled transaction!');
                                    navigation.goBack();
                                }
                            }
                        }]);
                }} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        // padding: wp('5%')
    },
    separator: {
        width: Dimensions.get('window').width,
        height: hp('0.25%'),
        backgroundColor: 'lightgray',
        alignItems: 'center',
        marginVertical: hp('2%')
    },
    cancelButtonContainer: {
        flex: 1,
        paddingHorizontal: wp('5%')
    }
});
