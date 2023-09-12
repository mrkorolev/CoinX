import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Notification } from '../../components/notifications/Notification';

export const NotificationScreen = () => {

    const data = [
          {
            timestamp: "09:00 AM",
            title: "Received",
            body: "Transaction completed successfully",
            status: "success"
          },
          {
            timestamp: "01:30 PM",
            title: "Sent",
            body: "Funds transferred to recipient",
            status: "success"
          },
          {
            timestamp: "10:45 AM",
            title: "Received",
            body: "Payment received from client",
            status: "success"
          },
          {
            timestamp: "07:15 PM",
            title: "Sent",
            body: "Transaction failed due to insufficient funds",
            status: "failure"
          },
          {
            timestamp: "09:00 AM",
            title: "Received",
            body: "Transaction completed successfully",
            status: "success"
          },
          {
            timestamp: "01:30 PM",
            title: "Sent",
            body: "Funds transferred to recipient",
            status: "success"
          },
          {
            timestamp: "10:45 AM",
            title: "Received",
            body: "Payment received from client",
            status: "success"
          },
          {
            timestamp: "07:15 PM",
            title: "Sent",
            body: "Transaction failed due to insufficient funds",
            status: "failure"
          },
          {
            timestamp: "09:00 AM",
            title: "Received",
            body: "Transaction completed successfully",
            status: "success"
          },
          {
            timestamp: "01:30 PM",
            title: "Sent",
            body: "Funds transferred to recipient",
            status: "success"
          },
          {
            timestamp: "10:45 AM",
            title: "Received",
            body: "Payment received from client",
            status: "success"
          },
          {
            timestamp: "07:15 PM",
            title: "Sent",
            body: "Transaction failed due to insufficient funds",
            status: "failure"
          },
          {
            timestamp: "09:00 AM",
            title: "Received",
            body: "Transaction completed successfully",
            status: "success"
          },
          {
            timestamp: "01:30 PM",
            title: "Sent",
            body: "Funds transferred to recipient",
            status: "success"
          },
          {
            timestamp: "10:30 AM",
            title: "Received",
            body: "Transaction completed successfully. Funds transferred.",
            status: "info"
          },
          {
            timestamp: "02:15 PM",
            title: "Sent",
            body: "Your payment has been processed and sent to the recipient.",
            status: "info"
          },
          {
            timestamp: "10:45 AM",
            title: "Received",
            body: "Payment received from client",
            status: "success"
          },
          {
            timestamp: "07:15 PM",
            title: "Sent",
            body: "Transaction failed due to insufficient funds",
            status: "failure"
          },
          {
            timestamp: "08:45 AM",
            title: "Received",
            body: "Important notice: Scheduled maintenance on our platform.",
            status: "info"
          },
          {
            timestamp: "09:00 AM",
            title: "Received",
            body: "Transaction completed successfully",
            status: "success"
          },
          {
            timestamp: "01:30 PM",
            title: "Sent",
            body: "Funds transferred to recipient",
            status: "success"
          },
          {
            timestamp: "10:45 AM",
            title: "Received",
            body: "Payment received from client",
            status: "success"
          },
          {
            timestamp: "07:15 PM",
            title: "Sent",
            body: "Transaction failed due to insufficient funds",
            status: "failure"
          },
          {
            timestamp: "10:30 AM",
            title: "Received",
            body: "Transaction completed successfully. Funds transferred.",
            status: "info"
          },
          {
            timestamp: "02:15 PM",
            title: "Sent",
            body: "Your payment has been processed and sent to the recipient.",
            status: "info"
          },
          {
            timestamp: "08:45 AM",
            title: "Received",
            body: "Important notice: Scheduled maintenance on our platform.",
            status: "info"
          },
          {
            timestamp: "04:20 PM",
            title: "Sent",
            body: "Your account has been credited with the specified amount.",
            status: "info"
          },
          {
            timestamp: "11:00 AM",
            title: "Received",
            body: "New features are now available. Check them out!",
            status: "info"
          },
          {
            timestamp: "07:30 AM",
            title: "Sent",
            body: "Thank you for using our services. Have a great day!",
            status: "info"
          },
          {
            timestamp: "03:10 PM",
            title: "Received",
            body: "Please review your recent transactions for accuracy.",
            status: "info"
          },
          {
            timestamp: "09:45 AM",
            title: "Sent",
            body: "Security alert: Update your password for enhanced safety.",
            status: "info"
          },
          {
            timestamp: "12:20 PM",
            title: "Received",
            body: "Stay informed: Subscribe to our newsletter for updates.",
            status: "info"
          },
          {
            timestamp: "06:50 AM",
            title: "Sent",
            body: "Upgrade your account to unlock premium features.",
            status: "info"
          }
    ];

    const notifications = 
        data.sort((a,b) => a.timestamp < b.timestamp)
            .map(element => <Notification key={element.timestamp} notification={element}/>);

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
        backgroundColor: 'white'
    }
});