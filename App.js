import React from 'react';
import { AppStack } from './src/navigation/AppStack';
import { AppContextProvider } from "./src/config/context/AppContext";

const App = () => (
      <AppContextProvider>
        <AppStack />
      </AppContextProvider>
);

export default App;
