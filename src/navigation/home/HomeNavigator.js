import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../../screens/home/HomeScreen';
import { NotificationScreen } from '../../screens/notifications/NotificationScreen';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { showNotifications } from "../../services/navigation";
import { i18n } from "../../localization/i18n";
import { Text, TouchableOpacity, Platform } from 'react-native';
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { CustomHeader } from "../../components/general/CustomHeader";
import { NotificationAlert } from "../../components/general/NotificationAlert";
import { CustomBackButton } from "../../components/general/CustomBackButton";

const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator();

export const HomeNavigator = () => (
    <Stack.Navigator screenOptions={{
        gestureEnabled: false
    }}>
        <Stack.Screen
            name={`${i18n.t('screens.home.screen_name')}`}
            component={ HomeScreen }
            options={({navigation}) => ({
                headerTitle: () => <CustomHeader title={i18n.t('screens.home.screen_name')} />,
                headerRight: () => <NotificationAlert onPressHandler={() => navigation.navigate(i18n.t('screens.notifications.screen_name'))} hasUnread={true}  />,
                headerLeft: () => {},
                headerTitleAlign: 'center'
            })}/>
        <Stack.Screen
            name={`${i18n.t('screens.notifications.screen_name')}`}
            component={ NotificationScreen }
            options={({navigation}) => ({
                headerTitle: () => <CustomHeader title={i18n.t('screens.notifications.screen_name')} />,
                headerLeft: () => Platform.OS === 'ios' ? <CustomBackButton onPressHandler={() => navigation.goBack()} icon={<ChevronLeftIcon color='#293462' />} /> : undefined,
                headerTitleAlign: 'center'
            })}/>
    </Stack.Navigator>
);
