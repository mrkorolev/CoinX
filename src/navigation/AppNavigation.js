import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeIcon, CheckCircleIcon, BookmarkIcon, DocumentPlusIcon, UserIcon, BellAlertIcon } from 'react-native-heroicons/outline';
import { HomeIcon as HomeFill,
         CheckCircleIcon as CheckFill,
         BookmarkIcon as BookmarkFill,
         DocumentPlusIcon as DocumentFill,
         BellAlertIcon as BellFill,
         UserIcon as UserFill } from 'react-native-heroicons/solid';

import { HomeScreen } from '../screens/home/HomeScreen';
import { LoginScreen } from '../screens/auth/login/LoginScreen';
import { OtpScreen } from '../screens/auth/otp/OtpScreen';
import { NotificationScreen } from '../screens/notifications/NotificationScreen';

import { TransactionScreen } from '../screens/transaction/amount/TransactionScreen';
import { QrScreen } from '../screens/transaction/qr/QrScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();
const screenTabConfig = (activeIcon, inactiveIcon) => {
    return {
        tabBarShowLabel: false,
        tabBarIcon: ({focused}) => focused ? activeIcon : inactiveIcon
    }
}

export const AppNavigation = () => {
    return (        
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen}
                            options={ screenTabConfig(<HomeFill color='#293462'/>, <HomeIcon color='#293462'/>) } />
                <Tab.Screen name="Login" component={LoginScreen}
                            options={ screenTabConfig(<CheckFill color='#293462'/>, <CheckCircleIcon color='#293462'/>) } />
                <Tab.Screen name="OTP" component={OtpScreen} 
                            options={ screenTabConfig(<BookmarkFill color='#293462'/>, <BookmarkIcon color='#293462'/>) }/>
                <Tab.Screen name="Notifications" component={NotificationScreen}
                            options={ screenTabConfig(<BellFill color='#293462'/>, <BellAlertIcon color='#293462'/>) } />
                <Tab.Screen name="New Transaction" component={TransactionScreen}
                            options={ screenTabConfig(<DocumentFill color='#293462'/>, <DocumentPlusIcon color='#293462'/>) } />
                <Tab.Screen name="Transaction Details" component={QrScreen}
                            options={ screenTabConfig(<DocumentFill color='#293462'/>, <DocumentPlusIcon color='#293462'/>) } />            
                <Tab.Screen name="Profile" component={ProfileScreen}
                            options={ screenTabConfig(<UserFill color='#293462'/>, <UserIcon color='#293462'/>) } />
            </Tab.Navigator>
        </NavigationContainer>
    );
}