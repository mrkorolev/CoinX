import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import {AppContext} from "../../global/AppContext";
import {i18n} from "../../localization/i18n";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheck, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useState} from "react";

export const LanguageScreen = ({ navigation }) => {

    const languages = [
        {
            language: 'English',
            locale: 'en'
        },
        {
            language: 'Türkçe',
            locale: 'tr'
        },
        {
            language: 'Русский',
            locale: 'ru'
        }
    ];

    const { theme } = useContext(AppContext);
    const [locale, setLocale] = useState(languages[0]);

    const languageOptions = (languages) => {
        return languages.map(item => (
            <TouchableOpacity
                key={item.locale}
                style={{ paddingHorizontal: wp('4%')}}
                onPress={() => {
                    i18n.locale = item.locale;
                    setLocale(item);
                    navigation.navigate('SETTINGS');
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
            {languageOptions(languages)}
            <View style={{ flex: 0.85 }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        gap: hp('4.5%')
    }
});
