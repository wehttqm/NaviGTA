import React, { useState, createContext } from 'react';

export default ThemeContext = createContext();

export const ThemeProvider = ({children}) => {

    const [theme, toggleTheme] = useState(true);
    
    return (
        <ThemeContext.Provider value={{theme, toggleTheme}} theme={theme}>
            {children}
        </ThemeContext.Provider>
    );
};