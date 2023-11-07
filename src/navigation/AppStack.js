import React, {useContext, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { OtpScreen } from '../screens/auth/OtpScreen';
import { TabsNavigator } from './TabsNavigator';
import { SuccessScreen } from "../screens/auth/SuccessScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CustomBackButton } from "../components/general/components/CustomBackButton";
import { Platform, StatusBar } from "react-native";
import { AppContext } from "../config/context/AppContext";
import * as NavigationBar from 'expo-navigation-bar';

const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator();

export const AppStack = () => {
    const { theme } = useContext(AppContext);

    useEffect( () => {
        const navigationBar = async () => {

            // IDEALLY DON'T DO ANYTHING ON LIGHT MODE, FOR DARK DO THE SCREEN TAB COLOR
            if(Platform.OS === 'android'){
                console.log(await NavigationBar.getBackgroundColorAsync());
                await NavigationBar.setBackgroundColorAsync(theme.tabBgColor);
                await NavigationBar.setButtonStyleAsync(theme.sbContent);
            }
        }
        navigationBar();
    }, [theme]);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name={'Login'}
                    component={LoginScreen}
                    options={() => ({
                        gestureEnabled: false,
                        headerTitle: '',
                        headerTransparent: true
                    })}/>
                <Stack.Screen
                    name={'Otp'}
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
                    name={'Success'}
                    component={SuccessScreen}
                    options={() => ({
                        gestureEnabled: false,
                        headerShown: false
                    })}/>
                <Stack.Screen
                    name='Main'
                    component={TabsNavigator}
                    options={() => ({
                        gestureEnabled: false,
                        headerShown: false
                    })}/>
            </Stack.Navigator>
            <StatusBar
                backgroundColor={Platform.OS === 'android' ? theme.screenBgColor : undefined }
                barStyle={ `${theme.sbContent}-content` } />
        </NavigationContainer>
    );
}
