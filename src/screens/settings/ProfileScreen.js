import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import { PrimaryDetails } from '../../components/settings/PrimaryDetails';
import { SecondaryDetails } from '../../components/settings/SecondaryDetails';
import {commissionDataRequest, userProfileVerification} from "../../services/authentication";
import { accessToken } from "../../constants";

// Localization:
import { i18n } from "../../localization/i18n";

// Responsiveness:
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {CustomButton} from "../../components/general/CustomButton";
import {AppContext} from "../../global/AppContext";

export const ProfileScreen = ({ route, navigation }) => {
    const { theme, setAccessToken } = useContext(AppContext);
    const screen = 'screens.profile';
    const { name, phone, email, address, commission } = route.params;

    // useEffect(() => {
    //     navigation.getParent()?.setOptions({
    //         tabBarStyle: {
    //             display: 'none',
    //             backgroundColor: theme.screenBgColor
    //         },
    //         tabBarVisible: false });
    //     return () => navigation.getParent()?.setOptions({
    //         tabBarStyle: undefined,
    //         tabBarVisible: undefined, });
    // }, [navigation]);

    return (
        <View style={[styles.layout, { backgroundColor: theme.screenBgColor }]}>
            <PrimaryDetails name={name} />
            <View style={styles.container}>
                <View>
                    <View style={styles.group}>
                        <Text style={[styles.key, { color: theme.primaryContentColor }]}>{i18n.t(`${screen}.phone_number`)}:</Text>
                        <Text style={[styles.value, { color: theme.secondaryContentColor }]}>{phone}</Text>
                    </View>
                    <View style={styles.group}>
                        <Text style={[styles.key, { color: theme.primaryContentColor }]}>{i18n.t(`${screen}.email`)}:</Text>
                        <Text style={[styles.value, { color: theme.secondaryContentColor }]}>{email}</Text>
                    </View>
                    <View style={styles.group}>
                        <Text style={[styles.key, { color: theme.primaryContentColor }]}>{i18n.t(`${screen}.address`)}:</Text>
                        <Text style={[styles.value, { color: theme.secondaryContentColor }]}>{address}</Text>
                    </View>
                    <View style={styles.group}>
                        <Text style={[styles.key, { color: theme.primaryContentColor }]}>{i18n.t(`${screen}.commission_rate`)}:</Text>
                        <Text style={[styles.value, { color: theme.secondaryContentColor }]}>{`${commission} %`}</Text>
                    </View>
                </View>

                {/* CRUCIAL CHANGE REQUIRED - the auth flow model is not decided upon! */}
                    <CustomButton
                        textColor={theme.mainBtnTextColor}
                        bgColor={theme.mainBtnBgColor}
                        borderColor={theme.mainBtnBorderColor}
                        text={i18n.t(`${screen}.logout_title`)}
                        onPress={() => {
                            setAccessToken(undefined);
                            navigation.navigate('Login')
                        }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        padding: wp('2%')
    },
    container: {
        flex: 1,
        paddingHorizontal: wp('7%'),
        paddingBottom: hp('2%'),
        marginBottom: hp('15%'),
        gap: hp('12%')

    },
    group: {
        paddingBottom: hp('1.5%'),
    },
    key: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
        color: '#293462'
    },
    value: {
        fontSize: wp('3.5%'),
        color: 'gray'
    }
});
