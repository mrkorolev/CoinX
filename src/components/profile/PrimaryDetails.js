import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserIcon } from "react-native-heroicons/solid";

// Responsiveness:
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const PrimaryDetails = ({ name }) => {
    return (
        <View style={styles.layout}>
            <View style={styles.iconPlaceholder}>
                {/* Profile icon will come in here */}
                <UserIcon color='white' size={wp('30%')} />
            </View>
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
        fontSize: 30,
        fontWeight: 'bold',
        color: '#293462'
    },
    iconPlaceholder: {
        width: wp('45%'),
        height: wp('45%'),
        borderRadius: wp('45%') * 50,
        backgroundColor: 'slategray',
        marginBottom: hp('2%'),
        marginTop: hp('4%'),
        justifyContent: 'center',
        alignItems: 'center'
    }
});
