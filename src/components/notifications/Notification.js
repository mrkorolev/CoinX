import React, {useContext} from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import { faClock, faCircleXmark, faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import {AppContext} from "../../global/AppContext";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export const Notification = ({ notification, navigation }) => {

    const { theme } = useContext(AppContext);
    const date = new Date(parseInt(notification.start_timestamp) * 1000);

    let backgroundStatus;
    let icon;

    switch(notification.transaction_status){
        case -1:
            backgroundStatus = `${theme.depositBgCancel}`;
            icon = faCircleXmark;
            break;
        case 0:
            backgroundStatus = `${theme.depositBgPending}`;
            icon = faClock
            break;
        case 1:
            backgroundStatus = `${theme.depositBgSuccess}`
            icon = faCircleCheck
            break;
    }

    const formatInput = (input) => input < 10 ? `0${input}` : input
    return (
        <View>
            <TouchableOpacity
                disabled={notification.transaction_status !== 0}
                style={[styles.container, {backgroundColor: `${backgroundStatus}`}]}
                onPress={() => navigation.navigate('QR_HISTORY', {
                    walletData: notification.address,
                    networkData: `${notification.network}`,
                    depositStatus: notification.transaction_status
                })}>
                <FontAwesomeIcon size={wp('6%')} icon={icon} color={theme.primaryContentColor} />
                <View style={styles.statusMessageContainer}>
                    <Text style={[styles.primaryText, { color: theme.primaryContentColor }]}>{`${notification.expected_crypto} ${notification.coin}`}</Text>
                    <Text style={[styles.secondaryText, { color: theme.primaryContentColor } ]}>{`Network: ${notification.network}`}</Text>
                </View>
                <View style={[styles.statusMessageContainer, { alignItems: 'flex-end' }]}>
                    <Text style={[styles.secondaryText, { color: theme.primaryContentColor }]}>{formatInput(date.getDate())}/{formatInput(date.getMonth())}/{formatInput(date.getFullYear())}</Text>
                    <Text style={[styles.secondaryText, { color: theme.primaryContentColor } ]}>{formatInput(date.getHours())}:{formatInput(date.getMinutes())}</Text>
                </View>
            </TouchableOpacity>
            <View style={[styles.itemSeparator, { backgroundColor: theme.secondaryContentColor }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('6%'),
        gap: wp('7%'),
        // width: Dimensions.get('window').width
    },
    statusMessageContainer: {
        flex: 1,
        alignItems: 'flex-start',
        gap: hp('0.7%')
    },
    primaryText: {
        fontSize: wp('3.5%'),
        fontWeight: 'bold'
    },
    secondaryText: {
        fontSize: wp('3%')
    },
    itemSeparator: {
        width: Dimensions.get('window').width,
        height: hp('0.03%')
    }
});
