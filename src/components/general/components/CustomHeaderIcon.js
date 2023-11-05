import React, { useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { AppContext } from "../../../config/context/AppContext";

export const CustomHeaderIcon = ({ icon, onPressHandler }) => {

    const { theme } = useContext(AppContext);

    return (
        <View>
            <TouchableOpacity
                onPress={onPressHandler}>
                <FontAwesomeIcon icon={icon} color={theme.helperIconColor} size={wp('6.5%')} />
            </TouchableOpacity>
        </View>
    );
}
