import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from "../../screens/profile/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { showNotifications } from "../../services/navigation";
import {i18n} from "../../localization/i18n";
import {CustomHeader} from "../../components/general/CustomHeader";

const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator();

export const ProfileNavigator = () => (
    <Stack.Navigator screenOptions={{ gestureEnabled: false, headerLeft: () => {} }}>
        <Stack.Screen
            name={`${i18n.t('screens.profile.screen_name')}`}
            component={ProfileScreen}
            options={{
                headerTitle: () => <CustomHeader title={i18n.t('screens.profile.screen_name')} />,
                headerTitleAlign: 'center'
            }}/>
    </Stack.Navigator>
);
