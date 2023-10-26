import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const Setting = ({customStyle, icon, bgColor, title, component, pressable, onPressHandler }) => {
    return (
        <TouchableOpacity style={styles.layout} disabled={!pressable} onPress={onPressHandler}>
            <View style={[styles.iconTitleContainer, customStyle]}>
                <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
                    {icon}
                </View>
                <Text>{title}</Text>
            </View>
            {component}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    layout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconContainer: {
        width: wp('10%'),
        height: wp('10%'),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconTitleContainer: {
        flexDirection: 'row',
        gap: wp('5%'),
        alignItems: 'center'
    }
});
