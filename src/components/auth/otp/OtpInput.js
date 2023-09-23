import React from "react"
import { View, Text, StyleSheet } from 'react-native'

export const OtpInput = ({ value, focused }) => {
    return (
        <View style={[styles.inputStyling, focused && {borderColor: '#22DCE0', backgroundColor: 'white'}]}>
            <Text style={styles.textStyling}>
                {value}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    inputStyling: {
        borderColor: '#E8ECF4',
        backgroundColor: '#F7F8F9',
        minWidth: '12%',
        borderWidth: 2,
        borderRadius: 5,
        padding: 12
    },
    textStyling: {
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#293462'
    }
});