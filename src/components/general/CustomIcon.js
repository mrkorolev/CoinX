import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { View, StyleSheet } from 'react-native';

export const CustomIcon = ({ icon, iconSize, boxSize }) => {
    return (
        <View style={[styles.layout, { width: boxSize, height: boxSize }]}>
            <FontAwesomeIcon icon={icon} color='#fff' size={iconSize} spin />
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#293462',
        borderRadius: 8
    }
});