import React, {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TransactionScreen } from '../../screens/transaction/amount/TransactionScreen';
import { QrScreen } from '../../screens/transaction/qr/QrScreen';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {i18n} from "../../localization/i18n";
import {CustomHeader} from "../../components/general/CustomHeader";
import {CustomBackButton} from "../../components/general/CustomBackButton";
import {ChevronLeftIcon} from "react-native-heroicons/solid";
import { Platform } from "react-native";
import {AppContext} from "../../global/AppContext";

const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator();

export const TransactionNavigator = () => {

    const { theme } = useContext(AppContext);

    return (
        <Stack.Navigator screenOptions={{
            // gestureEnabled: false,
            headerShadowVisible: false
        }}>
            <Stack.Screen
                name='TRANSACTION'
                component={TransactionScreen}
                options={{
                    headerTitle: () => <CustomHeader title={i18n.t('screens.transaction.screen_name')}/>,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: theme.screenBgColor
                    }
                }}/>
            <Stack.Screen
                name='QR'
                component={QrScreen}
                options={({navigation}) => ({
                    headerTitle: () => <CustomHeader title={i18n.t('screens.qr_code.screen_name')}/>,
                    headerLeft: () => Platform.OS === 'ios' ?
                        <CustomBackButton onPressHandler={() => navigation.goBack()}/> : undefined,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: theme.screenBgColor
                    }
                })}/>
        </Stack.Navigator>
    );
}
