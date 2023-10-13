import React, {useState} from 'react';
import { appTheme } from "../config/theme";

export const AppContext = React.createContext(undefined);

export const AppContextProvider = ({ children }) => {
    const [themeName, setThemeName] = useState('light');
    const [theme, setTheme] = useState(appTheme.light);
    const [pushEnabled, setPushEnabled] = useState(false);

    return (
        <AppContext.Provider value={{
            themeName, setThemeName,
            theme, setTheme,
            pushEnabled, setPushEnabled
        }}>
            {children}
        </AppContext.Provider>
    );
}
