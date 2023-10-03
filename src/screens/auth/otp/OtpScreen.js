import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { CustomButton } from '../../../components/general/CustomButton';
import { useNavigation } from '@react-navigation/native';
import {OtpInputField} from "../../../components/auth/otp/OtpInputField";
import { otpVerification } from "../../../services/authentication";
import { accessToken } from "../../../constants";
// Localization:
import { i18n } from "../../../localization/i18n";

// Responsiveness:
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const OtpScreen = () => {
    const [code, setCode] = useState("");
    const [pinReady, setPinReady] = useState(false);
    const MAX_CODE_LENGTH = 6;
    const nav = useNavigation();
    const screen = 'screens.otp';

    return (
        <View style={styles.layout}>
            <Text style={styles.title}>{i18n.t(`${screen}.title`)}</Text>
            <Text style={styles.message}>{i18n.t(`${screen}.secondary_text`)}</Text>

            <OtpInputField
                code={code}
                setCode={setCode}
                setPinReady={setPinReady}
                maxLength={MAX_CODE_LENGTH} />

            <CustomButton
                text={i18n.t(`${screen}.button_text`)}
                isDisabled={!pinReady}
                onPress={async () => {
                    console.log(code);
                    // const response = await otpVerification(accessToken, code);
                    //
                    // if(response && response.status === 200){
                    //     console.log('Verification process passed! Proceed to main navigator!');
                    //     nav.navigate('Success');
                    // }
                    nav.navigate('Success');
                }} />

            <View style={{ flex: 0.25 }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: wp('5%')
    },
    title: {
        fontWeight: 'bold',
        color: '#293462',
        fontSize: 35,
        marginTop: hp('3%'),
        marginBottom: hp('2%')
    },
    message: {
        color: 'gray',
        fontSize: 20
    }
});
