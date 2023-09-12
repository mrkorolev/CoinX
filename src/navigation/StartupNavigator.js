import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LoginScreen } from '../screens/auth/login/LoginScreen';
import { OtpScreen } from '../screens/auth/otp/OtpScreen';
import {  MainNavigator } from './MainNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

const Stack = createStackNavigator();

export const StartupNavigator = () => (
    <NavigationContainer>
        {/* For debuggin purposes ONLY - headerMode is deprecated !!! */}
        <Stack.Navigator headerMode='none' > 
            <Stack.Screen name='LOGIN' component={LoginScreen} />
            <Stack.Screen name='OTP' component={OtpScreen} />
            <Stack.Screen name='MAIN' component={MainNavigator} />
        </Stack.Navigator>  
    </NavigationContainer>
);