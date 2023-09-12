import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Separator } from './Separator';
import { OperationAmountPicker } from './OperationAmountPicker';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-native-element-dropdown';

export const Calculator = () => {
    return (
        <View style={styles.layout}>
             <OperationAmountPicker operation='Spend' amount={0.5671} currency='ETH' />
             <Separator icon={faRightLeft} />
             <OperationAmountPicker operation='Receive' amount={1065.31} currency='USDT' />
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        justifyContent: 'center', 
        alignItems: 'center',
        gap: 15
    }
});