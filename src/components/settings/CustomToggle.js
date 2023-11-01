import React, {useContext, useEffect, useState} from "react";
import {Appearance, Switch} from "react-native";
import {AppContext} from "../../global/AppContext";

export const CustomToggle = ({ value, onValueToggle }) => {

    const { theme } = useContext(AppContext);

    return (
        <Switch style={ !onValueToggle && { opacity: 0.8 }}
            trackColor={{false: theme.toggleOffColor, true: theme.toggleOnColor}}
            thumbColor={theme.toggleThumbColor}
            disabled={!onValueToggle}
            onValueChange={onValueToggle}
            value={value}
        />
    );
}
