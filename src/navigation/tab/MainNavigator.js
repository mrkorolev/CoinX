import React, {useContext} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Platform, View} from 'react-native';
import { HomeNavigator } from '../home/HomeNavigator';
import { TransactionNavigator } from '../transaction/TransactionNavigation';
import { SettingsNavigator } from "../settings/SettingsNavigator";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { faQrcode, faTent, faCog } from "@fortawesome/free-solid-svg-icons";

import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import {FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { i18n } from "../../localization/i18n";
import {AppContext} from "../../global/AppContext";

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {

    const { theme } = useContext(AppContext);

    const screenTabConfig = (activeIcon, inactiveIcon) => {
        return {
            // tabBarShowLabel: false,
            tabBarIcon: ({focused}) => focused ? activeIcon : inactiveIcon ,
            tabBarIconStyle: {
                marginTop: hp('1%')
            },
        }
    }

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarLabelStyle: {
                fontSize: wp('2.8%'),
                paddingBottom: Platform.OS === 'ios' ? hp('0.75%') : hp('3%')
            },
            tabBarStyle: {
                backgroundColor: theme.tabBgColor,
                height: hp('12%'),
                borderTopWidth: 0
            },
            tabBarItemStyle: {
                paddingTop: hp('1.5%')
            },
            tabBarActiveTintColor: theme.activeTintColor,
            tabBarInactiveTintColor: theme.inactiveTintColor
        }}>
            <Tab.Screen
                name={i18n.t('screens.home.screen_name')}
                component={HomeNavigator}
                options={ screenTabConfig(
                    <FontAwesomeIcon icon={faTent} color={theme.activeTintColor} size={wp('6%')} />,
                    <FontAwesomeIcon icon={faTent} color={theme.inactiveTintColor} size={wp('6%')} />) }/>
            <Tab.Screen
                name={i18n.t('screens.transaction.screen_name')}
                component={TransactionNavigator}
                options={{
                    tabBarIcon: () => (
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: wp('14%'), height: wp('14%'), borderRadius: wp('14%')/2, backgroundColor: theme.qrBgColor }}>
                            <FontAwesomeIcon icon={faQrcode} color={theme.qrColor} size={wp('6%')} />
                        </View>
                    ),
                    tabBarLabel: '',
                    tabBarIconStyle: {
                        marginTop: hp('0.25%')
                    },
                }}/>
            <Tab.Screen
                name={i18n.t('screens.settings.screen_name')}
                component={SettingsNavigator}
                options={
                    screenTabConfig(
                        <FontAwesomeIcon icon={faCog} color={theme.activeTintColor} size={wp('6%')} />,
                        <FontAwesomeIcon icon={faCog} color={theme.inactiveTintColor} size={wp('6%')} />)
                }/>
        </Tab.Navigator>
    );
}
