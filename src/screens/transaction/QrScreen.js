import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Alert, Platform } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { QrCode } from '../../components/transaction/qr/QrCode';
import { TransactionDetail } from '../../components/transaction/qr/TransactionDetail';
import { i18n } from "../../config/localization/i18n";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomButton } from "../../components/general/components/CustomButton";
import { cancelTransactionRequest } from "../../services/payone";
import { AppContext } from "../../config/context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {faArrowRightArrowLeft, faClipboard, faDiagramProject, faHashtag} from "@fortawesome/free-solid-svg-icons";
import {faClock, faFileLines} from "@fortawesome/free-regular-svg-icons";
import Plaftorm from "expo-modules-core/src/Platform";

export const QrScreen = ({ route, navigation }) => {
    const { theme, accessToken } = useContext(AppContext);
    const screen = 'screens.qr_code';

    const [walletAddress, setWalletAddress] = useState('');
    const [network, setNetwork] = useState('');
    const [referenceNo, setReferenceNo] = useState('');
    const [startDate, setStartDate] = useState('');
    // const [status, setStatus] = useState();
    const [hasResponse, setHasResponse] = useState(true);
    const { walletData, networkData, startTime, referenceNumber, depositStatus } = route.params;

    const qrDisabledHandler = () => !(hasResponse);

    useEffect(() => {
        setWalletAddress(walletData);
        setNetwork(networkData);
        setStartDate(startTime);
        setReferenceNo(referenceNumber);
        // setStatus(depositStatus);
    }, []);

    return (
        <View style={[styles.layout, { backgroundColor: theme.screenBgColor }]}>
            <QrCode
                wallet={walletAddress}
                warning={i18n.t(`${screen}.warning`)} />

            <View style={styles.separator} />

            <View style={{ gap: hp(Platform.OS === 'ios' ? '7%' : '2%') }}>
                <View style={styles.detailsContainer}>

                    <TransactionDetail
                        parameter={i18n.t(`${screen}.reference_number`)}
                        value={`#${referenceNo}`}
                        icon={<FontAwesomeIcon size={wp('5.5%')} icon={faHashtag} color={theme.helperIconColor} />} />

                    <TransactionDetail
                        parameter={i18n.t(`${screen}.start_time`)}
                        value={startDate}
                        icon={
                            <FontAwesomeIcon size={wp('5.5%')} icon={faClock} color={theme.helperIconColor} />
                        } />

                    <TransactionDetail
                        parameter={i18n.t(`${screen}.network`)}
                        value={network}
                        icon={<FontAwesomeIcon size={wp('5.5%')} icon={faDiagramProject} color={theme.helperIconColor} />} />

                    {
                        walletAddress ?
                            <TransactionDetail
                                parameter={i18n.t(`${screen}.wallet_address`)}
                                value={walletAddress}
                                icon={
                                    <TouchableOpacity
                                        onPress={async () => {
                                            await Clipboard.setStringAsync(walletAddress);
                                            console.log('Clipboard set to: ' + walletAddress);
                                        }}>
                                        <FontAwesomeIcon size={wp('5.5%')} icon={faClipboard} color={theme.helperIconColor} />
                                    </TouchableOpacity>
                                } /> :
                            <TransactionDetail parameter={undefined} value={undefined} icon={undefined} />
                    }
                </View>

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
                                    console.log('Not cancelling current transaction!');
                                    setHasResponse(true);
                                }
                            },
                                {
                                    text: i18n.t(`${screen}.confirm_message`),
                                    style: 'destructive',
                                    onPress: async () => {

                                        const cancelStatus = await cancelTransactionRequest(accessToken, walletAddress);
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
    cancelButtonContainer: {
        paddingHorizontal: wp('5%'),
    },
    detailsContainer: {
        gap: hp('1.5%'),
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('5%')
    }
});
