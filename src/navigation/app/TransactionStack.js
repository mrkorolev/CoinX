import React, {useContext} from 'react';
import { TransactionScreen } from '../../screens/transaction/TransactionScreen';
import { QrScreen } from '../../screens/transaction/QrScreen';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { i18n } from "../../config/localization/i18n";
import { CustomHeader } from "../../components/general/components/CustomHeader";
import { CustomBackButton } from "../../components/general/components/CustomBackButton";
import { Platform } from "react-native";
import { AppContext } from "../../config/context/AppContext";

const Stack = createNativeStackNavigator();

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
                name='QR_DETAILS'
                component={QrScreen}
                options={({navigation}) => ({
                    headerTintColor: theme.primaryContentColor,
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
