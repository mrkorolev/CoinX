import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

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
        borderRadius: 10,
        paddingVertical: 20,
        margin: 10,
        marginTop: 70
    },
    appButton: {
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center'
    }
});