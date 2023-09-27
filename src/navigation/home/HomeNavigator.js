import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../../screens/home/HomeScreen';
import { NotificationScreen } from '../../screens/notifications/NotificationScreen';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {showNotifications} from "../../services/navigation";

const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator();

export const HomeNavigator = () => (
    <Stack.Navigator screenOptions={{ gestureEnabled: false, headerLeft: () => {} }}>
        <Stack.Screen name='Home' component={HomeScreen} options={{ headerRight: () => showNotifications() }}/>
        <Stack.Screen name='Notifications' component={NotificationScreen} />
    </Stack.Navigator>
);