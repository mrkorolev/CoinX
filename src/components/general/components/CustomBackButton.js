import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../../config/context/AppContext";
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

