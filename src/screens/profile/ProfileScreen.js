import React, { useState , useEffect } from 'react';
import {View, StyleSheet, Text} from 'react-native';

import { PrimaryDetails } from '../../components/profile/PrimaryDetails';
import { SecondaryDetails } from '../../components/profile/SecondaryDetails';
import {commissionDataRequest, userProfileVerification} from "../../services/authentication";
import { accessToken } from "../../constants";

// Localization:
import { i18n } from "../../localization/i18n";

// Responsiveness:
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const ProfileScreen = () => {

    const [name, setName] = useState('---');
    const [phone, setPhone] = useState('---');
    const [address, setAddress] = useState('---');
    const [email, setEmail] = useState('---');
    const [commission, setCommission] = useState('---');
    const screen = 'screens.profile';

    // useEffect(async () => {
    //     console.log('Re-render initiated!');
    //     const userData = await userProfileVerification(accessToken);
    //     const commissionData = await commissionDataRequest(accessToken);
    //
    //     setName(userData.name);
    //     setPhone(userData.phone);
    //     setEmail(userData.email);
    //     setAddress(userData.address);
    //     setCommission(`${commissionData} %`);
    // }, []);

    return (
        <View style={styles.layout}>
            <PrimaryDetails name={name} />
            <View style={styles.container}>
                <View style={styles.group}>
                    <Text style={styles.key}>{i18n.t(`${screen}.phone_number`)}:</Text>
                    <Text style={styles.value}>{phone}</Text>
                </View>
                <View style={styles.group}>
                    <Text style={styles.key}>{i18n.t(`${screen}.email`)}:</Text>
                    <Text style={styles.value}>{email}</Text>
                </View>
                <View style={styles.group}>
                    <Text style={styles.key}>{i18n.t(`${screen}.address`)}:</Text>
                    <Text style={styles.value}>{address}</Text>
                </View>
                <View style={styles.group}>
                    <Text style={styles.key}>{i18n.t(`${screen}.commission_rate`)}:</Text>
                    <Text style={styles.value}>{commission}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: '#fff',
        padding: wp('2%')
    },
    container: {
        flex: 1,
        paddingHorizontal: wp('13%'),
        paddingVertical: hp('2%'),
        marginBottom: hp('5%')
    },
    group: {
        paddingBottom: hp('2.5%'),
        backgroundColor: 'white',
        gap: hp('1%')
    },
    key: {
        fontSize: wp('5%'),
        fontWeight: 'bold',
        color: '#293462'
    },
    value: {
        fontSize: wp('4%'),
        color: 'gray'
    }
});
