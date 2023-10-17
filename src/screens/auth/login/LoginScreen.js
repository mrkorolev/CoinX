import React, {useContext, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { CustomInput } from '../../../components/auth/login/CustomInput';
import { CustomButton } from '../../../components/general/CustomButton';
import { authenticateUser } from "../../../services/authentication";

import { i18n } from '../../../localization/i18n.js';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {AppContext} from "../../../global/AppContext";

export const LoginScreen = () => {

    // App context
    const {
        theme, accessToken,
        setAccessToken, setRefreshToken } = useContext(AppContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [protection, setProtection] = useState(true);
    const [icon, setIcon] = useState(<EyeIcon color={`${theme.passwordIconColor}`} size={wp('6%')} />);
    const nav = useNavigation();
    const screen = 'screens.login';

    const validateInput = (username, password) => {
        if(!username || !password){
            return false;
        }
        return true;
    }

    return (
        <View
            style={[styles.layout, { backgroundColor: theme.screenBgColor }]}>
                <Text style={[styles.title, { color: theme.primaryContentColor }]}>{i18n.t(`${screen}.title`)}</Text>
                <CustomInput
                    value={username}
                    placeholder={i18n.t(`${screen}.email_placeholder`)}
                    onChangeText={(text) => setUsername(text)}
                    enterKey='next' />

                <CustomInput
                    value={password}
                    icon={
                        <TouchableOpacity
                            onPress={() => {
                            setProtection(!protection);
                            setIcon(!protection ?
                                <EyeIcon color={theme.passwordIconColor} size={wp('6%')}/> :
                                <EyeSlashIcon color={theme.passwordIconColor} size={wp('6%')} />);}}>
                            {icon}
                        </TouchableOpacity>
                    }

                    secureTextEntry={protection}
                    placeholder={i18n.t(`${screen}.password_placeholder`)}
                    onChangeText={(text) => setPassword(text)}
                    enterKey='done' />

                <CustomButton
                    text={i18n.t(`${screen}.button_text`)}
                    textColor={theme.mainBtnTextColor}
                    bgColor={theme.mainBtnBgColor}
                    borderColor={theme.mainBtnBorderColor}
                    onPress={async () => {
                        console.log(`Username: ${username}`);
                        console.log(`Password: ${password}`);

                        if(!validateInput(username, password)){
                            Alert.alert(i18n.t(`${screen}.invalid_credentials_title`), i18n.t(`${screen}.invalid_credentials_message`));
                            return;
                        }

                        const response = await authenticateUser(username, password);
                        if(response && response.status === 200){
                            setAccessToken(response.data.access_token);
                            setRefreshToken(response.data.refresh_token);
                            console.log('LOGIN SUCCESSFUL (token saved)! Proceed to OTP!');
                            nav.navigate('Otp');
                        }

                        // DEBUG
                        // setAccessToken('123123');
                        // nav.navigate('Otp');
                    }}
                />
                <View style={{ flex: 0.25 }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        padding: wp('5%')
    },
    title: {
        fontWeight: 'bold',
        marginVertical: hp('3%'),
        fontSize: wp('8%')
    }
});
