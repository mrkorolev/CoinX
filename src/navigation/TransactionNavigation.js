import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TransactionScreen } from '../screens/transaction/amount/TransactionScreen';
import { QrScreen } from '../screens/transaction/qr/QrScreen';

const Stack = createStackNavigator();

export const TransactionNavigator = () => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name='TRANSACTION' component={TransactionScreen}/>
        <Stack.Screen name='QR CODE' component={QrScreen}/>
    </Stack.Navigator>
);