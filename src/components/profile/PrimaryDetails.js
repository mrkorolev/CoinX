import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EditButton } from './EditButton';

export const PrimaryDetails = ({ name }) => {
    return (
        <View style={styles.primaryDetails}>
            <View style={styles.profileImagePlaceholder}>
                {/*<EditButton />*/}
            </View>
            <Text style={styles.primaryTitle}>{name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    primaryTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#293462'
    },
    primaryDetails: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileImagePlaceholder: {
        width: 200,
        height: 200,
        borderRadius: 200 / 2,
        backgroundColor: 'slategray',
        marginBottom: 10,
        marginTop: 40,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    }
});