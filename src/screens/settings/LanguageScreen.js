import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { AppContext } from "../../config/context/AppContext";
import { i18n } from "../../config/localization/i18n";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { supportedLanguages } from "../../config/constants/languages";

export const LanguageScreen = ({ navigation }) => {

    const { theme } = useContext(AppContext);

    const languageOptions = (languages) => {
        return languages.map(item => (
            <TouchableOpacity
                key={item.locale}
                style={{ paddingHorizontal: wp('4%'), paddingVertical: hp('2.5%') }}
                onPress={() => {
                    navigation.goBack();
                    i18n.locale = item.locale;
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: wp('4%'), fontWeight: 'bold', color: theme.primaryContentColor }}>{item.language}</Text>
                    {item.locale === i18n.locale ? <FontAwesomeIcon icon={faCheck} size={wp('4.5%')} color={theme.primaryContentColor} /> : undefined}
                </View>
            </TouchableOpacity>
        ));
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.screenBgColor }]}>
            {languageOptions(supportedLanguages)}
            <View style={{ flex: 0.85 }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});
