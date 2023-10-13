import React, { useContext } from 'react';
import { StartupNavigator } from './src/navigation/auth/StartupNavigator';
import { AppContext, AppContextProvider } from "./src/global/AppContext";
import { StatusBar } from "react-native";

const App = () => {
  return (
      <AppContextProvider>
        <StartupNavigator />
      </AppContextProvider>
  );
}

export default App;
