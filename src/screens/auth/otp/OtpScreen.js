import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { CustomButton } from '../../../components/general/CustomButton';
import { useNavigation } from '@react-navigation/native';
import {OtpInputField} from "../../../components/auth/otp/OtpInputField";
import {otpVerification} from "../../../services/authentication";
import {accessToken} from "../../../constants";
import { i18n } from "../../../localization/i18n";

export const OtpScreen = () => {
    const [code, setCode] = useState("");
    const [pinReady, setPinReady] = useState(false);
    const MAX_CODE_LENGTH = 6;
    const nav = useNavigation();
    const screen = 'screens.otp';

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }} />
            <Text style={styles.primary}>{i18n.t(`${screen}.title`)}</Text>
            <Text style={styles.secondary}>{i18n.t(`${screen}.secondary_text`)}</Text>

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
                    const response = await otpVerification(accessToken, code);

                    if(response && response.status === 200){
                        console.log('Verification process passed! Proceed to main navigator!');
                        nav.navigate('Success');
                    }
                    // nav.navigate('Success');
                }} />

            <View style={{ flex: 1 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 8
    },
    primary: {
        fontWeight: 'bold',
        color: '#293462',
        fontSize: 35,
        padding: 10
    },
    secondary: {
        color: 'gray',
        padding: 10,
        fontSize: 18
    }
});
