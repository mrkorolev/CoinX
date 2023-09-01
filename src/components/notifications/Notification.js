import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { InboxArrowDownIcon, CheckCircleIcon, BackspaceIcon } from 'react-native-heroicons/solid';

export const Notification = ( {notification} ) => {

    let backgroundStatus = 'white'
    let icon = <InboxArrowDownIcon color='black'/>;
    switch(notification.status){
        case 'success':
            backgroundStatus = '#DCFFE9'
            icon = <CheckCircleIcon color='black'/>
            break;
        case 'failure':
            backgroundStatus = 'mistyrose'
            icon = <BackspaceIcon color='black'/>
            break;
        default:
            break;
    }

    return (
        <View>
            <View style={[styles.container, {backgroundColor: `${backgroundStatus}`}]}>
                {icon}
                <View style={{ flex: 0.075 }} />
                <View style={{ flex: 1, alignItems: 'flex-start'}}>
                    <Text style={styles.primaryText}>{notification.title}</Text>  
                    <Text style={styles.secondaryText}>{notification.body}</Text>
                </View>
                {/* <View style={{ flex: 0.075 }} /> */}
                <Text style={{ fontSize: 11}}>{notification.timestamp}</Text>
            </View>
            <View style={{ width: Dimensions.get('window').width, height: 0.5, backgroundColor: 'lightgray' }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 15
    },
    primaryText: {
        fontSize: 13,
        fontWeight: 'bold'
    },
    secondaryText: {
        fontSize: 9,
        color: 'gray',
        paddingTop: 5
    }
});