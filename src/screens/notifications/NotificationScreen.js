import React, {useContext, useEffect, useState} from 'react';
import { ScrollView, StyleSheet, View, Text, RefreshControl } from 'react-native';
import { Notification } from '../../components/notifications/Notification';

// Responsiveness:
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {AppContext} from "../../global/AppContext";
import {depositHistoryRequest} from "../../services/authentication";

export const NotificationScreen = ({ navigation }) => {

    const { theme, themeName, accessToken } = useContext(AppContext);
    const [history, setHistory] = useState();

    const createNotifications = (deposits) => {
        return deposits
            .sort((h1, h2) => h2.start_timestamp - h1.start_timestamp)
            .map(element => <Notification key={element.id} notification={element} navigation={navigation}/>);
    }

    // Create a refresh function right here!

    useEffect(() => {
        const getDepositHistoryData = async () => {
            const historyResponse = await depositHistoryRequest(accessToken);
            console.log(historyResponse.data);
            if(historyResponse && historyResponse.status === 200){
                setHistory(historyResponse.data);
            }
        }
        getDepositHistoryData();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: theme.screenBgColor }]}>
            {history ?
                <ScrollView
                    indicatorStyle={themeName === 'light' ? 'black' : 'white'}
                    showsVerticalScrollIndicator
                    horizontal={false}
                    // refreshControl={
                    //     <RefreshControl refreshing={true} onRefresh={} />
                    // } >
                    >
                    {createNotifications(history)}
                </ScrollView> :
                <Text style={{color: theme.primaryContentColor, fontSize: wp('3.5%')}}>No history to display just yet...</Text>
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
