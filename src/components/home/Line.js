import React from 'react';
import { View } from 'react-native';

export const Line = ({ backgroundColor }) => (
    <View style={{width: 100, height: 2, backgroundColor: `${backgroundColor}` }} />
);

