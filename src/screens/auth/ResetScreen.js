import { StyleSheet, Text} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { i18n } from "../../config/localization/i18n";
import React, {useContext, useEffect, useState} from "react";
import { AppContext } from "../../config/context/AppContext";
import { View } from 'react-native';
import { CustomInput } from "../../components/auth/login/CustomInput";
import { CustomButton } from "../../components/general/components/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { useIsFocused } from "@react-navigation/native";
import { changePassword } from "../../services/payone";

export const ResetScreen = () => {

    const [email, setEmail] = useState('');
    const { theme } = useContext(AppContext);
    const [emailSent, setEmailSent] = useState(false);
    const [hasResponse, setHasResponse] = useState(true);
    const screen = 'screens.reset_password'
    const active = useIsFocused();

    useEffect(() => {
        setEmail(null);
        setEmailSent(false);
    }, [active]);

    const submitDisabled = () => !(hasResponse);

    return emailSent ?
        <View style={[styles.layout, { backgroundColor: theme.screenBgColor, gap: hp('5%'), alignItems: 'center' }]}>
            <FontAwesomeIcon icon={faEnvelopeOpenText} color={theme.supportIconColor} size={wp('30%')} />
            <Text style={[styles.emailSent, { color: theme.primaryContentColor, textAlign: 'center' }]}>{i18n.t(`${screen}.success_text`)}</Text>
            <View style={{ flex: 0.45 }} />
        </View> :
        <View style={[styles.layout, { backgroundColor: theme.screenBgColor }]}>
            <View style={{ gap: hp('5%') }}>
                <View>
                    <Text style={[styles.title, { color: theme.primaryContentColor }]}>{i18n.t(`${screen}.title`)}</Text>
                    <Text style={[styles.message, { color: theme.secondaryContentColor }]}>{i18n.t(`${screen}.description`)}</Text>
                </View>
                <View style={{ gap: hp('4%') }}>
                    <CustomInput
                        value={email}
                        placeholder={i18n.t(`${screen}.email_placeholder`)}
                        onChangeText={(text) => setEmail(text)}
                        enterKey='done' />

                    <CustomButton
                        text={i18n.t(`${screen}.reset_text`)}
                        textColor={theme.mainBtnTextColor}
                        bgColor={theme.mainBtnBgColor}
                        borderColor={theme.mainBtnBorderColor}
                        isDisabled={submitDisabled()}
                        onPress={async () => {
                            setHasResponse(false);
                            const resetResponse = await changePassword(email);

                            setHasResponse(true);
                            if(resetResponse && resetResponse.status === 200){
                                setEmailSent(true)
                            }
                        }} />
                </View>
            </View>
            <View style={{ flex: 0.45 }} />
        </View>
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: wp('5%'),
    },
    title: {
        fontWeight: 'bold',
        fontSize: wp('8%'),
        marginTop: hp('3%'),
        marginBottom: hp('2%')
    },
    emailSent: {
        fontSize: wp('5%'),
        fontWeight: 'bold'
    },
    message: {
        color: 'gray',
        fontSize: wp('4.5%')
    }
});
