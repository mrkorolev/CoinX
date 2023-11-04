import React, {useContext} from 'react';
import { ProfileScreen } from "../../screens/settings/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { i18n } from "../../config/localization/i18n";
import { CustomHeader } from "../../components/general/components/CustomHeader";
import { SettingsScreen } from "../../screens/settings/SettingsScreen";
import { TermsAndConditionsScreen } from "../../screens/settings/TermsAndConditionsScreen";
import { PrivacyPolicyScreen } from "../../screens/settings/PrivacyPolicyScreen";
import { CustomBackButton } from "../../components/general/components/CustomBackButton";
import { AboutScreen } from "../../screens/settings/AboutScreen";
import { Platform } from "react-native";
import { AppContext } from "../../config/context/AppContext";
import { LanguageScreen } from "../../screens/settings/LanguageScreen";

const Stack = createNativeStackNavigator();

export const SettingStack = () => {

    const { theme } = useContext(AppContext);

    return (
        <Stack.Navigator screenOptions={{
            // gestureEnabled: false,
            headerShadowVisible: false,
            headerLeft: () => {},
        }}>
            <Stack.Screen
                name='SETTINGS'
                component={SettingsScreen}
                options={{
                    headerTitle: () => <CustomHeader title={i18n.t('screens.settings.screen_name')} />,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: theme.screenBgColor
                    }
                }}/>
            <Stack.Screen
                name='PROFILE'
                component={ProfileScreen}
                options={({navigation}) => ({
                    headerTintColor: theme.primaryContentColor,
                    headerLeft: () => Platform.OS === 'ios' ? <CustomBackButton onPressHandler={() => navigation.goBack()} /> : undefined,
                    headerTitle: () => <CustomHeader title={i18n.t('screens.profile.screen_name')} />,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: theme.screenBgColor
                    }
                })}/>
            <Stack.Screen
                name='LANGUAGE'
                component={LanguageScreen}
                options={({navigation}) => ({
                    headerTintColor: theme.primaryContentColor,
                    headerLeft: () => Platform.OS === 'ios' ? <CustomBackButton onPressHandler={() => navigation.goBack()} /> : undefined,
                    headerTitle: () => <CustomHeader title={i18n.t('screens.language.screen_name')} />,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: theme.screenBgColor
                    }
                })}/>
            <Stack.Screen
                name='TERMS_OF_USE'
                component={TermsAndConditionsScreen}
                options={({navigation}) => ({
                    headerTintColor: theme.primaryContentColor,
                    headerLeft: () => Platform.OS === 'ios' ? <CustomBackButton onPressHandler={() => navigation.goBack()} /> : undefined,
                    headerTitle: () => <CustomHeader title={i18n.t('screens.terms_and_conditions.screen_name')} />,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: theme.screenBgColor
                    }
                })}/>
            <Stack.Screen
                name='PRIVACY'
                component={PrivacyPolicyScreen}
                options={({navigation}) => ({
                    headerTintColor: theme.primaryContentColor,
                    headerLeft: () => Platform.OS === 'ios' ? <CustomBackButton onPressHandler={() => navigation.goBack()} /> : undefined,
                    headerTitle: () => <CustomHeader title={i18n.t('screens.privacy_policy.screen_name')} />,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: theme.screenBgColor
                    }
                })}/>
            <Stack.Screen
                name='ABOUT'
                component={AboutScreen}
                options={({navigation}) => ({
                    headerTintColor: theme.primaryContentColor,
                    headerLeft: () => Platform.OS === 'ios' ? <CustomBackButton onPressHandler={() => navigation.goBack()} /> : undefined,
                    headerTitle: () => <CustomHeader title={i18n.t('screens.about.screen_name')} />,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: theme.screenBgColor
                    },

                })}/>
        </Stack.Navigator>
    );
}
