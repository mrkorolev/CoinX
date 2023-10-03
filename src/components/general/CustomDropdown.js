import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput} from "react-native";
import {Dropdown} from "react-native-element-dropdown";

// Responsiveness:
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const CustomDropdown = ({ data, value, onChangeHandler, borderWidth }) => {
    const [isFocus, setIsFocus] = useState(false);

    return (
        <Dropdown
            style={[styles.dropdownContainer, {borderWidth: borderWidth}]}
            placeholderStyle={{ fontSize: 16 }}
            selectedTextStyle={styles.selectedTextStyle}
            data={data}
            maxHeight={50}
            labelField='nameShort'
            valueField='nameShort'
            placeholder={!isFocus ? 'Select' : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={onChangeHandler}
        />
    );
}

const styles = StyleSheet.create({
    dropdownContainer: {
        height: 55,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: '2%',
        width: wp('23%')
    },
    selectedTextStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#293462'
    }
});
