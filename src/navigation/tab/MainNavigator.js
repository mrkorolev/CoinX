import React, {useContext} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Platform, View} from 'react-native';
import { HomeNavigator } from '../home/HomeNavigator';
import { TransactionNavigator } from '../transaction/TransactionNavigation';
import { SettingsNavigator } from "../settings/SettingsNavigator";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import {faQrcode, faTent, faCog, faGear} from "@fortawesome/free-solid-svg-icons";

import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import {FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { i18n } from "../../localization/i18n";
import {AppContext} from "../../global/AppContext";
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {

    const { theme } = useContext(AppContext);

    const hideTabBar = (route, tabHiddenScreens, fallbackScreen) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? fallbackScreen;
        return tabHiddenScreens.includes(routeName);
    }

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarLabelStyle: {
                fontSize: wp('2.8%'),
                paddingBottom: Platform.OS === 'ios' ? hp('0.5%') : hp('3%')
            },
            // tabBarBackground: () => theme.tabBgColor,
            // tabBarStyle: {
            //     backgroundColor: theme.tabBgColor,
            //     height: hp('12%'),
            //     borderTopWidth: 0
            // },
            tabBarItemStyle: {
                paddingTop: hp('1.5%'),
            },
            tabBarActiveTintColor: theme.activeTintColor,
            tabBarInactiveTintColor: theme.inactiveTintColor
        }}>
            <Tab.Screen
                name={i18n.t('screens.home.screen_name')}
                component={HomeNavigator}
                options={({route}) => ({
                    tabBarIcon: ({focused}) => focused ?
                        <FontAwesomeIcon icon={faTent} color={theme.activeTintColor} size={wp('6%')} /> :
                        <FontAwesomeIcon icon={faTent} color={theme.inactiveTintColor} size={wp('6%')} />,
                    tabBarIconStyle: {
                        marginTop: hp('1%')
                    },
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
                            <FontAwesomeIcon icon={faQrcode} color={theme.qrColor} size={wp('6%')} />
                        </View>
                    ),
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
                component={SettingsNavigator}
                options={({route}) => ({
                    tabBarIcon: ({focused}) => focused ?
                        <FontAwesomeIcon icon={faGear} color={theme.activeTintColor} size={wp('6%')} /> :
                        <FontAwesomeIcon icon={faGear} color={theme.inactiveTintColor} size={wp('6%')} />,
                    tabBarIconStyle: {
                        marginTop: hp('1%')
                    },
                    tabBarStyle: {
                        backgroundColor: theme.tabBgColor,
                        height: hp('12%'),
                        borderTopWidth: 0,
                        position: 'absolute',
                        display: hideTabBar(route, ['PROFILE', 'TERMS_OF_USE', 'PRIVACY', 'ABOUT'], 'SETTINGS') ? 'none' : 'flex'
                    }
                })} />
        </Tab.Navigator>
    );
}
