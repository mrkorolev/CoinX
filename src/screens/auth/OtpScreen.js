import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CustomButton } from '../../components/general/components/CustomButton';
import { OtpInputField } from "../../components/auth/otp/OtpInputField";
import { otpVerification } from "../../services/payone";
import { i18n } from "../../config/localization/i18n";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppContext } from "../../config/context/AppContext";

export const OtpScreen = ({ navigation }) => {

    const { theme, accessToken } = useContext(AppContext);
    const screen = 'screens.otp';

    const [code, setCode] = useState("");
    const [hasResponse, setHasResponse] = useState(true);
    const [pinReady, setPinReady] = useState(false);
    const MAX_CODE_LENGTH = 6;

    const otpDisabledHandler = () => !(pinReady && hasResponse);

    return (
        <View style={[styles.layout, { backgroundColor: theme.screenBgColor }]}>
            <Text style={[styles.title, { color: theme.primaryContentColor }]}>{i18n.t(`${screen}.title`)}</Text>
            <Text style={[styles.message, { color: theme.secondaryContentColor }]}>{i18n.t(`${screen}.secondary_text`)}</Text>

            <View style={{ gap: hp('4%')}}>
                <OtpInputField
                    code={code}
                    setCode={setCode}
                    setPinReady={setPinReady}
                    maxLength={MAX_CODE_LENGTH} />

                <CustomButton
                    textColor={theme.mainBtnTextColor}
                    bgColor={theme.mainBtnBgColor}
                    borderColor={theme.mainBtnBorderColor}
                    text={i18n.t(`${screen}.button_text`)}
                    isDisabled={otpDisabledHandler()}
                    onPress={ async () => {
                        setHasResponse(false);
                        const response = await otpVerification(accessToken, code);
                        setHasResponse(true);

                        if(response && response.status === 200){
                            navigation.navigate('Success');
                        }

                        // DEBUG
                        // navigation.navigate('Success');
                    }} />
            </View>

            <View style={{ flex: 0.35 }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: wp('5%'),
        // paddingBottom: hp('20%')
    },
    title: {
        fontWeight: 'bold',
        fontSize: wp('8%'),
        marginTop: hp('3%'),
        marginBottom: hp('2%')
    },
    message: {
        color: 'gray',
        fontSize: wp('5%')
    }
});
