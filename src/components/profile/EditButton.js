import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { PencilSquareIcon } from 'react-native-heroicons/solid';

export const EditButton= () => {
    return (
        <TouchableOpacity onPress={() => {alert('Change profile requested!')}}>
            <View style={styles.editButton}>
                <PencilSquareIcon color='#293462' />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    editButton: {
        width: 70,
        height: 70,
        backgroundColor: 'whitesmoke',
        borderWidth: 6,
        borderRadius: 70 / 2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    }
});