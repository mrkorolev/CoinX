import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from "react-native";
import { AppContext } from "../../config/context/AppContext";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { i18n } from "../../config/localization/i18n";

export const AboutScreen = ({ navigation }) => {

    const { theme } = useContext(AppContext);
    const screen = 'screens.about';

    return (
        <View style={[styles.layout, { backgroundColor: theme.screenBgColor }]}>
            <Image style={{ borderWidth: 1, borderRadius: 20, borderColor: theme.primaryContentColor, width: wp('20%'), height: wp('20%') }} source={require('../../../assets/app-icon.png')} />
            <Text style={{ fontSize: wp('5%'), fontWeight: 'bold', color: theme.primaryContentColor }}>{i18n.t(`${screen}.message1`)}</Text>
            <Text style={{ fontSize: wp('3.5%'), fontWeight: 'bold', color: theme.primaryContentColor }}>{i18n.t(`${screen}.message2`)}</Text>
            <View style={{ flex: 0.3 }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: hp('2%')
    }
});
