import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BellIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import {i18n} from "../../localization/i18n";

export const NotificationAlert = ({ hasUnread, onPressHandler }) => {
    const iconDimensions = 28
    const notWidth = iconDimensions - 3
    return (
        <View>
            <TouchableOpacity
                onPress={onPressHandler}>
                <BellIcon color='#293462' width={iconDimensions} height={iconDimensions} />
                <View style={{ position: 'absolute', alignItems: 'flex-end', width: notWidth, height: 25 }}>
                    {hasUnread ? <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#293462' }}/> : null}
                </View>
            </TouchableOpacity>
        </View>
    );
}
