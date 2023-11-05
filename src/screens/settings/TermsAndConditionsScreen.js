import React, {useContext } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { AppContext } from "../../config/context/AppContext";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const TermsAndConditionsScreen = ({ navigation }) => {

    const { theme } = useContext(AppContext);
    return (
        <View style={[styles.layout, { backgroundColor: theme.screenBgColor }]}>
            <Text style={{ fontSize: wp('4%'), color: theme.primaryContentColor }}>Welcome to Terms and Conditions Screen!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
