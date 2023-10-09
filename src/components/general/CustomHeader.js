import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const CustomHeader = ({ title }) => {
    return (
        <View>
            <Text style={styles.screenTitle}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screenTitle: {
        fontWeight: 'bold',
        fontSize: wp('4.5%'),
        color: '#293462'
    }
});
