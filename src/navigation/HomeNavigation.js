import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { NotificationScreen } from '../screens/notifications/NotificationScreen';

const Stack = createStackNavigator();

export const HomeNavigator = () => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name='HOME' component={HomeScreen}/>
        <Stack.Screen name='NOTIFICATIONS' component={NotificationScreen}/>
    </Stack.Navigator>
);