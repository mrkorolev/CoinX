import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppContext } from "../../../config/context/AppContext";

export const TransactionDetail = ({ parameter, value, icon, selectable }) => {

    const { theme } = useContext(AppContext);

    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={styles.detailsLayout}>
                <Text style={[styles.detailsTitle, { color: theme.primaryContentColor }]}>{parameter}</Text>
                <Text style={[styles.detailsData, { color: theme.qrInformationColor }]} selectable={selectable}>{value}</Text>
            </View>
            <View style={{ flex: 0.15 }} />
            {icon}
        </View>
    );
}

const styles = StyleSheet.create({
    detailsLayout: {
        flex: 1,
        justifyContent: 'center',
        gap: hp('0.25%')
    },
    detailsTitle: {
        fontWeight: 'bold',
        fontSize: wp('3.5%')
    },
    detailsData: {
        color: 'gray',
        fontSize: wp('3%')
    }
});
