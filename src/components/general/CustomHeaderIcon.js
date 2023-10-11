import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const CustomHeaderIcon = ({ icon, hasUnread, isNotifiable, onPressHandler }) => {
    const iconDimensions = wp('6%');
    const notWidth = iconDimensions - wp('0.75%');
    return (
        <View>
            <TouchableOpacity
                onPress={onPressHandler}>
                <FontAwesomeIcon icon={icon} color='#293462' size={iconDimensions} />
                { isNotifiable ? <View style={[styles.iconContainer, { width: notWidth }]}>
                    { hasUnread ?
                        <View style={styles.unread}/> :
                        null
                    }
                </View> : null }
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
        height: hp('1%'),
        borderRadius: wp('2%')/2,
        backgroundColor: '#293462'
    }
});
