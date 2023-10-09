import React from 'react';
import { TouchableOpacity, View, StyleSheet } from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { ChevronLeftIcon } from "react-native-heroicons/solid";

export const CustomBackButton = ({ onPressHandler }) => {
    return (
        <TouchableOpacity onPress={onPressHandler}>
            <FontAwesomeIcon icon={faChevronLeft} color='#293462' />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    layout: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

