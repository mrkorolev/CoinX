import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { QrCode } from '../../components/transaction/qr/QrCode';
import { TransactionDetail } from '../../components/transaction/qr/TransactionDetail';
import { i18n } from "../../config/localization/i18n";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomButton } from "../../components/general/components/CustomButton";
import { cancelTransactionRequest } from "../../services/payone";
import { AppContext } from "../../config/context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRightArrowLeft, faFileLines } from "@fortawesome/free-solid-svg-icons";

export const QrScreen = ({ route, navigation }) => {
    const { theme, accessToken } = useContext(AppContext);
    const screen = 'screens.qr_code';

    const [walletAddress, setWalletAddress] = useState('');
    const [network, setNetwork] = useState('');
    // const [status, setStatus] = useState();
    const [hasResponse, setHasResponse] = useState(true);
    const { walletData, networkData, depositStatus } = route.params;

    const qrDisabledHandler = () => !(hasResponse);

    useEffect(() => {
        setWalletAddress(walletData);
        setNetwork(networkData);
        // setStatus(depositStatus);
    }, []);

    return (
        <View style={[styles.layout, { backgroundColor: theme.screenBgColor }]}>
            <QrCode
                wallet={walletAddress}
                warning={i18n.t(`${screen}.warning`)} />

            <View style={styles.separator} />

            <View style={{ paddingBottom: hp('3') }}>
                <TransactionDetail
                    parameter={i18n.t(`${screen}.wallet_address`)}
                    value={walletAddress}
                    icon={<FontAwesomeIcon size={wp('5.5%')} icon={faFileLines} color={theme.helperIconColor} />}
                    onPressHandler={async () => {
                        await Clipboard.setStringAsync(walletAddress);
                        console.log('Clipboard set to: ' + walletAddress);
                    }}
                    disabled={false} />

                <TransactionDetail
                    parameter={i18n.t(`${screen}.network`)}
                    value={network}
                    icon={<FontAwesomeIcon size={wp('5.5%')} icon={faArrowRightArrowLeft} color={theme.helperIconColor} />}
                    disabled={true} />
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
                                        alert('Successfully cancelled transaction!');
                                        navigation.goBack();
                                    }

                                    // DEBUG:
                                    navigation.goBack();
                                    setHasResponse(true);
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
        flex: 0.7,
        paddingHorizontal: wp('5%')
    }
});