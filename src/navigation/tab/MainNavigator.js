import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeIcon, DocumentPlusIcon, UserIcon } from 'react-native-heroicons/outline';
import { HomeIcon as HomeFill,
         DocumentPlusIcon as DocumentFill,
         UserIcon as UserFill } from 'react-native-heroicons/solid';

import { NotificationAlert } from '../../components/general/NotificationAlert';
import { HomeNavigator } from '../home/HomeNavigator';
import { TransactionNavigator } from '../transaction/TransactionNavigation';
import {ProfileNavigator} from "../profile/ProfileNavigator";

const Tab = createBottomTabNavigator();
const screenTabConfig = (activeIcon, inactiveIcon) => {
    return {
        tabBarShowLabel: false,
        headerTitleAlign: 'center',
        tabBarIcon: ({focused}) => focused ? activeIcon : inactiveIcon
    }
}

export const MainNavigator = () => {
    return (        
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="HOME"
                component={HomeNavigator} options={ screenTabConfig(<HomeFill color='#293462'/>, <HomeIcon color='#293462'/>) }/>
            <Tab.Screen name="TRANSACTION" component={TransactionNavigator}
                        options={ screenTabConfig(<DocumentFill color='#293462'/>, <DocumentPlusIcon color='#293462'/>) }/>
            <Tab.Screen name="PROFILE" component={ProfileNavigator}
                        options={ screenTabConfig(<UserFill color='#293462'/>, <UserIcon color='#293462'/>) }/>
        </Tab.Navigator>
    );
}