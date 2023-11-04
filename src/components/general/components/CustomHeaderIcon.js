import React, {useContext} from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {AppContext} from "../../../config/context/AppContext";

export const CustomHeaderIcon = ({ icon, onPressHandler, notifiable }) => {

    const { theme } = useContext(AppContext);

    const iconDimensions = wp('6.2%');
    const blobDimensions = wp('5.8%');
    return (
        <View>
            <TouchableOpacity
                onPress={onPressHandler}>
                <FontAwesomeIcon icon={icon} color={theme.helperIconColor} size={iconDimensions} />
                <View style={[styles.blobContainer, { height: blobDimensions, width: blobDimensions }]}>
                    {notifiable ?
                        <View style={{ borderWidth: 2, borderRadius: wp('3%')/2, borderColor: theme.screenBgColor }}>
                            <View style={[ styles.blob, { backgroundColor: theme.primaryContentColor }]} />
                        </View>: undefined}
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    blobContainer: {
        position: 'absolute',
        alignItems: 'flex-end',
        paddingRight: wp('0.5%'),
        paddingTop: hp('0.1%')
    },
    blob: {
        borderRadius: wp('1.5%')/2,
        width: wp('1.5%'),
        height: wp('1.5%')
    }
});
