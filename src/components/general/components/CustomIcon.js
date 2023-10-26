import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { View, StyleSheet } from 'react-native';

export const CustomIcon = ({ icon, iconSize, boxSize, color, bgColor }) => {
    return (
        <View style={[styles.layout, { width: boxSize, height: boxSize, backgroundColor: bgColor }]}>
            <FontAwesomeIcon icon={icon} color={color} size={iconSize} spin />
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    }
});
