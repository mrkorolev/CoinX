import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert, Platform } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { QrCodeData } from '../../components/transaction/qr/QrCodeData';
import { TransactionDetail } from '../../components/transaction/qr/TransactionDetail';
import { i18n } from "../../config/localization/i18n";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomButton } from "../../components/general/components/CustomButton";
import { cancelTransactionRequest } from "../../services/payone";
import { AppContext } from "../../config/context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {faClipboard, faCoins, faDiagramProject, faHashtag} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

export const QrScreen = ({ route, navigation }) => {
    const { theme, accessToken } = useContext(AppContext);
    const [network, setNetwork] = useState('');
    const [referenceNo, setReferenceNo] = useState('');
    const [startDate, setStartDate] = useState('');
    const [hasResponse, setHasResponse] = useState(true);
    const [clipboardText, setClipboardText] = useState('');
    const { cryptoAmount, cryptoCurrency, walletData, networkData, startTime, referenceNumber, walletVisible } = route.params;
    const screen = 'screens.qr_code';

    const qrDisabledHandler = () => !(hasResponse);

    useEffect(() => {
        setNetwork(networkData);
        setStartDate(startTime);
        setReferenceNo(referenceNumber);
    }, []);

    return (
        <View style={[styles.layout, { backgroundColor: theme.screenBgColor }]}>
            <QrCodeData
                wallet={walletData}
                warning={i18n.t(`${screen}.warning`)} />

            <View style={styles.separator} />

            <View style={{ gap: hp(Platform.OS === 'ios' ? '1.5%' : '1%') }}>
                <View style={styles.detailsContainer}>

                    <TransactionDetail
                        parameter={i18n.t(`${screen}.transaction_amount`)}
                        value={`${cryptoAmount} ${cryptoCurrency}`}
                        icon={<FontAwesomeIcon size={wp('5.5%')} icon={faCoins} color={theme.helperIconColor} />} />

                    <TransactionDetail
                        parameter={i18n.t(`${screen}.reference_number`)}
                        value={`#${referenceNo}`}
                        icon={<FontAwesomeIcon size={wp('5.5%')} icon={faHashtag} color={theme.helperIconColor} />} />

                    <TransactionDetail
                        parameter={i18n.t(`${screen}.start_time`)}
                        value={startDate}
                        icon={<FontAwesomeIcon size={wp('5.5%')} icon={faClock} color={theme.helperIconColor} />} />

                    <TransactionDetail
                        parameter={i18n.t(`${screen}.network`)}
                        value={network}
                        icon={<FontAwesomeIcon size={wp('5.5%')} icon={faDiagramProject} color={theme.helperIconColor} />} />

                    {
                        walletVisible ?
                            <TransactionDetail selectable
                                parameter={i18n.t(`${screen}.wallet_address`)}
                                value={walletData}
                                icon={
                                    <TouchableOpacity
                                        onPress={async () => {
                                            await Clipboard.setStringAsync(walletData);
                                            // Should make the text visible here!
                                            setClipboardText(i18n.t(`${screen}.clipboard_message`))
                                            setTimeout(() => {
                                                setClipboardText('');
                                            }, 2000)

                                            // console.log('Clipboard set to: ' + walletData);
                                        }}>
                                        <FontAwesomeIcon size={wp('5.5%')} icon={faClipboard} color={theme.helperIconColor} />
                                    </TouchableOpacity>
                                } /> :
                            <TransactionDetail parameter={undefined} value={undefined} icon={undefined} />
                    }
                </View>

                <Text style={[styles.clipboard, { color: theme.primaryContentColor }]}>{clipboardText}</Text>

                <View style={styles.cancelButtonContainer}>
                    <CustomButton
                        isDisabled={qrDisabledHandler()}
                        textColor={theme.cancelBtnTextColor}
                        bgColor={theme.cancelBtnBgColor}
                        borderColor={theme.cancelBtnBorderColor}
                        text={i18n.t(`${screen}.cancel_title`)}
                        onPress={async () => {
                            setHasResponse(false);
                            Alert.alert(i18n.t(`${screen}.warning_title`), i18n.t(`${screen}.warning_message`), [{
                                text: i18n.t(`${screen}.deny_message`),
                                style: 'default',
                                onPress: () => {
                                    // console.log('Not cancelling current transaction!');
                                    setHasResponse(true);
                                }
                            },
                                {
                                    text: i18n.t(`${screen}.confirm_message`),
                                    style: 'destructive',
                                    onPress: async () => {

                                        const cancelStatus = await cancelTransactionRequest(accessToken, walletData);
                                        if(cancelStatus){
                                            Alert.alert(i18n.t(`${screen}.cancel_success_title`), i18n.t(`${screen}.cancel_success_message`));
                                            navigation.goBack();
                                        }
                                        setHasResponse(true);

                                        // DEBUG:
                                        // navigation.goBack();
                                    }
                                }]);
                        }} />
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center'
    },
    separator: {
        width: Dimensions.get('window').width,
        height: hp('0.25%'),
        backgroundColor: 'lightgray',
        alignItems: 'center',
        marginVertical: hp('1%')
    },
    clipboard: {
        height: hp('2.5%'),
        alignSelf: 'center',
        fontSize: wp('3.5%'),
        paddingRight: wp('2%')
    },
    cancelButtonContainer: {
        paddingHorizontal: wp('5%'),
        paddingBottom: hp('2%')
    },
    detailsContainer: {
        gap: hp('1.5%'),
        paddingVertical: hp('0.5%'),
        paddingHorizontal: wp('5%')
    }
});
