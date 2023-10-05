import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Responsiveness:
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const CustomButton = ({ text, isDisabled, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={onPress}
            disabled={isDisabled} >
            <Text style={styles.appButton}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    appButtonContainer: {
        backgroundColor: '#293462',
        borderRadius: 5,
        justifyContent: 'center',
        marginTop: hp('5%'),
        height: hp('7%')
    },
    appButton: {
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: wp('4%')
    }
});
