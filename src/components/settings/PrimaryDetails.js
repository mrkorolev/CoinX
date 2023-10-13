import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Responsiveness:
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {CustomUserIcon} from "./CustomUserIcon";
import {AppContext} from "../../global/AppContext";

export const PrimaryDetails = ({ name }) => {

    const { theme } = useContext(AppContext);

    return (
        <View style={styles.layout}>
            <CustomUserIcon size={wp('18%')} />
            <Text style={[styles.title, { color: theme.primaryContentColor }]}>{name}</Text>
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
        fontWeight: 'bold'
    }
});
