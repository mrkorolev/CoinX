import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, View } from 'react-native';
import { HomeStack } from './app/HomeStack';
import { TransactionNavigator } from './app/TransactionStack';
import { SettingStack } from "./app/SettingStack";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { i18n } from "../config/localization/i18n";
import { AppContext } from "../config/context/AppContext";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { HomeTab } from "../components/general/icons/HomeTab";
import { ScanTabBarIcon } from "../components/general/icons/ScanTab";
import { SettingsTab } from "../components/general/icons/SettingsTab";

const Tab = createBottomTabNavigator();

export const TabsNavigator = ({navigation}) => {

    const { theme, setAccessToken } = useContext(AppContext);
    const hideTabBar = (route, tabHiddenScreens, fallbackScreen) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? fallbackScreen;
        return tabHiddenScreens.includes(routeName);
    }

    // MAY NEED REFACTORING
    // setTimeout(() => {
    //     setAccessToken(undefined);
    //     navigation.navigate('Login');
    // }, 30000);

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarLabelStyle: {
                fontSize: wp('2.8%'),
                paddingBottom: Platform.OS === 'ios' ? hp('0.5%') : hp('3%')
            },
            tabBarItemStyle: {
                paddingTop: hp('1.5%'),
            },
            tabBarActiveTintColor: theme.activeTintColor,
            tabBarInactiveTintColor: theme.inactiveTintColor
        }}>
            <Tab.Screen
                name={i18n.t('screens.home.screen_name')}
                component={HomeStack}
                options={({route}) => ({
                    tabBarIcon: ({focused}) => focused ?
                        <HomeTab color={theme.activeTintColor} bgColor={theme.tabBgColor} size={wp('6.5%')} /> :
                        <HomeTab color={theme.inactiveTintColor} bgColor={theme.tabBgColor} size={wp('6.5%')} />,
                    tabBarIconStyle: {
                        marginTop: hp('1%')
                    },
                    tabBarHideOnKeyboard: true,
                    tabBarStyle: {
                        position: 'absolute',
                        backgroundColor: theme.tabBgColor,
                        height: hp('12%'),
                        borderTopWidth: 0,
                        display: hideTabBar(route, ['DEPOSIT_HISTORY', 'QR_HISTORY']) ? 'none' : 'flex'
                    }
                })}/>
            <Tab.Screen
                name={i18n.t('screens.transaction.screen_name')}
                component={TransactionNavigator}
                options={({route}) => ({
                    tabBarIcon: () => (
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: wp('14%'),
                            height: wp('14%'),
                            borderRadius: wp('14%')/2,
                            backgroundColor: theme.qrBgColor }}>
                            <ScanTabBarIcon color={theme.qrColor} size={wp('7%')}/>
                        </View>
                    ),
                    tabBarHideOnKeyboard: true,
                    tabBarLabel: '',
                    tabBarIconStyle: {
                        marginTop: hp('0.25%')
                    },
                    tabBarStyle: {
                        position: 'absolute',
                        backgroundColor: theme.tabBgColor,
                        height: hp('12%'),
                        borderTopWidth: 0,
                        display: hideTabBar(route, ['QR_DETAILS']) ? 'none' : 'flex'
                    }
                })} />
            <Tab.Screen
                name={i18n.t('screens.settings.screen_name')}
                component={SettingStack}
                options={({route}) => ({
                    tabBarIcon: ({focused}) => focused ?
                        <SettingsTab color={theme.activeTintColor} bgColor={theme.tabBgColor} size={wp('6.5%')} /> :
                        <SettingsTab color={theme.inactiveTintColor} bgColor={theme.tabBgColor} size={wp('6.5%')} />,
                    tabBarIconStyle: {
                        marginTop: hp('1%')
                    },
                    tabBarStyle: {
                        backgroundColor: theme.tabBgColor,
                        height: hp('12%'),
                        borderTopWidth: 0,
                        position: 'absolute',
                        display: hideTabBar(route, ['PROFILE', 'LANGUAGE', 'TERMS_OF_USE', 'PRIVACY', 'ABOUT'], 'SETTINGS') ? 'none' : 'flex'
                    }
                })} />
        </Tab.Navigator>
    );
}
