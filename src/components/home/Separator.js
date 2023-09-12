import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Line } from './Line';
import { ArrowsRightLeftIcon } from 'react-native-heroicons/solid';
import { CustomIcon } from '../general/CustomIcon';

export const Separator = ({icon}) => {    
    return (
        <View style={styles.layout}>
            <Line backgroundColor='lightgray' />
            <View style={styles.separatorIcon}>
                <CustomIcon icon={icon} />
            </View>
            <Line backgroundColor='lightgray' />
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        flexDirection: 'row', 
        alignItems: 'center',
        gap: 40
    }, 
    separatorIcon: {
        backgroundColor: '#293462', 
        borderRadius: 5, 
        width: 40, 
        height: 40, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});