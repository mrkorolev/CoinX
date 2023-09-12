import React from 'react';
import { View, StyleSheet} from 'react-native';

import { PrimaryDetails } from '../../components/profile/PrimaryDetails';
import { SecondaryDetails } from '../../components/profile/SecondaryDetails';

const profileCategories = [['Phone number', '+1 (603) 555-0123'], ['Email', 'name@gmail.com'], ['Address', '911 wano island. 1075']]

export const ProfileScreen = () => {
    const profileFields = profileCategories.map(category => {
        return <SecondaryDetails key={category} data={category} />
    });

    return (
        <View style={styles.layout}>
            <PrimaryDetails name='Name' surname='Surname'/>
            <View style={{ flex: 1, padding: 50 }}>
                {profileFields}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    }
});