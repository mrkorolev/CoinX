import React, { useContext } from 'react';
import { View, Text, Linking, TouchableOpacity, StyleSheet } from "react-native";
import { AppContext } from "../../config/context/AppContext";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { i18n } from "../../config/localization/i18n";

export const PrivacyPolicyScreen = ({ navigation }) => {

    const { theme } = useContext(AppContext);
    const screen = 'screens.privacy_policy';

    return (
        <View style={[styles.layout, { backgroundColor: theme.screenBgColor, gap: hp('3%') }]}>
            <Text style={{ color: theme.primaryContentColor, fontSize: wp('4%') }}>{i18n.t(`${screen}.message1`)}</Text>
            <Text style={{ color: theme.primaryContentColor, fontSize: wp('4%') }}>{i18n.t(`${screen}.message2`)}</Text>
            <Text style={{ color: theme.primaryContentColor, fontSize: wp('4%') }}>{i18n.t(`${screen}.message3`)}</Text>
            <TouchableOpacity onPress={() => {
                Linking.openURL("https://payone.com.tr/privacy-policy")}}>
                <Text style={{ color: theme.primaryContentColor, fontSize: wp('4%'),  fontWeight: 'bold', textDecorationLine: 'underline' }}>https://payone.com.tr/privacy-policy</Text>
            </TouchableOpacity>
            <View style={{ flex: 0.65 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        padding: wp('5%'),
    }
});
