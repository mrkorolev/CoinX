import React, { useState } from "react";
import { Switch } from "react-native";

export const CustomToggle = () => {
    const [isEnabled, setIsEnabled] = useState(false);

    return (
        <Switch
            trackColor={{false: '#767577', true: 'lightgreen'}}
            thumbColor={'#f4f3f4'}
            onValueChange={() => setIsEnabled((prevState) => !prevState)}
            value={isEnabled}
        />
    );
}

