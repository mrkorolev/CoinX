import React from 'react';
import { TouchableOpacity, View, StyleSheet } from "react-native";

export const CustomBackButton = ({ icon, onPressHandler }) => {
    return (
        <TouchableOpacity onPress={onPressHandler}>
            {icon}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    layout: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

