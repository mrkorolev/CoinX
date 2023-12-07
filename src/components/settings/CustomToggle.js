import React, { useContext } from "react";
import { Switch } from "react-native";
import { AppContext } from "../../config/context/AppContext";

export const CustomToggle = ({ value, onValueToggle }) => {

    const { theme } = useContext(AppContext);

    return (
        <Switch style={ !onValueToggle }
            trackColor={{false: theme.toggleOffColor, true: theme.toggleOnColor}}
            thumbColor={theme.toggleThumbColor}
            disabled={!onValueToggle}
            onValueChange={onValueToggle}
            value={value}
        />
    );
}
