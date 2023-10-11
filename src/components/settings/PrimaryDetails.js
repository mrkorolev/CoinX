import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Responsiveness:
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {CustomUserIcon} from "./CustomUserIcon";

export const PrimaryDetails = ({ name }) => {
    return (
        <View style={styles.layout}>
            <CustomUserIcon size={wp('18%')} />
            <Text style={styles.title}>{name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: wp('6%'),
        fontWeight: 'bold',
        color: '#293462'
    }
});
