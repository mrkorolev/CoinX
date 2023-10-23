import {Appearance, StyleSheet, Text, View} from 'react-native';

import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, {useState, useEffect, useContext, useLayoutEffect} from "react";
import { CustomToggle } from "../../components/settings/CustomToggle";
import { Setting } from "../../components/settings/Setting";

import {accessToken, settings, toggles} from "../../constants";
import { i18n } from "../../localization/i18n";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {CustomUserIcon} from "../../components/settings/CustomUserIcon";
import {commissionDataRequest, userProfileVerification} from "../../services/authentication";
import {AppContext} from "../../global/AppContext";
import {appTheme} from "../../config/theme";

export const SettingsScreen = ({navigation}) => {

    const {
        themeName, setThemeName,
        theme, setTheme,
        pushEnabled, setPushEnabled,
        accessToken } = useContext(AppContext);
    const screen = 'screens.settings';

    const [name, setName] = useState('---');
    const [phone, setPhone] = useState('---');
    const [address, setAddress] = useState('---');
    const [email, setEmail] = useState('---');
    const [commission, setCommission] = useState('---');
    const [enablePush, setEnablePush] = useState(false);

    useLayoutEffect(() => {
        let requestUserData = async () => {
            console.log('Re-render initiated!');
            const userData = await userProfileVerification(accessToken);
            if(!userData) return;
            const commissionData = await commissionDataRequest(accessToken);

            setName(userData.name);
            setPhone(userData.phone);
            setEmail(userData.email);
            setAddress(userData.address);
            setCommission(commissionData !== null ? commissionData : '---');
        }
        requestUserData();

        return () => {
            setName('---');
            setPhone('---');
            setEmail('---');
            setAddress('---');
            setCommission('---');
        }
    }, []);



    return (
        <View style={[styles.container, { backgroundColor: theme.screenBgColor }]}>

            <View style={[styles.settingsContainer, {
                paddingLeft: wp('2%'),
                backgroundColor: theme.settingGroupBgColor,
            }]}>
                <Setting
                    customStyle={{ paddingLeft: wp('5%'), gap: wp('9%'), marginVertical: hp('1.0%') }}
                    title={(
                        <View style={styles.profileSetting}>
                            <Text style={[styles.profileTitle, { color: theme.inputColor }]}>{name}</Text>
                            <Text style={[styles.settingTitle, { color: theme.inputColor }]}>Arekan Teknoloji</Text>
                        </View>
                    )}
                    component={<FontAwesomeIcon icon={faChevronRight} color={theme.settingNavIconColor} />}
                    onPressHandler={() => navigation.navigate('PROFILE', {
                        name: name,
                        phone: phone,
                        address: address,
                        email: email,
                        commission: commission
                    })}
                    icon={<CustomUserIcon
                            size={wp('10%')}
                            customStyle={{
                                width: wp('20%'),
                                height: wp('20%'),
                                borderRadius: wp('20%') * 50
                            }}
                    />}
                    // bgColor={theme.userIconColor}
                    pressable />
            </View>

            <View style={{ gap: hp('2%') }}>
                <View style={[styles.settingsContainer, { backgroundColor: theme.settingGroupBgColor}]}>
                    <Setting
                        title={<Text style={[styles.settingTitle, { color: theme.settingTitleColor }]}>{i18n.t(`${screen}.dark_mode`)}</Text>}
                        component={<CustomToggle
                            value={themeName === 'dark'}
                            onValueToggle={() => {
                                setTheme(() => themeName === 'light' ? appTheme.dark : appTheme.light);
                                setThemeName((prev) => prev === 'light' ? 'dark' : 'light');
                                console.log("Dark mode just turned on!!!");

                        }}
                        />}
                        icon={<FontAwesomeIcon icon={toggles[0].icon} color={"white"} size={wp('4%')} />}
                        bgColor={toggles[0].bgColor} />
                    <Setting
                        title={<Text style={[styles.settingTitle, { color: theme.settingTitleColor }]}>{i18n.t(`${screen}.notifications`)}</Text>}
                        component={<CustomToggle
                            value={enablePush}
                            onValueToggle={() => {
                            setEnablePush((prev) => !prev);
                            console.log("Push notifications value just toggled!");
                        }}
                        />}
                        icon={<FontAwesomeIcon icon={toggles[1].icon} color={"white"} size={wp('4%')} />}
                        bgColor={toggles[1].bgColor} />
                </View>

                <View style={[styles.settingsContainer, { backgroundColor: theme.settingGroupBgColor} ]}>
                    <Setting
                        title={<Text style={[styles.settingTitle, { color: theme.settingTitleColor }]}>{i18n.t(`${screen}.terms_and_conditions`)}</Text>}
                        component={<FontAwesomeIcon icon={faChevronRight} color={theme.settingNavIconColor} />}
                        onPressHandler={() => navigation.navigate('TERMS_OF_USE')}
                        icon={<FontAwesomeIcon icon={settings[0].icon} color={"white"} size={wp('4%')} />}
                        bgColor={settings[0].bgColor}
                        pressable
                    />
                    <Setting
                        title={<Text style={[styles.settingTitle, { color: theme.settingTitleColor }]}>{i18n.t(`${screen}.privacy_policy`)}</Text>}
                        component={<FontAwesomeIcon icon={faChevronRight} color={theme.settingNavIconColor} />}
                        onPressHandler={() => navigation.navigate('PRIVACY')}
                        icon={<FontAwesomeIcon icon={settings[1].icon} color={"white"} size={wp('4%')} />}
                        bgColor={settings[1].bgColor}
                        pressable />
                    <Setting
                        title={<Text style={[styles.settingTitle, { color: theme.settingTitleColor }]}>{i18n.t(`${screen}.about`)}</Text>}
                        component={<FontAwesomeIcon icon={faChevronRight} color={theme.settingNavIconColor} />}
                        onPressHandler={() => navigation.navigate('ABOUT')}
                        icon={<FontAwesomeIcon icon={settings[2].icon} color={"white"} size={wp('4%')} />}
                        bgColor={settings[2].bgColor}
                        pressable />
                </View>
            </View>
            <View style={{ flex: 0.3 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp('5%'),
        justifyContent: 'center',
        gap: hp('6%'),
        paddingBottom: hp('13%')
    },
    settingsContainer: {
        paddingVertical: hp('1.5%'),
        borderRadius: 10,
        paddingHorizontal: wp('5%'),
        gap: hp('1.5%')
    },
    settingTitle: {
        fontSize: wp('4%'),
    },
    profileSetting: {
        gap: hp('1%')
    },
    profileTitle: {
        fontSize: wp('6%'),
        fontWeight: 'bold'
    }
});

