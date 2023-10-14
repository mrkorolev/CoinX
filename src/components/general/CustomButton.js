import React, {useContext} from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {AppContext} from "../../global/AppContext";

export const CustomButton = ({ text, isDisabled, onPress, textColor, bgColor, borderColor }) => {

    return (
        <TouchableOpacity
            style={[styles.appButtonContainer, { backgroundColor: bgColor, borderColor: borderColor }]}
            onPress={onPress}
            disabled={isDisabled} >
            <Text style={[styles.appButton, { color: textColor }]}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    appButtonContainer: {
        borderRadius: 5,
        borderWidth: 1,
        justifyContent: 'center',
        marginTop: hp('5%'),
        height: hp('7%')
    },
    appButton: {
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: wp('4%')
    }
});
