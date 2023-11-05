import React, { useState } from 'react';
import { appTheme } from "../theme/theme";

export const AppContext = React.createContext(undefined);

export const AppContextProvider = ({ children }) => {
    const [themeName, setThemeName] = useState('light');
    const [theme, setTheme] = useState(appTheme.light);
    const [pushEnabled, setPushEnabled] = useState(false);
    const [accessToken, setAccessToken] = useState(undefined);
    const [customTimeout, setCustomTimeout] = useState(null);

    return (
        <AppContext.Provider value={{
            themeName, setThemeName,
            theme, setTheme,
            pushEnabled, setPushEnabled,
            accessToken, setAccessToken,
            customTimeout, setCustomTimeout
        }}>
            {children}
        </AppContext.Provider>
    );
}
