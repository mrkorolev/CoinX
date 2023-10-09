import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Notification } from '../../components/notifications/Notification';

// Responsiveness:
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const NotificationScreen = () => {

    const data = [
          {
            id: 0,
            timestamp: "09:00 AM",
            title: "Received",
            body: "Transaction completed successfully",
            status: "success"
          },
          {
            id: 1,
            timestamp: "01:30 PM",
            title: "Sent",
            body: "Funds transferred to recipient",
            status: "success"
          },
          {
            id: 2,
            timestamp: "10:45 AM",
            title: "Received",
            body: "Payment received from client",
            status: "success"
          },
          {
            id: 3,
            timestamp: "07:15 PM",
            title: "Sent",
            body: "Transaction failed due to insufficient funds",
            status: "failure"
          },
          {
            id: 4,
            timestamp: "09:00 AM",
            title: "Received",
            body: "Transaction completed successfully",
            status: "success"
          },
          {
            id: 5,
            timestamp: "01:30 PM",
            title: "Sent",
            body: "Funds transferred to recipient",
            status: "success"
          },
          {
            id: 6,
            timestamp: "10:45 AM",
            title: "Received",
            body: "Payment received from client",
            status: "success"
          },
          {
            id: 7,
            timestamp: "07:15 PM",
            title: "Sent",
            body: "Transaction failed due to insufficient funds",
            status: "failure"
          },
          {
            id: 8,
            timestamp: "09:00 AM",
            title: "Received",
            body: "Transaction completed successfully",
            status: "success"
          },
          {
            id: 9,
            timestamp: "01:30 PM",
            title: "Sent",
            body: "Funds transferred to recipient",
            status: "success"
          },
          {
            id: 10,
            timestamp: "10:45 AM",
            title: "Received",
            body: "Payment received from client",
            status: "success"
          },
          {
            id: 11,
            timestamp: "07:15 PM",
            title: "Sent",
            body: "Transaction failed due to insufficient funds",
            status: "failure"
          }
    ];

    const notifications =
        data.sort((a,b) => a.timestamp < b.timestamp)
            .map(element => <Notification key={element.id} notification={element}/>);

    return (
        <View style={styles.container}>
            <ScrollView>
                {notifications}
            </ScrollView>
        </View>
    );
}

const styles  = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'whitesmoke'
    }
});
