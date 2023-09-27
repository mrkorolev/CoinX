import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TransactionScreen } from '../../screens/transaction/amount/TransactionScreen';
import { QrScreen } from '../../screens/transaction/qr/QrScreen';
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator();

export const TransactionNavigator = () => (
    <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
        <Stack.Screen name='Transaction' component={TransactionScreen}/>
        <Stack.Screen name='QR Code' component={QrScreen}/>
    </Stack.Navigator>
);