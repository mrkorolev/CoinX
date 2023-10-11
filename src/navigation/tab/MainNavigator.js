import React from 'react';
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

const Tab = createBottomTabNavigator();
const screenTabConfig = (activeIcon, inactiveIcon) => {
    return {
        // tabBarShowLabel: false,
        tabBarIcon: ({focused}) => focused ? activeIcon : inactiveIcon ,
        tabBarIconStyle: {
          marginTop: hp('1%')
        },
        tabBarActiveTintColor: '#293462',
        tabBarInactiveTintColor: 'gray',
    }
}

export const MainNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {
                height: hp('12%'),
            },
            tabBarLabelStyle: {
                fontSize: wp('2.8%'),
                paddingBottom: Platform.OS === 'ios' ? hp('0.75%') : hp('3%')
            },
            tabBarItemStyle: {
                paddingTop: hp('1.5%')
            }
        }}>
            <Tab.Screen
                name={i18n.t('screens.home.screen_name')}
                component={HomeNavigator}
                options={ screenTabConfig(<FontAwesomeIcon icon={faTent} color={'#293462'} size={wp('6%')} />, <FontAwesomeIcon icon={faTent} color={'gray'} size={wp('6%')} />) }/>
            <Tab.Screen
                name={i18n.t('screens.transaction.screen_name')}
                component={TransactionNavigator}
                options={{
                    tabBarIcon: () => (
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: wp('14%'), height: wp('14%'), borderRadius: wp('14%')/2, backgroundColor: '#293462' }}>
                            <FontAwesomeIcon icon={faQrcode} color={'white'} size={wp('6%')} />
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
                        <FontAwesomeIcon icon={faCog} color={'#293462'} size={wp('6%')} />,
                        <FontAwesomeIcon icon={faCog} color={'gray'} size={wp('6%')} />)
                }/>
        </Tab.Navigator>
    );
}
