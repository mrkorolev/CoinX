import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Resend } from '../../../components/auth/otp/Resend';
import { CustomButton } from '../../../components/general/CustomButton';

export const OtpScreen = () => {
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }} />
            <Text style={styles.primary}>OTP Verification</Text>
            <Text style={styles.secondary}>Enter the verification code we just sent on your email address.</Text>

            {/* OTP Verification component comes in here! */}
            <CustomButton 
                text='Verify'
                onPress={() => {alert('Verification process initiated!')}} />

            <View style={{ flex: 1 }} />
            <Resend issueMessage="Didn't receive code?" issueAction="Resend"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
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