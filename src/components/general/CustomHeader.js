import React, {useContext} from 'react';
import { View, Text, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import {AppContext} from "../../global/AppContext";

export const CustomHeader = ({ title }) => {

    const { theme } = useContext(AppContext);

    return (
        <View>
            <Text style={[styles.screenTitle, { color: theme.primaryContentColor }]}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screenTitle: {
        fontWeight: 'bold',
        fontSize: wp('4.5%')
    }
});
