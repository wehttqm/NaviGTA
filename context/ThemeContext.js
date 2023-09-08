import React, { useState, useEffect, useContext, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ThemeContext = createContext();

export const ThemeProvider = ({children}) => {

    const [theme, setTheme] = useState(true);


    useEffect(() => {
        // load saved theme from storage
        const getTheme = async () => {
            try {
                
                const savedTheme = await AsyncStorage.getItem('theme');
                if (savedTheme) {
                    setTheme(JSON.parse(savedTheme));
                    console.log('set theme');
                }
            } catch (error) {
                console.log('Unable to get theme', error);
            }
        }
        getTheme();
    }, []);

    const toggleTheme = (newTheme) => {
        setTheme(newTheme);
    }
    
    return (
        <ThemeContext.Provider value={{theme, toggleTheme}} theme={theme}>
            {children}
        </ThemeContext.Provider>
    );
};