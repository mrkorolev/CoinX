import React, { useState } from 'react';
import { appTheme } from "../theme/theme";

export const AppContext = React.createContext(undefined);

export const AppContextProvider = ({ children }) => {
    const [themeName, setThemeName] = useState('dark');
    const [theme, setTheme] = useState(appTheme.dark);
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
