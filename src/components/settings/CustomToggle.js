import React, {useEffect, useState} from "react";
import {Appearance, Switch} from "react-native";

export const CustomToggle = ({ value, onValueToggle }) => {

    return (
        <Switch
            trackColor={{false: '#767577', true: 'lightgreen'}}
            thumbColor={'#f4f3f4'}
            onValueChange={onValueToggle}
            value={value}
        />
    );
}
