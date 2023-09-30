import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TransactionScreen } from '../../screens/transaction/amount/TransactionScreen';
import { QrScreen } from '../../screens/transaction/qr/QrScreen';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {i18n} from "../../localization/i18n";
import {CustomHeader} from "../../components/general/CustomHeader";
import {CustomBackButton} from "../../components/general/CustomBackButton";
import {ChevronLeftIcon} from "react-native-heroicons/solid";

const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator();

export const TransactionNavigator = () => (
    <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
        <Stack.Screen
            name={`${i18n.t('transaction.screen_name')}`}
            component={TransactionScreen}
            options={{
                headerTitle: () => <CustomHeader title={i18n.t('transaction.screen_name')} />
            }}/>
        <Stack.Screen
            name={`${i18n.t('qr_code.screen_name')}`}
            component={QrScreen}
            options={({navigation}) => ({
                headerTitle: () => <CustomHeader title={i18n.t('qr_code.screen_name')} />,
                headerLeft: () => <CustomBackButton onPressHandler={() => navigation.goBack()} icon={<ChevronLeftIcon color='#293462' />} />
            })}/>
    </Stack.Navigator>
);
