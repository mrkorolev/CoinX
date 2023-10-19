import React, {useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LoginScreen } from '../../screens/auth/login/LoginScreen';
import { OtpScreen } from '../../screens/auth/otp/OtpScreen';
import {  MainNavigator } from '../tab/MainNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { SuccessScreen } from "../../screens/success/SuccessScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {CustomBackButton} from "../../components/general/CustomBackButton";
import {Platform, StatusBar} from "react-native";
import {AppContext, AppContextProvider} from "../../global/AppContext";

const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator();

export const StartupNavigator = () => {

    const {theme} = useContext(AppContext);
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='Login'
                    component={LoginScreen}
                    options={() => ({
                        gestureEnabled: false,
                        headerTitle: '',
                        headerTransparent: true
                    })}/>
                <Stack.Screen
                    name='Otp'
                    component={OtpScreen}
                    options={({navigation}) => ({
                        gestureEnabled: false,
                        headerTitle: '',
                        headerTintColor: theme.primaryContentColor,
                        headerTransparent: true,
                        headerLeft: () => Platform.OS === 'ios' ?
                            <CustomBackButton onPressHandler={() => navigation.goBack()}/> : undefined,
                    })}/>
                <Stack.Screen
                    name='Success'
                    component={SuccessScreen}
                    options={() => ({
                        gestureEnabled: false,
                        headerShown: false
                    })}/>
                <Stack.Screen
                    name='Main'
                    component={MainNavigator}
                    options={() => ({
                        gestureEnabled: false,
                        headerShown: false
                    })}/>
            </Stack.Navigator>
            <StatusBar barStyle={`${theme.sbContent}-content`}/>
        </NavigationContainer>
    );
}
