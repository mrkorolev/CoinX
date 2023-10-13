import React, {useContext, useEffect, useState} from "react";
import {Appearance, Switch} from "react-native";
import {AppContext} from "../../global/AppContext";

export const CustomToggle = ({ value, onValueToggle }) => {

    const { theme } = useContext(AppContext);

    return (
        <Switch
            trackColor={{false: theme.toggleOffColor, true: theme.toggleOnColor}}
            thumbColor={theme.toggleThumbColor}
            onValueChange={onValueToggle}
            value={value}
        />
    );
}
