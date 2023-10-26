import React, {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../../screens/home/HomeScreen';
import { NotificationScreen } from '../../screens/notifications/NotificationScreen';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { showNotifications } from "../../services/navigation";
import { i18n } from "../../localization/i18n";
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { CustomHeader } from "../../components/general/components/CustomHeader";
import { CustomHeaderIcon } from "../../components/general/components/CustomHeaderIcon";
import { CustomBackButton } from "../../components/general/components/CustomBackButton";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faHeadset, faShuffle} from "@fortawesome/free-solid-svg-icons";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {faBell} from "@fortawesome/free-regular-svg-icons";
import {AppContext} from "../../global/AppContext";
import {QrScreen} from "../../screens/transaction/qr/QrScreen";

const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator();

export const HomeNavigator = () => {

    const { theme } = useContext(AppContext);

    return (
        <Stack.Navigator screenOptions={{
            headerShadowVisible: false
        }}>
            <Stack.Screen
                name={`HOME`}
                component={ HomeScreen }
                options={({navigation}) => ({
                    headerTitle: () => <CustomHeader title={i18n.t('screens.home.screen_name')} />,
                    headerRight: () => (
                        <View style={styles.headerRightLayout}>
                            <CustomHeaderIcon
                                icon={faHeadset}
                                onPressHandler={() => {}}
                            />

                            <View>
                                <CustomHeaderIcon
                                    customStyle={styles.iconContainer}
                                    icon={faBell}
                                    onPressHandler={() => {}}
                                    notifiable
                                />
                            </View>

                            <CustomHeaderIcon
                                icon={faShuffle}
                                onPressHandler={() => navigation.navigate('DEPOSIT_HISTORY')}
                            />
                        </View>
                    ),
                    headerLeft: () => {},
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: theme.screenBgColor
                    }
                })}/>
            <Stack.Screen
                name={`DEPOSIT_HISTORY`}
                component={ NotificationScreen }
                options={({navigation}) => ({
                    headerTintColor: theme.primaryContentColor,
                    headerTitle: () => <CustomHeader title={i18n.t('screens.history.screen_name')} />,
                    headerLeft: () => Platform.OS === 'ios' ? <CustomBackButton onPressHandler={() => navigation.goBack()} /> : undefined,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: theme.screenBgColor
                    }
                })}/>
            <Stack.Screen
                name={'QR_HISTORY'}
                component={ QrScreen }
                options={({navigation}) => ({
                    headerTintColor: theme.primaryContentColor,
                    headerTitle: () => <CustomHeader title={i18n.t('screens.qr_code.screen_name')} />,
                    headerLeft: () => Platform.OS === 'ios' ? <CustomBackButton onPressHandler={() => navigation.goBack()} /> : undefined,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: theme.screenBgColor
                    }
                })} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    headerRightLayout: {
        flexDirection: 'row',
        gap: wp('4.5%'),
        paddingRight: wp('2%')
    }
});
