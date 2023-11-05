import React, {useContext} from "react"
import { View, Text, StyleSheet } from 'react-native'

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AppContext } from "../../../config/context/AppContext";

export const OtpInput = ({ value, focused }) => {

    const { theme } = useContext(AppContext);

    return (
        <View style={[styles.container,
            { backgroundColor: theme.otpIptNoFcsBgColor, borderColor: theme.otpIptNoFcsBorderColor },
            focused && { borderColor: theme.otpIptFcsBorderColor},
            value && { borderColor: theme.otpIptHasValueBorderColor }]}>
            <Text style={[styles.value, { color: theme.inputColor }]}>
                {value}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        minWidth: wp('13%'),
        minHeight: wp('13%'),
        borderWidth: 1,
        borderRadius: 5,
        padding: wp('3%'),
        justifyContent: 'center',
    },
    value: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
