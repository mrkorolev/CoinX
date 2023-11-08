import React, { useContext } from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import { PrimaryDetails } from '../../components/settings/PrimaryDetails';
import { i18n } from "../../config/localization/i18n";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomButton } from "../../components/general/components/CustomButton";
import { AppContext } from "../../config/context/AppContext";

export const ProfileScreen = ({ route, navigation }) => {
    const { theme, setAccessToken, customTimeout, setCustomTimeout } = useContext(AppContext);
    const { name, phone, email, address, commission } = route.params;
    const screen = 'screens.profile';

    return (
        <View style={[styles.layout, { backgroundColor: theme.screenBgColor }]}>
            <PrimaryDetails name={name} />
            <View style={styles.container}>
                <View>
                    <View style={styles.group}>
                        <Text style={[styles.key, { color: theme.primaryContentColor }]}>{i18n.t(`${screen}.phone_number`)}:</Text>
                        <Text style={[styles.value, { color: theme.secondaryContentColor }]}>{phone}</Text>
                    </View>
                    <View style={styles.group}>
                        <Text style={[styles.key, { color: theme.primaryContentColor }]}>{i18n.t(`${screen}.email`)}:</Text>
                        <Text style={[styles.value, { color: theme.secondaryContentColor }]}>{email}</Text>
                    </View>
                    <View style={styles.group}>
                        <Text style={[styles.key, { color: theme.primaryContentColor }]}>{i18n.t(`${screen}.address`)}:</Text>
                        <Text style={[styles.value, { color: theme.secondaryContentColor }]}>{address}</Text>
                    </View>
                    <View style={styles.group}>
                        <Text style={[styles.key, { color: theme.primaryContentColor }]}>{i18n.t(`${screen}.commission_rate`)}:</Text>
                        <Text style={[styles.value, { color: theme.secondaryContentColor }]}>{`${commission} %`}</Text>
                    </View>
                </View>

                <CustomButton
                    textColor={theme.mainBtnTextColor}
                    bgColor={theme.mainBtnBgColor}
                    borderColor={theme.mainBtnBorderColor}
                    text={i18n.t(`${screen}.logout_title`)}
                    onPress={() => {
                        Alert.alert(
                            i18n.t(`${screen}.logout_operation_title`),
                            i18n.t(`${screen}.logout_operation_message`), [
                                {
                                    text: i18n.t(`${screen}.logout_operation_cancel`),
                                    style: 'default',
                                    onPress: () => console.log('Cancelled logout!')
                                },
                                {
                                    text: i18n.t(`${screen}.logout_operation_confirm`),
                                    style: 'destructive',
                                    onPress: () => {
                                        navigation.navigate('Login');
                                        setAccessToken(undefined);
                                        clearTimeout(customTimeout);
                                        setCustomTimeout(undefined);
                                    }
                                }
                            ]);
                    }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        padding: wp('2%')
    },
    container: {
        flex: 1,
        paddingHorizontal: wp('7%'),
        paddingBottom: hp('2%'),
        marginBottom: hp('15%'),
        gap: hp('12%')
    },
    group: {
        paddingBottom: hp('1.5%'),
    },
    key: {
        fontSize: wp('4%'),
        fontWeight: 'bold'
    },
    value: {
        fontSize: wp('3.5%')
    }
});
