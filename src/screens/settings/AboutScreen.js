import React, {useContext, useEffect} from 'react';
import { View, Text, StyleSheet } from "react-native";
import {AppContext} from "../../global/AppContext";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

export const AboutScreen = ({ navigation }) => {

    const { theme } = useContext(AppContext);
    // useEffect(() => {
    //     navigation.getParent()?.setOptions({
    //         tabBarStyle: {
    //             display: 'none',
    //             backgroundColor: theme.screenBgColor,
    //             borderTopWidth: 0
    //         },
    //         tabBarVisible: false });
    //     return () => navigation.getParent()?.setOptions({
    //         tabBarStyle: undefined,
    //         tabBarVisible: undefined,
    //     });
    // }, [navigation]);

    return (
        <View style={[styles.layout, { backgroundColor: theme.screenBgColor }]}>
            <Text style={{ fontSize: wp('4%'), color: theme.primaryContentColor }}>Welcome to About Screen!</Text>
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
