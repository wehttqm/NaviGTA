import React from 'react';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { ThemeProvider } from '../context/ThemeContext';

export default function RootLayout() {
    return (
        <ThemeProvider>
            <PaperProvider>
                <Stack/>
            </PaperProvider>
        </ThemeProvider>
    );
}
