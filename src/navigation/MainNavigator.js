import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeIcon, DocumentPlusIcon, UserIcon } from 'react-native-heroicons/outline';
import { HomeIcon as HomeFill,
         DocumentPlusIcon as DocumentFill,
         UserIcon as UserFill } from 'react-native-heroicons/solid';

import { NotificationAlert } from '../components/general/NotificationAlert';
import { HomeNavigator } from './HomeNavigation';
import { TransactionNavigator } from './TransactionNavigation';
import { ProfileScreen } from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();
const screenTabConfig = (activeIcon, inactiveIcon, notifiable) => {
    return {
        tabBarShowLabel: false,
        headerTitleAlign: 'center',
        tabBarIcon: ({focused}) => focused ? activeIcon : inactiveIcon,
        headerRight: () => showNotifications(notifiable)
    }
}

const showNotifications = (show = true) => {
    return show ? <NotificationAlert hasUnread={true}/> : null
}

export const MainNavigator = () => {
    return (        
        <Tab.Navigator initialRouteName='Login' >
            <Tab.Screen name="Home" component={HomeNavigator}
                        options={ screenTabConfig(<HomeFill color='#293462'/>, <HomeIcon color='#293462'/>) } />
            <Tab.Screen name="New Transaction" component={TransactionNavigator}
                        options={ screenTabConfig(<DocumentFill color='#293462'/>, <DocumentPlusIcon color='#293462'/>, false) } />
            <Tab.Screen name="Profile" component={ProfileScreen}
                        options={ screenTabConfig(<UserFill color='#293462'/>, <UserIcon color='#293462'/>, false) } />
        </Tab.Navigator>
    );
}