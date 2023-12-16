import React, { useContext, useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomInput } from '../../components/auth/login/CustomInput';
import { CustomButton } from '../../components/general/components/CustomButton';
import { authenticateUser } from "../../services/payone";
import { i18n } from '../../config/localization/i18n.js';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppContext } from "../../config/context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { RusLang } from "../../components/general/icons/RusLang";
import { TurLang } from "../../components/general/icons/TurLang";
import {EngLang} from "../../components/general/icons/EngLang";
import { supportedLanguages } from "../../config/constants/languages";

export const LoginScreen = () => {

    const {
        theme,
        accessToken,
        setAccessToken } = useContext(AppContext);

    const loginDisabledHandler = () => !(username && password && hasResponse);
    const passwordRef = useRef(null);
    const [languageIcon, setLanguageIcon] = useState(<TurLang color={theme.screenBgColor} bgColor={theme.primaryContentColor} size={ wp('10%') } />);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hasResponse, setHasResponse] = useState(true);
    const [protection, setProtection] = useState(true);
    const [icon, setIcon] = useState(<FontAwesomeIcon icon={faEye} color={`${theme.passwordIconColor}`} size={wp('6%')} />);
    const nav = useNavigation();
    const screen = 'screens.login';

    useEffect(() => {
        // console.log('Token: ' + accessToken);
        setUsername(null);
        setPassword(null);
        selectIconHandler(i18n.locale);
    }, [accessToken]);

    const validateInput = (username, password) => (!username || !password) ? false : true;

    const selectIconHandler = (localeStr) => {
        switch(localeStr) {
            case 'en':
                setLanguageIcon(<EngLang  color={theme.screenBgColor} bgColor={theme.primaryContentColor} size={ wp('10%') } />);
                break;
            case 'ru':
                setLanguageIcon(<RusLang  color={theme.screenBgColor} bgColor={theme.primaryContentColor} size={ wp('10%') } />);
                break;
            case 'tr':
                setLanguageIcon(<TurLang  color={theme.screenBgColor} bgColor={theme.primaryContentColor} size={ wp('10%') } />);
                break;
        }
    }

    return (
        <View style={[styles.layout, { backgroundColor: theme.screenBgColor }]}>
            <TouchableOpacity onPress={() => {

                const localeIndex = supportedLanguages.findIndex(language => language.locale === i18n.locale);
                const nextLocale = supportedLanguages[(localeIndex + 1) % supportedLanguages.length].locale;
                selectIconHandler(nextLocale)

                i18n.locale = nextLocale
            }}>
                {languageIcon}
            </TouchableOpacity>

            <Text style={[styles.title, { color: theme.primaryContentColor }]}>{i18n.t(`${screen}.title`)}</Text>

            <View style={{ gap: hp('5%') }}>
                <View style={{ gap: hp('1.5%') }}>
                    <CustomInput
                            value={username}
                            onSubmitHandler={() => passwordRef.current.focus()}
                            placeholder={i18n.t(`${screen}.email_placeholder`)}
                            onChangeText={(text) => setUsername(text)}
                            enterKey='next' />

                    <CustomInput
                        customRef={passwordRef}
                        value={password}
                        icon={
                            <TouchableOpacity
                                onPress={() => {
                                setProtection(!protection);
                                setIcon(!protection ?
                                    <FontAwesomeIcon icon={faEye} color={theme.passwordIconColor} size={wp('6%')}/> :
                                    <FontAwesomeIcon icon={faEyeSlash} color={theme.passwordIconColor} size={wp('6%')} />);}}>
                                {icon}
                            </TouchableOpacity>
                        }
                        secureTextEntry={protection}
                        placeholder={i18n.t(`${screen}.password_placeholder`)}
                        onChangeText={(text) => setPassword(text)}
                        enterKey='done' />
                </View>

                <View style={{ gap: hp('2%') }}>
                    <CustomButton
                        text={i18n.t(`${screen}.login_text`)}
                        textColor={theme.mainBtnTextColor}
                        bgColor={theme.mainBtnBgColor}
                        borderColor={theme.mainBtnBorderColor}
                        isDisabled={loginDisabledHandler()}
                        onPress={async () => {
                            setHasResponse(false);
                            if(!validateInput(username, password)){
                                Alert.alert(i18n.t(`${screen}.invalid_credentials_title`), i18n.t(`${screen}.invalid_credentials_message`));
                                return;
                            }

                            const response = await authenticateUser(username, password);
                            setHasResponse(true);

                            if(response && response.status === 200){
                                setAccessToken(response.data.access_token);
                                nav.navigate('Otp');
                            }
                        }}
                    />
                    <CustomButton
                        text={i18n.t(`${screen}.reset_password_text`)}
                        textColor={theme.mainBtnTextColor}
                        bgColor={theme.mainBtnBgColor}
                        borderColor={theme.mainBtnBorderColor}
                        isDisabled={false}
                        onPress={() => {
                            nav.navigate('Reset')
                        }}
                    />
                </View>
            </View>
            <View style={{ flex: 0.35 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        gap: hp('1%'),
        paddingHorizontal: wp('5%'),
    },
    title: {
        fontWeight: 'bold',
        marginVertical: hp('3%'),
        fontSize: wp('6.5%'),
        textAlign: 'left'
    }
});
