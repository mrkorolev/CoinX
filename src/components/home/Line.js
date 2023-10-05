import React from 'react';
import { View } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const Line = ({ backgroundColor }) => (
    <View style={{ width: wp('20%'), height: hp('0.25%'), backgroundColor: `${backgroundColor}` }} />
);

