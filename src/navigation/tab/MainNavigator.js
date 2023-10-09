import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeIcon, DocumentPlusIcon, UserIcon, Cog8ToothIcon } from 'react-native-heroicons/outline';
import { HomeIcon as HomeFill,
         DocumentPlusIcon as DocumentFill,
         Cog8ToothIcon as Cog8ToothFill } from 'react-native-heroicons/solid';
import { HomeNavigator } from '../home/HomeNavigator';
import { TransactionNavigator } from '../transaction/TransactionNavigation';
import { SettingsNavigator } from "../settings/SettingsNavigator";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

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
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {
                height: hp('12%')
            },

        }}>
            <Tab.Screen
                name="HOME"
                component={HomeNavigator}
                options={ screenTabConfig(<HomeFill color='#293462'/>, <HomeIcon color='#293462'/>) }/>
            <Tab.Screen
                name="TRANSACTION"
                component={TransactionNavigator}
                options={ screenTabConfig(<DocumentFill color='#293462'/>, <DocumentPlusIcon color='#293462'/>) }/>
            <Tab.Screen
                name="SETTINGS"
                component={SettingsNavigator}
                options={ screenTabConfig(<Cog8ToothFill color='#293462' />, <Cog8ToothIcon color='#293462' />) }/>
        </Tab.Navigator>
    );
}
