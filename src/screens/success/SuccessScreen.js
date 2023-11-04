import React, {useContext} from "react";

import { useNavigation } from "@react-navigation/native";
import { CheckBadgeIcon } from "react-native-heroicons/solid";
import { i18n } from "../../config/localization/i18n";
import {StyleSheet, Text, View} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {AppContext} from "../../config/context/AppContext";

export const SuccessScreen = ({ navigation }) => {
    const { theme } = useContext(AppContext);
    const screen = 'screens.success';

    setTimeout(() => {
        navigation.navigate('Main');
    }, 1000);

    return (
        <View style={[styles.layout, { backgroundColor: theme.screenBgColor }]}>
            <CheckBadgeIcon color={theme.supportIconColor} size={wp('40%')}/>
            <View style={styles.container}>
                <Text style={[styles.title, { color: theme.primaryContentColor}]}>{i18n.t(`${screen}.title`)}</Text>
                <Text style={[styles.message, { color: theme.secondaryContentColor }]}>{i18n.t(`${screen}.secondary_text`)}</Text>
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
    },
    container: {
        gap: hp('1.5%'),
        paddingVertical: hp('2%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: wp('7%'),
        fontWeight: 'bold'
    },
    message: {
        fontSize: wp('5%'),
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: wp('10%')
    }
});




