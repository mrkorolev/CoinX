import React, { useContext, useEffect, useState } from 'react';
import {ScrollView, StyleSheet, View, Text, RefreshControl, Alert} from 'react-native';
import { HistoryRecord } from '../../components/history/HistoryRecord';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AppContext } from "../../config/context/AppContext";
import { depositHistoryRequest } from "../../services/payone";
import { i18n } from "../../config/localization/i18n";

export const HistoryScreen = ({ navigation }) => {

    const { theme, themeName, accessToken } = useContext(AppContext);
    const [history, setHistory] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const screen = 'screens.history';

    useEffect(() => {
        navigation.addListener('focus', () => {
            getDepositHistoryData();
        });

        return () => {
            navigation.removeListener('focus');
        }
    }, [navigation]);

    const createNotifications = (deposits) => {
        return deposits
            .sort((h1, h2) => h2.start_timestamp - h1.start_timestamp)
            .map(element => <HistoryRecord key={element.id} notification={element} navigation={navigation} />);
    }

    const getDepositHistoryData = async () => {
        const historyResponse = await depositHistoryRequest(accessToken);
        console.log(historyResponse.data);
        if(historyResponse && historyResponse.status === 200){
            setHistory(historyResponse.data);
        }
        return historyResponse.status;
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.screenBgColor }]}>
            {history ?
                <ScrollView
                    indicatorStyle={themeName === 'light' ? 'black' : 'white'}
                    showsVerticalScrollIndicator
                    horizontal={false}
                    refreshControl={
                        <RefreshControl
                            tintColor={theme.primaryContentColor}
                            refreshing={refreshing} onRefresh={async () => {
                            setRefreshing(true);
                            let status = await getDepositHistoryData();
                            if(status === 200){
                                setRefreshing(false);
                            }else{
                                setTimeout(() => {
                                    setRefreshing(false);
                                    Alert.alert(i18n.t('request_errors.history_request.reason'), i18n.t('request_errors.history_request.message'));
                                }, 5000);
                            }
                        }} />
                    }>
                    {createNotifications(history)}
                </ScrollView> :
                <Text style={{color: theme.primaryContentColor, fontSize: wp('3.5%')}}>{i18n.t(`${screen}.waiting_message`)}</Text>
            }
        </View>
    );
}

const styles  = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
