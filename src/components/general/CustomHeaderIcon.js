import React, {useContext} from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {AppContext} from "../../global/AppContext";

export const CustomHeaderIcon = ({ icon, onPressHandler }) => {

    const { theme } = useContext(AppContext);

    const iconDimensions = wp('6%');
    const notWidth = iconDimensions - wp('0.75%');
    return (
        <View>
            <TouchableOpacity
                onPress={onPressHandler}>
                <FontAwesomeIcon icon={icon} color={theme.helperIconColor} size={iconDimensions} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        position: 'absolute',
        alignItems: 'flex-end',
        height: hp('0.5%')
    },
    unread: {
        width: wp('2%'),
        height: wp('2%'),
        borderRadius: wp('2%')/2,
        borderWidth: 1.5
    }
});
