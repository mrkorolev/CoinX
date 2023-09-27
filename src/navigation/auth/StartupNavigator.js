import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LoginScreen } from '../../screens/auth/login/LoginScreen';
import { OtpScreen } from '../../screens/auth/otp/OtpScreen';
import {  MainNavigator } from '../tab/MainNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import {SuccessScreen} from "../../screens/success/SuccessScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator();

const createScreenOptions = (headerLeft) => {
    return {
        gestureEnabled: false,
        headerLeft: headerLeft ? headerLeft : () => {}
    }
}

export const StartupNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='Login'
                component={LoginScreen}
                options={createScreenOptions()}/>
            <Stack.Screen
                name='OTP'
                component={OtpScreen}
                options={createScreenOptions()} />
            <Stack.Screen
                name='Success'
                component={SuccessScreen}
                options={createScreenOptions()} />
            <Stack.Screen
                name='Main'
                component={MainNavigator}
                options={createScreenOptions()} />
        </Stack.Navigator>  
    </NavigationContainer>
);