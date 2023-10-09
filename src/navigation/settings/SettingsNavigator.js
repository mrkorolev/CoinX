import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from "../../screens/settings/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { showNotifications } from "../../services/navigation";

import {i18n} from "../../localization/i18n";
import { CustomHeader } from "../../components/general/CustomHeader";
import {SettingScreen} from "../../screens/settings/SettingScreen";
import {TermsAndConditionsScreen} from "../../screens/settings/TermsAndConditionsScreen";
import {PrivacyPolicyScreen} from "../../screens/settings/PrivacyPolicyScreen";
import {CustomBackButton} from "../../components/general/CustomBackButton";
import {AboutScreen} from "../../screens/settings/AboutScreen";
import {Platform} from "react-native";

const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator();

// First screen is to become a navigator screen (subsequent navigation to other screens is to follow)
export const SettingsNavigator = () => (
    <Stack.Navigator screenOptions={{
        gestureEnabled: false,
        headerShadowVisible: false,
        headerLeft: () => {},
    }}>
        <Stack.Screen
            name={`${i18n.t('screens.settings.screen_name')}`}
            component={SettingScreen}
            options={{
                headerTitle: () => <CustomHeader title={i18n.t('screens.settings.screen_name')} />,
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: 'whitesmoke'
                }
            }}/>
        <Stack.Screen
            name={`${i18n.t('screens.profile.screen_name')}`}
            component={ProfileScreen}
            options={({navigation}) => ({
                headerLeft: () => Platform.OS === 'ios' ? <CustomBackButton onPressHandler={() => navigation.goBack()} /> : undefined,
                headerTitle: () => <CustomHeader title={i18n.t('screens.profile.screen_name')} />,
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: 'whitesmoke'
                },

            })}/>
        <Stack.Screen
            name={`${i18n.t('screens.terms_and_conditions.screen_name')}`}
            component={TermsAndConditionsScreen}
            options={({navigation}) => ({
                headerLeft: () => Platform.OS === 'ios' ? <CustomBackButton onPressHandler={() => navigation.goBack()} /> : undefined,
                headerTitle: () => <CustomHeader title={i18n.t('screens.terms_and_conditions.screen_name')} />,
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: 'whitesmoke'
                },
            })}/>
        <Stack.Screen
            name={`${i18n.t('screens.privacy_policy.screen_name')}`}
            component={PrivacyPolicyScreen}
            options={({navigation}) => ({
                headerLeft: () => Platform.OS === 'ios' ? <CustomBackButton onPressHandler={() => navigation.goBack()} /> : undefined,
                headerTitle: () => <CustomHeader title={i18n.t('screens.privacy_policy.screen_name')} />,
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: 'whitesmoke'
                },
            })}/>
        <Stack.Screen
            name={`${i18n.t('screens.about.screen_name')}`}
            component={AboutScreen}
            options={({navigation}) => ({
                headerLeft: () => Platform.OS === 'ios' ? <CustomBackButton onPressHandler={() => navigation.goBack()} /> : undefined,
                headerTitle: () => <CustomHeader title={i18n.t('screens.about.screen_name')} />,
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: 'whitesmoke'
                },
            })}/>
    </Stack.Navigator>
);
