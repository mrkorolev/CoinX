import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronDownIcon } from 'react-native-heroicons/solid';
import { CustomIcon } from '../../general/CustomIcon';
import { Dropdown } from 'react-native-element-dropdown';
import { coins } from '../../../constants';

export const TransactionCurrencyPicker = ({icon, currency, iconSize, boxSize }) => {
    return (
        <View style={styles.layout}>
            <View style={{ flexDirection: 'row', gap: 3, justifyContent: 'center', alignItems: 'center' }}>
                <CustomIcon icon={icon} iconSize={iconSize} boxSize={boxSize} />
                <Text style={styles.textStyle}>{currency}</Text>
            </View>
            <TouchableOpacity
                // onPress={() => alert('Switching currency!')}
                >
                <ChevronDownIcon color='#293462' />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        height: 55,
        paddingHorizontal: 5,
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
        borderRadius: 10,
        borderWidth: 1, 
        flex: 1.2
    }, 
    textStyle: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 12
    }
});