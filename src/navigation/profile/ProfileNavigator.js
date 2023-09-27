import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {ProfileScreen} from "../../screens/profile/ProfileScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {showNotifications} from "../../services/navigation";

const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator();

export const ProfileNavigator = () => (
    <Stack.Navigator screenOptions={{ gestureEnabled: false, headerLeft: () => {} }}>
        <Stack.Screen name='Profile' component={ProfileScreen}/>
    </Stack.Navigator>
);