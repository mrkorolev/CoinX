import { StyleSheet, Text, View } from 'react-native';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState, useContext, useLayoutEffect } from "react";
import { CustomToggle } from "../../components/settings/CustomToggle";
import { Setting } from "../../components/settings/Setting";
import { funcSettings, descSettings } from "../../config/constants/settings";
import { i18n } from "../../config/localization/i18n";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { CustomUserIcon } from "../../components/settings/CustomUserIcon";
import { commissionDataRequest, userProfileVerification } from "../../services/payone";
import { AppContext } from "../../config/context/AppContext";
import { appTheme } from "../../config/theme/theme";

export const SettingsScreen = ({navigation}) => {

    const {
        themeName, setThemeName,
        theme, setTheme,
        accessToken } = useContext(AppContext);

    const [name, setName] = useState('---');
    const [company, setCompany] = useState('---');
    const [phone, setPhone] = useState('---');
    const [address, setAddress] = useState('---');
    const [email, setEmail] = useState('---');
    const [commission, setCommission] = useState('---');
    const [enablePush] = useState(false);
    const [hasResponse, setHasResponse] = useState(false);
    const screen = 'screens.settings';

    const settingDisabledHandler = () => !(hasResponse)

    useLayoutEffect(() => {
        let requestUserData = async () => {

            // console.log('Re-render initiated!');
            const userData = await userProfileVerification(accessToken);
            if(!userData) return;
            const commissionData = await commissionDataRequest(accessToken);
            setHasResponse(true);

            setName(userData.name);
            setCompany(userData.company);
            setPhone(userData.phone);
            setEmail(userData.email);
            setAddress(userData.address);
            setCommission(commissionData !== null ? commissionData : '---');
        }
        requestUserData();

        return () => {
            setName('---');
            setCompany('---');
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
                    isDisabled={settingDisabledHandler()}
                    customStyle={{ paddingLeft: wp('5%'), gap: wp('9%'), marginVertical: hp('1.0%') }}
                    title={(
                        <View style={styles.profileSetting}>
                            <Text style={[styles.profileTitle, { color: theme.inputColor }]}>{name}</Text>
                            <Text style={[styles.settingTitle, { color: theme.inputColor }]}>{company}</Text>
                        </View>
                    )}
                    component={<FontAwesomeIcon icon={faChevronRight} color={theme.settingNavIconColor} />}
                    onPressHandler={() => navigation.navigate('PROFILE', {
                        name: name,
                        company: company,
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
                     />
            </View>

            <View style={{ gap: hp('2%') }}>
                <View style={[styles.settingsContainer, { backgroundColor: theme.settingGroupBgColor}]}>
                    <Setting
                        isDisabled={true}
                        title={<Text style={[styles.settingTitle, { color: theme.settingTitleColor }]}>{i18n.t(`${screen}.dark_mode`)}</Text>}
                        component={<CustomToggle
                            value={themeName === 'dark'}
                            onValueToggle={() => {
                                setTheme(() => themeName === 'light' ? appTheme.dark : appTheme.light);
                                setThemeName((prev) => prev === 'light' ? 'dark' : 'light');
                                // console.log("Dark mode just toggled!");
                        }}
                        />}
                        icon={<FontAwesomeIcon icon={funcSettings[0].icon} color={"white"} size={wp('4%')} />}
                        bgColor={funcSettings[0].bgColor}
                        />
                    <Setting
                        customStyle={{ opacity: 0.6 }}
                        isDisabled={true}
                        title={<Text style={[styles.settingTitle, { color: theme.settingTitleColor }]}>{i18n.t(`${screen}.notifications`)}</Text>}
                        component={<CustomToggle value={enablePush} />}
                        icon={<FontAwesomeIcon icon={funcSettings[1].icon} color={"white"} size={wp('4%')} />}
                        bgColor={funcSettings[1].bgColor}

                    />
                    <Setting
                        isDisabled={settingDisabledHandler()}
                        title={<Text style={[styles.settingTitle, { color: theme.settingTitleColor }]}>{i18n.t(`${screen}.language`)}</Text>}
                        component={<FontAwesomeIcon icon={faChevronRight} color={theme.settingNavIconColor} />}
                        onPressHandler={() => navigation.navigate('LANGUAGE')}
                        icon={<FontAwesomeIcon icon={funcSettings[2].icon} color={"white"} size={wp('4%')} />}
                        bgColor={funcSettings[2].bgColor}
                    />
                </View>

                <View style={[styles.settingsContainer, { backgroundColor: theme.settingGroupBgColor }]}>
                    <Setting
                        customStyle={{ opacity: 0.6 }}
                        isDisabled={true}
                        title={<Text style={[styles.settingTitle, { color: theme.settingTitleColor }]}>{i18n.t(`${screen}.terms_and_conditions`)}</Text>}
                        component={<FontAwesomeIcon icon={faChevronRight} color={theme.settingNavIconColor} />}
                        onPressHandler={() => navigation.navigate('TERMS_OF_USE')}
                        icon={<FontAwesomeIcon icon={descSettings[0].icon} color={"white"} size={wp('4%')} />}
                        bgColor={descSettings[0].bgColor}
                    />
                    <Setting
                        // customStyle={{ opacity: 0.6 }}
                        // isDisabled={true}
                        title={<Text style={[styles.settingTitle, { color: theme.settingTitleColor }]}>{i18n.t(`${screen}.privacy_policy`)}</Text>}
                        component={<FontAwesomeIcon icon={faChevronRight} color={theme.settingNavIconColor} />}
                        onPressHandler={() => navigation.navigate('PRIVACY')}
                        icon={<FontAwesomeIcon icon={descSettings[1].icon} color={"white"} size={wp('4%')} />}
                        bgColor={descSettings[1].bgColor}

                    />
                    <Setting
                        // customStyle={{ opacity: 0.6 }}
                        // isDisabled={true}
                        title={<Text style={[styles.settingTitle, { color: theme.settingTitleColor }]}>{i18n.t(`${screen}.about`)}</Text>}
                        component={<FontAwesomeIcon icon={faChevronRight} color={theme.settingNavIconColor} />}
                        onPressHandler={() => navigation.navigate('ABOUT')}
                        icon={<FontAwesomeIcon icon={descSettings[2].icon} color={"white"} size={wp('4%')} />}
                        bgColor={descSettings[2].bgColor}
                    />
                </View>
            </View>
            <View style={{ flex: 0.6 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp('5%'),
        justifyContent: 'center',
        gap: hp('6%')
    },
    settingsContainer: {
        paddingVertical: hp('1.5%'),
        borderRadius: 10,
        paddingHorizontal: wp('5%'),
        gap: hp('1.5%')
    },
    settingTitle: {
        fontSize: wp('3.5%'),
    },
    profileSetting: {
        gap: hp('1%')
    },
    profileTitle: {
        fontSize: wp('5%'),
        fontWeight: 'bold'
    }
});

