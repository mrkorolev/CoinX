import { StyleSheet, Text, View } from 'react-native';

import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import React, {useState} from "react";
import { CustomToggle } from "../../components/settings/CustomToggle";
import {Setting} from "../../components/settings/Setting";

import { settings, toggles } from "../../constants";
import { i18n } from "../../localization/i18n";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {CustomUserIcon} from "../../components/settings/CustomUserIcon";

export const SettingScreen = ({navigation}) => {

    const [name, setName] = useState('---');
    const [phone, setPhone] = useState('---');
    const [address, setAddress] = useState('---');
    const [email, setEmail] = useState('---');
    const [commission, setCommission] = useState('---');

    // useEffect(async () => {
    //     console.log('Re-render initiated!');
    //     const userData = await userProfileVerification(accessToken);
    //     const commissionData = await commissionDataRequest(accessToken);
    //
    //     setName(userData.name);
    //     setPhone(userData.phone);
    //     setEmail(userData.email);
    //     setAddress(userData.address);
    //     setCommission(`${commissionData} %`);
    // }, []);

    const screen = 'screens.settings';

    return (
        <View style={styles.container}>

            <View style={[styles.settingsContainer, {
                paddingLeft: wp('2%'),
            }]}>
                <Setting
                    customStyle={{ paddingLeft: wp('5%'), gap: wp('9%'), marginVertical: hp('2.5%') }}
                    title={(
                        <View style={styles.profileSetting}>
                            <Text style={styles.profileTitle}>{name}</Text>
                            <Text style={styles.settingTitle}>Arekan Teknoloji</Text>
                        </View>
                    )}
                    component={<FontAwesomeIcon icon={faChevronRight} color='gray' />}
                    onPressHandler={() => navigation.navigate(i18n.t('screens.profile.screen_name'), {
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
                    bgColor='gray'
                    pressable />
            </View>

            <View style={styles.settingsContainer}>
                <Setting
                    title={<Text style={styles.settingTitle}>{i18n.t(`${screen}.dark_mode`)}</Text>}
                    component={<CustomToggle />}
                    icon={<FontAwesomeIcon icon={toggles[0].icon} color={"white"} size={wp('4%')} />}
                    bgColor={toggles[0].bgColor} />
                <Setting
                    title={<Text style={styles.settingTitle}>{i18n.t(`${screen}.notifications`)}</Text>}
                    component={<CustomToggle />}
                    icon={<FontAwesomeIcon icon={toggles[1].icon} color={"white"} size={wp('4%')} />}
                    bgColor={toggles[1].bgColor} />
            </View>

            <View style={styles.settingsContainer}>
                <Setting
                    title={<Text style={styles.settingTitle}>{i18n.t(`${screen}.terms_and_conditions`)}</Text>}
                    component={<FontAwesomeIcon icon={faChevronRight} color='gray' />}
                    onPressHandler={() => navigation.navigate(i18n.t('screens.terms_and_conditions.screen_name'))}
                    icon={<FontAwesomeIcon icon={settings[0].icon} color={"white"} size={wp('4%')} />}
                    bgColor={settings[0].bgColor}
                    pressable
                />
                <Setting
                    title={<Text style={styles.settingTitle}>{i18n.t(`${screen}.privacy_policy`)}</Text>}
                    component={<FontAwesomeIcon icon={faChevronRight} color='gray' />}
                    onPressHandler={() => navigation.navigate(i18n.t('screens.privacy_policy.screen_name'))}
                    icon={<FontAwesomeIcon icon={settings[1].icon} color={"white"} size={wp('4%')} />}
                    bgColor={settings[1].bgColor}
                    pressable />
                <Setting
                    title={<Text style={styles.settingTitle}>{i18n.t(`${screen}.about`)}</Text>}
                    component={<FontAwesomeIcon icon={faChevronRight} color='gray' />}
                    onPressHandler={() => navigation.navigate(i18n.t('screens.about.screen_name'))}
                    icon={<FontAwesomeIcon icon={settings[2].icon} color={"white"} size={wp('4%')} />}
                    bgColor={settings[2].bgColor}
                    pressable />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'whitesmoke',
        padding: wp('5%'),
        justifyContent: 'center',
        gap: hp('3%')
    },
    settingsContainer: {
        paddingVertical: hp('2%'),
        borderRadius: 10,
        backgroundColor: 'white',
        paddingHorizontal: wp('4%'),
        gap: hp('3%')
    },
    settingTitle: {
        fontSize: wp('4%')
    },
    profileSetting: {
        gap: hp('1%')
    },
    profileTitle: {
        fontSize: wp('6%'),
        fontWeight: 'bold'
    }
});

