import React from "react";

import { useNavigation } from "@react-navigation/native";
import { SuccessfulOperation } from "../../components/success/SuccessfulOperation";
import { CheckBadgeIcon } from "react-native-heroicons/solid";
import { i18n } from "../../localization/i18n";
import {StyleSheet, Text, View} from "react-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const SuccessScreen = () => {
    const nav = useNavigation();
    const screen = 'screens.success';

    setTimeout(() => {
        nav.navigate('Main');
    }, 1000);

    return (
        <View style={styles.layout}>
            <CheckBadgeIcon color='#293462' size={wp('40%')}/>
            <View style={styles.container}>
                <Text style={styles.title}>{i18n.t(`${screen}.title`)}</Text>
                <Text style={styles.message}>{i18n.t(`${screen}.secondary_text`)}</Text>
            </View>
            <View style={{ flex: 0.3 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    container: {
        gap: hp('1.5%'),
        paddingVertical: hp('2%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: wp('7%'),
        color: '#293462',
        fontWeight: 'bold'
    },
    message: {
        fontSize: wp('5%'),
        color: 'gray',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: wp('10%')
    }
});




