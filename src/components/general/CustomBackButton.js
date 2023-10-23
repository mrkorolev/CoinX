import React, {useContext} from 'react';
import { TouchableOpacity, View, StyleSheet } from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import {AppContext} from "../../global/AppContext";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const CustomBackButton = ({ onPressHandler }) => {

    const { theme } = useContext(AppContext);

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPressHandler}>
            <FontAwesomeIcon icon={faChevronLeft} color={theme.primaryContentColor} size={wp('4.5%')} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

