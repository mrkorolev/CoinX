import React, { useState , useEffect } from 'react';
import {View, StyleSheet, Text} from 'react-native';

import { PrimaryDetails } from '../../components/profile/PrimaryDetails';
import { SecondaryDetails } from '../../components/profile/SecondaryDetails';
import { userProfileVerification } from "../../services/authentication";
import { accessToken } from "../../constants";
import { i18n } from "../../localization/i18n";

export const ProfileScreen = () => {

    const [name, setName] = useState('---');
    const [phone, setPhone] = useState('---');
    const [address, setAddress] = useState('---');
    const [email, setEmail] = useState('---');
    const [commission, setCommission] = useState('---');
    const screen = 'profile';

    // useEffect(async () => {
    //     console.log('Re-render initiated!');
    //     const userData = await userProfileVerification(accessToken);
    //
    //     await setName(userData.name);
    //     await setPhone(userData.phone);
    //     await setEmail(userData.email);
    //     await setAddress(userData.address);
    //     await setCommission(commission);
    // }, []);

    return (
        <View style={styles.layout}>
            <PrimaryDetails name={name} />
            <View style={{ flex: 1, padding: 50 }}>
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
        padding: 10
    },
    group: {
        marginBottom: 20,
        backgroundColor: 'white',
        gap: 5
    },
    key: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#293462'
    },
    value: {
        fontSize: 15,
        color: 'gray'
    }
});
